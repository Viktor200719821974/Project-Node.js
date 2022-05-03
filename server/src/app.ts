import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/config';
import { sequelize } from './db';
import { model } from './models/models';
import { apiRouter } from './router/apiRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
console.log(model);
app.get('/', (req: Request, res:Response) => {
    res.status(200).json({ message: 'Working!!!!' });
});

const { PORT } = config;

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server has started !!!!!! on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};
start();
