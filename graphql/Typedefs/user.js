"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.userDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n  type User {\n    name: String!\n    id: ID\n  }\n\n  extend type Query {\n    users: [User]\n    user(id:ID): User\n  }\n\n  extend type Mutation {\n    addUser(name:String):User\n    deleteUser(id:ID):Boolean\n  }\n\n"], ["\n\n  type User {\n    name: String!\n    id: ID\n  }\n\n  extend type Query {\n    users: [User]\n    user(id:ID): User\n  }\n\n  extend type Mutation {\n    addUser(name:String):User\n    deleteUser(id:ID):Boolean\n  }\n\n"])));
var templateObject_1;
