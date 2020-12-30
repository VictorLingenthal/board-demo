"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var user_1 = require("./Typedefs/user");
var card_1 = require("./Typedefs/card");
exports.typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n  type Query {\n    name: String\n  }\n\n  type Mutation {\n    addName(name:String):String\n  }\n\n  ", "\n  ", "\n\n"], ["\n\n  type Query {\n    name: String\n  }\n\n  type Mutation {\n    addName(name:String):String\n  }\n\n  ", "\n  ", "\n\n"])), user_1.userDefs, card_1.cardDefs);
var templateObject_1;
