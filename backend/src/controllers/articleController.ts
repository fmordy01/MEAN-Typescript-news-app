import { Request, Response } from 'express';
import { Article } from '../models/article';


export const getArticles = async (req: Request, res: Response): Promise<void> => {
    const articles = await Article.find();
    res.json(articles);
}


export const getArticleById = async (req: Request, res: Response): Promise<void> => {
    const article = await Article.findById(req.params.id);
    res.json(article);
}

export const createArticle = async (req: Request, res: Response): Promise<void> => {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.json(newArticle);
}

export const updateArticle = async (req: Request, res: Response): Promise<void> => {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedArticle);
};

export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
    await Article.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
}
