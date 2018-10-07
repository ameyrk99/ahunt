"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const Users_1 = require("./Users");
const Hunt_1 = require("./Hunt");
admin.initializeApp();
exports.addUserToDatabase = Users_1.addUserToDatabase;
exports.checkCode = Hunt_1.checkCode;
exports.startHunt = Hunt_1.startHunt;
//# sourceMappingURL=index.js.map