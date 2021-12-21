import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import contactsRouter from './routes/contactsRouters';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

app.use('/api/contacts', contactsRouter); //не понял, почему именно  так: '/api/contacts' ????!!! (так было в template!!!!)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
});

export default app;
