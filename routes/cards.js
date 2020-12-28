"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var card_model_1 = __importDefault(require("../models/card.model"));
var router = express_1.default.Router();
router.route('/').get(function (req, res) {
    card_model_1.default.find()
        .then(function (cards) { return res.json(cards); })
        .catch(function (err) { return res.status(400).json('Error: ' + err); });
});
router.route('/add').post(function (req, res) {
    var title = req.body.title || '';
    var status = req.body.status || 'todo';
    var owner = req.body.owner || null;
    var creator = req.body.creator || 'oliver';
    var date = Date.parse(req.body.date) || Date.now();
    var newCard = new card_model_1.default({ title: title, status: status, owner: owner, creator: creator, date: date });
    newCard.save()
        .then(function () { return res.json(newCard); })
        .catch(function (err) { return res.status(400).json('Error ' + err); });
});
router.route('/:id').get(function (req, res) {
    card_model_1.default.findById(req.params.id)
        .then(function (card) { return res.json(card); })
        // .then((card:ICard|null) => res.json(card))
        .catch(function (err) { return res.status(400).json('Error: ' + err); });
});
router.route('/:id').delete(function (req, res) {
    card_model_1.default.findByIdAndDelete(req.params.id)
        .then(function () { return res.json('Card deleted.'); })
        .catch(function (err) { return res.status(400).json('Error: ' + err); });
});
router.route('/update/:id').post(function (req, res) {
    card_model_1.default.findById(req.params.id)
        .then(function (card) {
        if (card) {
            card.title = req.body.title || card.title;
            card.status = req.body.status || card.status;
            card.owner = req.body.owner || card.owner;
            card.creator = req.body.creator || card.creator;
            card.date = req.body.date || card.date;
            // card.date = Date.parse(req.body.date) || card.date
            card.save()
                .then(function () { return res.json('Card updated!'); })
                .catch(function (err) { return res.status(400).json('Error: ' + err); });
        }
        else
            res.json('There was no card with this id');
    })
        .catch(function (err) { return res.status(400).json('Error: ' + err); });
});
exports.default = router;
