import { Request, Response } from 'express';
import { snippet } from '../models/shema';

export const createSnippet = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { code, title, language, userId } = req.body;
    const newSnippet = new snippet({
      code,
      title,
      language,
      userId
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
    const updatedSnippet = await snippet.findByIdAndUpdate(
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

export const getSnippet = async (req: Request, res: Response) : Promise<void> => {
  try {
    console.log(req.query.id)
    const {id} = req.query;
    const getSnippet = await snippet.find({
        userId : id
    })
    if (!getSnippet) {
      res.status(404).json({ message: 'Snippet not found' });
      return;
    }
    // console.log(getSnippet)
    res.json(getSnippet);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching snippet', error: err });
  }
};

export const getUniqueSnippet = async (req: Request, res: Response) : Promise<void> => {
  try {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    console.log(req.query.id)
    const {id} = req.query;
    const getSnippet = await snippet.find({
        _id: id
    })
    if (!getSnippet) {
      res.status(404).json({ message: 'Snippet not found' });
      return;
    }
    // console.log(getSnippet)
    res.json(getSnippet);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching snippet', error: err });
  }
};



