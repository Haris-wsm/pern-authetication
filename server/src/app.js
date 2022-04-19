const express = require('express');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const cors = require('cors');
const config = require('config');
const path = require('path');

const ErrorsHandler = require('./api/v1/errors/ErrorsHandler');
const userRouters = require('./api/v1/users/UserRouter');
const authRouters = require('./api/v1/auth/AuthenticationRouters');

//middleware

const tokenAuthenticate = require('./api/v1/middleware/tokenAuthenticate');

// Services

const FileService = require('./api/v1/file/FileService');
const { uploadDir, profileDir } = config;
const profileDirectory = path.join('.', uploadDir, profileDir);

const ONE_YEAR_IN_MILLI = 1000 * 60 * 60 * 24 * 365;

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

FileService.createFolders();

app.use(middleware.handle(i18next));
app.use(express.json());

app.use(
  '/images',
  express.static(profileDirectory, { maxAge: ONE_YEAR_IN_MILLI })
);

app.use(tokenAuthenticate);

app.use('/api/v1', userRouters);
app.use('/api/v1', authRouters);

app.use(ErrorsHandler);

module.exports = app;
