
import mongoose, { Schema, Document } from 'mongoose';

interface IArticle extends Document {
    title: string;
    content: string;
    author: string;
    date: Date;
}

const articleSchema: Schema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    date: {type: Date, default: Date.now}
});


export const Article = mongoose.model<IArticle>('Article', articleSchema);
