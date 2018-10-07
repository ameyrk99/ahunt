import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const addUserToDatabase = functions.auth.user().onCreate((user) => {
    const uid = user.uid
    const email = user.email

    return admin.database().ref('users').child(uid).child('credentials')
        .update({
            email: email,
        })

})

