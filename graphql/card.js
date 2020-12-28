"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardResolvers = exports.cardDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var card_model_1 = __importDefault(require("../models/card.model"));
exports.cardDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\ntype Card {\n  title: String!\n  id: ID!\n  status: String\n  owner: String\n  creator: String\n  date: String\n}\n\ninput CardInput {\n  title: String\n  status: String\n  owner: String\n  creator: String\n  date: String\n}\n\nextend type Query {\n  card(id:ID): Card\n  cards: [Card]\n}\n\nextend type Mutation {\n  addCard(status:String):Card\n  deleteCard(id:ID):String\n  updateCard(id:ID, card:CardInput):Card\n}\n\n"], ["\n\ntype Card {\n  title: String!\n  id: ID!\n  status: String\n  owner: String\n  creator: String\n  date: String\n}\n\ninput CardInput {\n  title: String\n  status: String\n  owner: String\n  creator: String\n  date: String\n}\n\nextend type Query {\n  card(id:ID): Card\n  cards: [Card]\n}\n\nextend type Mutation {\n  addCard(status:String):Card\n  deleteCard(id:ID):String\n  updateCard(id:ID, card:CardInput):Card\n}\n\n"])));
exports.cardResolvers = {
    Query: {
        cards: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, card_model_1.default.find()
                            .then(function (cards) { return cards; })
                            .catch(function (err) { return console.log('Error: ' + err); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        card: function (id) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, card_model_1.default.findById(id)
                            .then(function (card) { return card; })
                            .catch(function (err) { return console.log('Error: ' + err); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); }
    },
    Mutation: {
        addCard: function (__, args) { return __awaiter(void 0, void 0, void 0, function () {
            var title, status, owner, creator, date, newCard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = args.title || '';
                        status = args.status || 'todo';
                        owner = args.owner || null;
                        creator = args.creator || 'victor';
                        date = Date.parse(args.date) || Date.now();
                        newCard = new card_model_1.default({ title: title, status: status, owner: owner, creator: creator, date: date });
                        return [4 /*yield*/, newCard.save()
                                .then(function () { return newCard; })
                                .catch(function (err) { return 'Error ' + err; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        deleteCard: function (__, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                card_model_1.default.findByIdAndDelete(args.id)
                    .then(function () { return 'Card deleted.'; })
                    .catch(function (err) { return "Error: " + err; });
                return [2 /*return*/];
            });
        }); },
        updateCard: function (__, args) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                card_model_1.default.findById(args.id)
                    .then(function (card) {
                    if (card) {
                        card.title = args.card.title || card.title;
                        card.status = args.card.status || card.status;
                        card.owner = args.card.owner || card.owner;
                        card.creator = args.card.creator || card.creator;
                        card.date = args.card.date || card.date;
                        // card.date = Date.parse(args.card.date) || card.date
                        card.save()
                            .then(function () { return card; })
                            .catch(function (err) { return "Error: " + err; });
                    }
                    else
                        return 'There was no card with this id';
                })
                    .catch(function (err) { return "Error: " + err; });
                return [2 /*return*/];
            });
        }); }
    }
};
var templateObject_1;
