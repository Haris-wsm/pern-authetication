const express = require('express');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const cors = require('cors');

const ErrorsHandler = require('./api/v1/errors/ErrorsHandler');
const userRouters = require('./api/v1/users/UserRouter');
const authRouters = require('./api/v1/auth/AuthenticationRouters');

const app = express();

app.use(cors());
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: './locals/{{lng}}/{{ns}}.json'
    },
    detection: {
      lookupHeader: 'accept-language'
    }
  });

app.use(middleware.handle(i18next));
app.use(express.json());
app.use('/api/v1', userRouters);
app.use('/api/v1', authRouters);

app.use(ErrorsHandler);

module.exports = app;
