"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require('cors')({ origin: true });
exports.checkCode = functions.https.onRequest((request, response) => {
    cors(request, response, () => __awaiter(this, void 0, void 0, function* () {
        const codeToCheck = request.query.code;
        console.log(codeToCheck);
        if (!codeToCheck) {
            console.log('no code in param');
            response.status(404).send(null);
            return null;
        }
        let huntId;
        let huntCreatorId;
        let activeHuntId;
        try {
            const snapshot = yield admin.database().ref('active_hunts').once('value');
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.exists()) {
                        if (childSnapshot.child('code').val() == codeToCheck) {
                            huntId = childSnapshot.child('hunt_id').val();
                            huntCreatorId = childSnapshot.child('uid').val();
                            activeHuntId = childSnapshot.key;
                            console.log('match found');
                            return true;
                        }
                    }
                    return false;
                });
            }
        }
        catch (error) {
            console.log('unable to read current_hunts');
            response.status(404).send(null);
            return null;
        }
        if (!huntId || !huntCreatorId) {
            console.log('code not valid. No match was found');
            response.status(404).send(null);
        }
        let huntCreatorName;
        try {
            const snapshot = yield admin.database().ref('users').child(huntCreatorId).child('credentials/name').once('value');
            if (snapshot.exists()) {
                huntCreatorName = snapshot.val();
                console.log(huntCreatorName);
            }
            else {
                console.log('creator does not have a name in database');
            }
        }
        catch (error) {
            console.log('unable to fetch creator name', error);
        }
        try {
            const snapshot = yield admin.database().ref('users').child(huntCreatorId).child('hunts/saved').child(huntId).once('value');
            if (snapshot.exists()) {
                const huntInfo = {
                    huntCreatorId: huntCreatorId,
                    huntCreatorName: huntCreatorName,
                    huntId: huntId,
                    activeHuntId: activeHuntId,
                    huntName: snapshot.child('hunt_name').val(),
                    huntDescription: snapshot.child('hunt_description').val(),
                    huntSteps: Object.keys(snapshot.child('steps').val()).length,
                };
                console.log('info successfully obtained', huntInfo);
                response.status(200).send(huntInfo);
                return null;
            }
        }
        catch (error) {
            console.log('unable to fetch hunt info', error);
            response.status(404).send(null);
            return null;
        }
        return null;
    }));
});
exports.startHunt = functions.https.onRequest((request, response) => {
    cors(request, response, () => __awaiter(this, void 0, void 0, function* () {
        const uid = request.query.uid;
        const huntId = request.query.hunt_id;
        console.log(uid, huntId);
        if (!uid || !huntId) {
            console.log('incomplete params');
            response.status(404).send(null);
            return null;
        }
        let doesHuntExists;
        // check if hunt exists
        try {
            const snapshot = yield admin.database().ref('users').child(uid).child('hunts/saved/').child(huntId).once('value');
            if (snapshot.exists()) {
                doesHuntExists = true;
            }
            else {
                console.log('hunt does not exist');
                response.status(404).send(null);
                return null;
            }
        }
        catch (error) {
            console.log('unable to fetch id', error);
            response.status(404).send(null);
            return null;
        }
        const huntCode = admin.database().ref('users').child(uid).child('hunts/active').push().key.substring(2, 7);
        admin.database().ref('users').child(uid).child('hunts/active')
            .update({
            hunt_id: huntId,
            hunt_code: huntCode,
            status: 'initiated'
        })
            .then(() => {
            const activeHuntId = admin.database().ref('active_hunts').push().key;
            return admin.database().ref('active_hunts').child(activeHuntId)
                .update({
                uid: uid,
                hunt_id: huntId,
                code: huntCode,
            })
                .then(() => {
                console.log('hunt is not active. Code: ', huntCode);
                return response.status(200).send(huntCode);
            });
        });
        return null;
    }));
});
exports.addTimeCompletionOfStep = functions.database.ref('/users/{uid}/hunts/saved/{activeHunt}/participants/{participant}/current_step_order')
    .onWrite((change, context) => __awaiter(this, void 0, void 0, function* () {
    if (!change.after.exists()) {
        return null;
    }
    //check if active hunt
    const uid = context.params.uid;
    const activeHunt = context.params.activeHunt;
    try {
        const activeHuntSnapshot = yield admin.database().ref('users').child(uid).child('hunts/active').once('value');
        if (activeHuntSnapshot.exists()) {
            const foundActiveHunt = activeHuntSnapshot.child('hunt_id').val();
            if (!foundActiveHunt || foundActiveHunt != activeHunt) {
                console.log('This is not an active hunt');
                return null;
            }
        }
    }
    catch (error) {
        console.log('unable to check if hunt is active or not', error);
    }
    const participant = context.params.participant;
    const currentStepOrder = change.after.val();
    return admin.database().ref('users').child(uid).child('hunts/saved').child(activeHunt).child('participants').child(participant).child('time_completion')
        .update({ [currentStepOrder]: new Date().toISOString() });
}));
//# sourceMappingURL=Hunt.js.map