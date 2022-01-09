import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import {httpCodes, LIMIT_JSON} from './lib/constants';
import contactsRouter from './routes/contactsRouters';
import authRouter from './routes/authRouters';
import usersRouter from './routes/usersRouter';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: LIMIT_JSON })); 
app.use((req, res, next) => {
  app.set('lang', req.acceptsLanguages(['en', 'ua']));
  next();
}); 
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ status: 'fail', code: httpCodes.INTERNAL_SERVER_ERROR, message: err.message })
});

export default app;
