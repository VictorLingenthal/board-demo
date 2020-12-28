"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var merge_js_1 = __importDefault(require("lodash/merge.js"));
var mongoose_1 = __importDefault(require("mongoose"));
var http_1 = require("http");
var dotenv_1 = __importDefault(require("dotenv"));
var user_1 = require("./graphql/user");
var card_1 = require("./graphql/card");
dotenv_1.default.config();
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n  type Query {\n    name: String\n  }\n\n  type Mutation {\n    addName(name:String):String\n  }\n\n  ", "\n  ", "\n\n"], ["\n\n  type Query {\n    name: String\n  }\n\n  type Mutation {\n    addName(name:String):String\n  }\n\n  ", "\n  ", "\n\n"])), user_1.userDefs, card_1.cardDefs);
var initResolvers = {
    Query: {
        name: function () { return 'Peter'; },
    },
    Mutation: {
        addName: function (__, args) { return args.name; },
    }
};
var resolvers = merge_js_1.default(initResolvers, user_1.userResolvers, card_1.cardResolvers);
mongoose_1.default
    .connect((process.env.ATLAS_URI), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    console.log("mongodb connected successfully");
    var server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    });
    var app = express_1.default();
    server.applyMiddleware({ app: app });
    var httpServer = http_1.createServer(app);
    var PORT = process.env.PORT || 4444;
    httpServer.listen({ port: PORT }, function () {
        console.log("Server is running in port " + PORT);
    });
})
    .catch(function (err) {
    console.log(err);
});
var templateObject_1;
