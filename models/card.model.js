"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var cardSchema = new mongoose_1.Schema({
    title: { type: String },
    status: { type: String },
    owner: { type: String },
    creator: { type: String },
    date: { type: Date },
}, {
    timestamps: true
});
var Card = mongoose_1.model('Card', cardSchema);
exports.default = Card;
