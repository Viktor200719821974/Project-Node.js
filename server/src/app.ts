import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
// import bodyParser from 'body-parser';
import { config } from './config/config';
import { sequelize } from './db';
import { apiRouter } from './router/apiRouter';

const app = express();
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload());

app.use('/api', apiRouter);

const { PORT } = config;

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Server has started !!!!!! on port ${PORT}`);
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
    }
};
start();
