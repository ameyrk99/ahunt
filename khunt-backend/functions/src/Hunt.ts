import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const cors = require('cors')({ origin: true })

export const checkCode = functions.https.onRequest((request, response) => {

    cors(request, response, async () => {

        const codeToCheck = request.query.code
        console.log(codeToCheck)

        if (!codeToCheck) {
            console.log('no code in param')
            response.status(404).send(null)
            return null
        }

        let huntId
        let huntCreatorId
        let activeHuntId

        try {
            const snapshot = await admin.database().ref('active_hunts').once('value')
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.exists()) {
                        if (childSnapshot.child('code').val() == codeToCheck) {
                            huntId = childSnapshot.child('hunt_id').val()
                            huntCreatorId = childSnapshot.child('uid').val()
                            activeHuntId = childSnapshot.key
                            console.log('match found')
                            return true
                        }
                    }
                    return false
                })
            }
        }
        catch (error) {
            console.log('unable to read current_hunts')
            response.status(404).send(null)
            return null
        }

        if (!huntId || !huntCreatorId) {
            console.log('code not valid. No match was found')
            response.status(404).send(null)
        }

        let huntCreatorName

        try {
            const snapshot = await admin.database().ref('users').child(huntCreatorId).child('credentials/name').once('value')
            if (snapshot.exists()) {
                huntCreatorName = snapshot.val()
                console.log(huntCreatorName)
            }
            else {
                console.log('creator does not have a name in database')
            }
        }
        catch (error) {
            console.log('unable to fetch creator name', error)
        }

        try {
            const snapshot = await admin.database().ref('users').child(huntCreatorId).child('hunts/saved').child(huntId).once('value')
            if (snapshot.exists()) {
                const huntInfo = {
                    huntCreatorId: huntCreatorId,
                    huntCreatorName: huntCreatorName,
                    huntId: huntId,
                    activeHuntId: activeHuntId,

                    huntName: snapshot.child('hunt_name').val(),
                    huntDescription: snapshot.child('hunt_description').val(),
                    huntSteps: Object.keys(snapshot.child('steps').val()).length,
                }

                console.log('info successfully obtained', huntInfo)
                response.status(200).send(huntInfo)
                return null
            }

        }
        catch (error) {
            console.log('unable to fetch hunt info', error)
            response.status(404).send(null)
            return null
        }

        return null
    })

})

export const startHunt = functions.https.onRequest((request, response) => {

    cors(request, response, async () => {

        const uid = request.query.uid
        const huntId = request.query.hunt_id

        console.log(uid, huntId)

        if (!uid || !huntId) {
            console.log('incomplete params')
            response.status(404).send(null)
            return null
        }

        let doesHuntExists
        // check if hunt exists
        try {
            const snapshot = await admin.database().ref('users').child(uid).child('hunts/saved/').child(huntId).once('value')
            if (snapshot.exists()) {
                doesHuntExists = true
            }
            else {
                console.log('hunt does not exist')
                response.status(404).send(null)
                return null
            }
        }
        catch (error) {
            console.log('unable to fetch id', error)
            response.status(404).send(null)
            return null
        }

        const huntCode = admin.database().ref('users').child(uid).child('hunts/active').push().key.substring(2, 7)

        admin.database().ref('users').child(uid).child('hunts/active')
            .update({
                hunt_id: huntId,
                hunt_code: huntCode,
                status: 'initiated'
            })
            .then( () => {
                const activeHuntId = admin.database().ref('active_hunts').push().key
                return admin.database().ref('active_hunts').child(activeHuntId)
                    .update({
                        uid: uid,
                        hunt_id: huntId,
                        code: huntCode,
                    })
                    .then( () => {
                        console.log('hunt is not active. Code: ', huntCode)
                        return response.status(200).send(huntCode)
                    })

            } )

            return null

    })

})