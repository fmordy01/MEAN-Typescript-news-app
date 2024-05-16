import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import articleRoutes from './routes/articleRoutes';
import authRoutes from './routes/authRoutes';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env')});

const app = express();


app.use(bodyParser.json());
app.use(cors());

//db connection
mongoose.connect(process.env.DB_URL as string);

app.use('/auth', authRoutes);

//jwtpayload to include used id
interface IJwtPayLoad extends JwtPayload {
    id: string
}

app.use((req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(401).send('Unauthorized');
            }else{
                const payload = decoded as IJwtPayLoad;
                if (payload && payload.id) {
                    req.body.userId = payload.id;
                    next();
                }else {
                    res.status(401).send('Unauthorised');
                }
            }
        });
    }else{
        res.status(401).send('Unauthorised');
    }
});

app.use('/articles', articleRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});