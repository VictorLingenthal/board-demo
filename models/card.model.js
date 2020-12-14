"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var cardSchema = new Schema({
    title: { type: String },
    status: { type: String },
    owner: { type: String },
    creator: { type: String },
    date: { type: Date },
}, {
    timestamps: true
});
var Card = mongoose_1.default.model('Card', cardSchema);
module.exports = Card;
