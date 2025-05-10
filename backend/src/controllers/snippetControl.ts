import { Request, Response } from 'express';
import { snippet as Snippet } from '../models/shema';

export const createSnippet = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { code, title, language } = req.body;
    const newSnippet = new Snippet({
      code,
      title,
      language,
      userId: req.userId 
    });
    await newSnippet.save();
    res.json({ message: 'Snippet created', snippet: newSnippet });
  } catch (err) {
    res.status(500).json({ message: 'Error creating snippet', error: err });
  }
};

export const updateSnippet = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { code } = req.body;
    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { code, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedSnippet) {
      res.status(404).json({ message: 'Snippet not found' });
      return;
    }
    res.json({ message: 'Snippet updated', snippet: updatedSnippet });
  } catch (err) {
    res.status(500).json({ message: 'Error updating snippet', error: err });
  }
};

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
