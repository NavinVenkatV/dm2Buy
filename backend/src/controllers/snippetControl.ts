import { Request, Response } from 'express';
import { snippet } from '../models/shema';

export const createSnippet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, title, language } = req.body;
    const newSnippet = new snippet({
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

export const deleteSnippet = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params
    console.log("delete",id)
    const userId = req.userId
    await snippet.deleteOne({
      userId: userId,
      _id : id
    })
    res.json({ message: 'Snippet Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating snippet', error: err });
  }
};



export const updateSnippet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.body;
    const {id} = req.params
    console.log('updatte', id)
    const userId = req.userId; // comes from auth middleware

    const existingSnippet = await snippet.findById(id);

    if (!existingSnippet) {
      res.status(404).json({ message: 'Snippet otha ila da' });
      return;
    }

    if (existingSnippet.userId.toString() !== userId) {
      res.status(403).json({ message: 'Unauthorized to update this snippet' });
      return;
    }

    existingSnippet.code = code;
    const updatedSnippet = await existingSnippet.save();

    res.json({ message: 'Snippet updated', snippet: updatedSnippet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating snippet', error: err });
  }
};


export const getSnippet = async (req: Request, res: Response): Promise<void> => {
  try {
  
    const getSnippet = await snippet.find({
      userId: req.userId
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

export const getUniqueSnippet = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    console.log(req.query.id)
    const { id } = req.query;
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



