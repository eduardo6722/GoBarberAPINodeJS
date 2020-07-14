import express from 'express';

import cors from 'cors';
import 'reflect-metadata';
import 'express-async-errors';

import './database';
import routes from './routes';
import uploadConfig from './config/upload';
import globalErrorsHandler from './middlewares/global/globalErrorsHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.tempFolder));
app.use(globalErrorsHandler);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('server is running'));
