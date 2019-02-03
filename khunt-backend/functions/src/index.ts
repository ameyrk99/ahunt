import * as admin from 'firebase-admin'
import { addUserToDatabase } from './Users'
import { checkCode, startHunt, addTimeCompletionOfStep } from './Hunt'

admin.initializeApp()

exports.addUserToDatabase = addUserToDatabase

exports.checkCode = checkCode
exports.startHunt = startHunt
exports.addTimeCompletionOfStep = addTimeCompletionOfStep