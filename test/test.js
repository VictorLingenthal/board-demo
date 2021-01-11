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
var gql = require('apollo-server-express').gql;
var _a = require('./testSetup'), apolloClient = _a.apolloClient, connectToDb = _a.connectToDb, dropTestDb = _a.dropTestDb, closeDbConnection = _a.closeDbConnection;
var ObjectId = require('mongodb').ObjectId;
var UserService = require('../frontend/src/services/userService').UserService;
var CardService = require('../frontend/src/services/cardService').CardService;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connectToDb()];
            case 1:
                _a.sent();
                return [4 /*yield*/, dropTestDb()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dropTestDb()];
            case 1:
                _a.sent();
                return [4 /*yield*/, closeDbConnection()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('Is Jest working?', function () {
    expect(1 + 1).toBe(2);
});
test('Resolver working', function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, apolloClient.query({
                        query: gql(__makeTemplateObject(["{\n      name\n    }"], ["{\n      name\n    }"]))
                    })];
            case 1:
                res = _a.sent();
                expect(res.data.name).toEqual('Peter');
                return [2 /*return*/];
        }
    });
}); });
var userService = UserService.getInstance(apolloClient);
test('Test getUsers', function () { return __awaiter(void 0, void 0, void 0, function () {
    var getUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, userService.getUsers(function (res) { return res; })];
            case 1:
                getUsers = _a.sent();
                expect(getUsers).toEqual([]);
                return [2 /*return*/];
        }
    });
}); });
test('Test addUser', function () { return __awaiter(void 0, void 0, void 0, function () {
    var addUser, noUser, nullUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(3);
                return [4 /*yield*/, userService.addUser(function (res) { return res; }, 'Testname')];
            case 1:
                addUser = _a.sent();
                expect(addUser[0].value).toEqual('Testname');
                return [4 /*yield*/, userService.addUser(function (res) { return res; }, '')];
            case 2:
                noUser = _a.sent();
                expect(noUser).toEqual(undefined);
                return [4 /*yield*/, userService.addUser(function (res) { return res; })];
            case 3:
                nullUser = _a.sent();
                expect(nullUser).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
test('Test deleteUser', function () { return __awaiter(void 0, void 0, void 0, function () {
    var getUsers2, deleteUserFail, deleteUserFail2, deleteUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(5);
                return [4 /*yield*/, userService.getUsers(function (res) { return res; })];
            case 1:
                getUsers2 = _a.sent();
                expect(getUsers2.length).toBe(1);
                expect(getUsers2[0].value).toEqual('Testname');
                return [4 /*yield*/, userService.deleteUser(function (res) { return res; }, '')];
            case 2:
                deleteUserFail = _a.sent();
                expect(deleteUserFail).toBe(null);
                return [4 /*yield*/, userService.deleteUser(function (res) { return res; })];
            case 3:
                deleteUserFail2 = _a.sent();
                expect(deleteUserFail2).toBe(null);
                return [4 /*yield*/, userService.deleteUser(function (res) { return res; }, getUsers2[0].id)];
            case 4:
                deleteUser = _a.sent();
                expect(deleteUser).toEqual(getUsers2[0].id);
                return [2 /*return*/];
        }
    });
}); });
test('Test getUsers3', function () { return __awaiter(void 0, void 0, void 0, function () {
    var getUsers3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, userService.getUsers(function (res) { return res; })];
            case 1:
                getUsers3 = _a.sent();
                expect(getUsers3).toEqual([]);
                return [2 /*return*/];
        }
    });
}); });
var cardService = CardService.getInstance(apolloClient);
test('Test getCards', function () { return __awaiter(void 0, void 0, void 0, function () {
    var getCards;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, cardService.getCards(function (res) { return res; })];
            case 1:
                getCards = _a.sent();
                expect(getCards).toEqual([]);
                return [2 /*return*/];
        }
    });
}); });
test('Test addCard', function () { return __awaiter(void 0, void 0, void 0, function () {
    var addCard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, cardService.addCard(function (res) { return res; }, { status: 'todo' })];
            case 1:
                addCard = _a.sent();
                expect(addCard.status.value).toEqual('todo');
                return [2 /*return*/];
        }
    });
}); });
test('Test deleteCard', function () { return __awaiter(void 0, void 0, void 0, function () {
    var getCards2, deleteCardFail, deleteCard;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(4);
                return [4 /*yield*/, cardService.getCards(function (res) { return res; })];
            case 1:
                getCards2 = _a.sent();
                expect(getCards2.length).toEqual(1);
                expect(getCards2[0].status.value).toEqual('todo');
                return [4 /*yield*/, cardService.deleteCard(function (res) { return res; }, '')];
            case 2:
                deleteCardFail = _a.sent();
                expect(deleteCardFail).toEqual("");
                return [4 /*yield*/, cardService.deleteCard(function (res) { return res; }, getCards2[0].id)];
            case 3:
                deleteCard = _a.sent();
                expect(deleteCard).toEqual(getCards2[0].id);
                return [2 /*return*/];
        }
    });
}); });
test('Test getCards3', function () { return __awaiter(void 0, void 0, void 0, function () {
    var getCards3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, cardService.getCards(function (res) { return res; })];
            case 1:
                getCards3 = _a.sent();
                expect(getCards3).toEqual([]);
                return [2 /*return*/];
        }
    });
}); });
