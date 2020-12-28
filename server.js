"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
var app = express_1.default();
var port = process.env.PORT || 3000;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + "/frontend/build"));
var uri = process.env.ATLAS_URI;
mongoose_1.default.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
var connection = mongoose_1.default.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});
var cards_1 = __importDefault(require("./routes/cards"));
var users_1 = __importDefault(require("./routes/users"));
app.use('/cards', cards_1.default);
app.use('/users', users_1.default);
app.listen(port, function () {
    console.log("Server is running on port: " + port);
});
