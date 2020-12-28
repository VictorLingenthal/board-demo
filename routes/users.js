"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_model_1 = __importDefault(require("../models/user.model"));
var router = express_1.default.Router();
router.route('/').get(function (req, res) {
    user_model_1.default.find()
        .then(function (users) { return res.json(users); })
        .catch(function (err) { return res.status(400).json('Error: ' + err); });
});
router.route('/add').post(function (req, res) {
    var name = req.body.name;
    var newUser = new user_model_1.default({ name: name });
    newUser.save()
        .then(function () { return res.json('User added!'); })
        .catch(function (err) { return res.status(400).json('Error ' + err); });
});
router.route('/:id').get(function (req, res) {
    user_model_1.default.findById(req.params.id)
        .then(function (user) { return res.json(user); })
        .catch(function (err) { return res.status(400).json('Error: ' + err); });
});
router.route('/:id').delete(function (req, res) {
    user_model_1.default.findByIdAndDelete(req.params.id)
        .then(function () { return res.json('User deleted.'); })
        .catch(function (err) { return res.status(400).json('Error: ' + err); });
});
exports.default = router;
