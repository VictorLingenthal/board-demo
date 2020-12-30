"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var user_1 = require("./Resolvers/user");
var card_1 = require("./Resolvers/card");
var merge_js_1 = __importDefault(require("lodash/merge.js"));
var initResolvers = {
    Query: {
        name: function () { return 'Peter'; },
    },
    Mutation: {
        addName: function (__, args) { return args.name; },
    }
};
exports.resolvers = merge_js_1.default(initResolvers, user_1.userResolvers, card_1.cardResolvers);
