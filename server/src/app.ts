import express from 'express';
import cors from 'cors';
import fileupload from 'express-fileupload';
import path from 'path';
import { config } from './config/config';
import { sequelize } from './db';
import { apiRouter } from './router/apiRouter';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileupload({}));

app.use('/api', apiRouter);

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
