import express from 'express';
// import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import bodyParser from 'body-parser';
import { config } from './config/config';
import { sequelize } from './db';
import { apiRouter } from './router/apiRouter';

const app = express();
app.use(bodyParser.json());
// const corsOptions = {
//     origin: '*',
//     methods: ['GET', 'POST'],
//     optionsSuccessStatus: 200 // For legacy browser support
// }
// app.use(cors({ origin: true, credentials: true }));
// const whitelist = ["http://localhost:80/", "https://developer.mozilla.org/"]
// const corsOptions = {
//     origin: function (origin: any, callback: any) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error("Not allowed by CORS"))
//         }
//     },
//     credentials: true,
// }
// app.use(cors(corsOptions))
// app.use(cors());
// app.get("/", (req, res) => {
//     res.send({ message: "Hello World!" })
// })
app.use(express.json());
app.use(express.json())

// app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(fileUpload());

app.use('/api', apiRouter);

const { PORT } = config;

const start = async () => {
    try {
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
