"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.addUserToDatabase = functions.auth.user().onCreate((user) => {
    const uid = user.uid;
    const email = user.email;
    return admin.database().ref('users').child(uid).child('credentials')
        .update({
        email: email,
    });
});
//# sourceMappingURL=Users.js.map