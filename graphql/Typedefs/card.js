"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.cardDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\ntype Card {\n  title: String!\n  id: ID!\n  status: String\n  owner: String\n  creator: String\n  date: String\n}\n\ninput CardInput {\n  title: String\n  status: String\n  owner: String\n  creator: String\n  date: String\n}\n\nextend type Query {\n  card(id:ID): Card\n  cards: [Card]\n}\n\nextend type Mutation {\n  addCard(status:String):Card\n  deleteCard(id:ID):String\n  updateCard(id:ID, card:CardInput):Card\n}\n\n"], ["\n\ntype Card {\n  title: String!\n  id: ID!\n  status: String\n  owner: String\n  creator: String\n  date: String\n}\n\ninput CardInput {\n  title: String\n  status: String\n  owner: String\n  creator: String\n  date: String\n}\n\nextend type Query {\n  card(id:ID): Card\n  cards: [Card]\n}\n\nextend type Mutation {\n  addCard(status:String):Card\n  deleteCard(id:ID):String\n  updateCard(id:ID, card:CardInput):Card\n}\n\n"])));
var templateObject_1;
