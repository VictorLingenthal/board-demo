"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
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
var User = mongoose_1.default.model('User', userSchema);
module.exports = User;
