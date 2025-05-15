"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueSnippet = exports.getSnippet = exports.updateSnippet = exports.deleteSnippet = exports.createSnippet = void 0;
const shema_1 = require("../models/shema");
const createSnippet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, title, language } = req.body;
        const newSnippet = new shema_1.snippet({
            code,
            title,
            language,
            userId: req.userId
        });
        yield newSnippet.save();
        res.json({ message: 'Snippet created', snippet: newSnippet });
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating snippet', error: err });
    }
});
exports.createSnippet = createSnippet;
const deleteSnippet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("delete", id);
        const userId = req.userId;
        yield shema_1.snippet.deleteOne({
            userId: userId,
            _id: id
        });
        res.json({ message: 'Snippet Deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating snippet', error: err });
    }
});
exports.deleteSnippet = deleteSnippet;
const updateSnippet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        const { id } = req.params;
        console.log('updatte', id);
        const userId = req.userId; // comes from auth middleware
        const existingSnippet = yield shema_1.snippet.findById(id);
        if (!existingSnippet) {
            res.status(404).json({ message: 'Snippet otha ila da' });
            return;
        }
        if (existingSnippet.userId.toString() !== userId) {
            res.status(403).json({ message: 'Unauthorized to update this snippet' });
            return;
        }
        existingSnippet.code = code;
        const updatedSnippet = yield existingSnippet.save();
        res.json({ message: 'Snippet updated', snippet: updatedSnippet });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating snippet', error: err });
    }
});
exports.updateSnippet = updateSnippet;
const getSnippet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getSnippet = yield shema_1.snippet.find({
            userId: req.userId
        });
        if (!getSnippet) {
            res.status(404).json({ message: 'Snippet not found' });
            return;
        }
        // console.log(getSnippet)
        res.json(getSnippet);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching snippet', error: err });
    }
});
exports.getSnippet = getSnippet;
const getUniqueSnippet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log(req.query.id);
        const { id } = req.query;
        const getSnippet = yield shema_1.snippet.find({
            _id: id
        });
        if (!getSnippet) {
            res.status(404).json({ message: 'Snippet not found' });
            return;
        }
        // console.log(getSnippet)
        res.json(getSnippet);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching snippet', error: err });
    }
});
exports.getUniqueSnippet = getUniqueSnippet;
