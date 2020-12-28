"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        tim: true,
        minlength: 3
    }
}, {
    timestamps: true
});
var User = mongoose_1.model('User', userSchema);
exports.default = User;
