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
exports.updateSnippet = exports.createSnippet = void 0;
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
const updateSnippet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        const updatedSnippet = yield shema_1.snippet.findByIdAndUpdate(req.params.id, { code, updatedAt: Date.now() }, { new: true });
        if (!updatedSnippet) {
            res.status(404).json({ message: 'Snippet not found' });
            return;
        }
        res.json({ message: 'Snippet updated', snippet: updatedSnippet });
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating snippet', error: err });
    }
});
exports.updateSnippet = updateSnippet;
// export const getSnippet = async (req: Request, res: Response) => {
//   try {
//     const snippet = await Snippet.findById(req.params.id);
//     if (!snippet) {
//       return res.status(404).json({ message: 'Snippet not found' });
//     }
//     res.json(snippet);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching snippet', error: err });
//   }
// };
