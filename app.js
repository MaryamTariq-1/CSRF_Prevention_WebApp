const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

// Controllers
const authController = require('./controllers/authController');
const csrfController = require('./controllers/csrfController');
const logController = require('./controllers/logController');

const app = express();

// 1. Middleware for static files and logging
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// 2. Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Ensure JSON payloads are parsed
app.use(cookieParser());

// 3. CSRF protection middleware
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// 4. Middleware to set CSRF token for views and responses
app.use((req, res, next) => {
  try {
    res.locals.csrfToken = req.csrfToken();
    next();
  } catch (err) {
    console.error('Error generating CSRF token:', err.message);
    next(err);
  }
});

// 5. Security settings for cookies
app.use((req, res, next) => {
  const secure = process.env.NODE_ENV === 'production';
  res.cookie('sessionId', '123456', {
    sameSite: 'Strict',
    httpOnly: true,
    secure: secure,
  });
  next();
});

// 6. Referrer validation middleware
app.use((req, res, next) => {
  const allowedReferrers = ['http://localhost:5000', 'https://example.com'];
  const referrer = req.get('Referrer') || req.get('Origin');
  if (referrer && !allowedReferrers.some(url => referrer.startsWith(url))) {
    console.error('Blocked Referrer:', referrer);
    return res.status(403).send('Forbidden: Invalid Referrer');
  }
  next();
});

// 7. Ensure the logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// 8. View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 9. Routes
app.get('/', (req, res) => res.render('index'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/csrf_demo', (req, res) => res.render('csrf_demo'));

// CSRF token route
app.get('/csrf-token', (req, res) => {
  try {
    const csrfToken = req.csrfToken();
    console.log('Generated CSRF Token:', csrfToken);
    res.json({ csrfToken });
  } catch (err) {
    console.error('Error generating CSRF token:', err.message);
    res.status(500).send('Failed to generate CSRF token');
  }
});

// API routes
app.post('/api/register', authController.signup);
app.post('/api/protected-endpoint', csrfController.secureAction);
app.post('/signup', authController.signup);
app.post('/simulate', csrfController.simulateAttack);
app.post('/secure-action', csrfController.secureAction);
app.get('/logs', logController.getLogs);

// 10. Error handling for CSRF token errors
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    console.error('CSRF Attack Detected:', err.message);
    return res.status(403).render('error', { message: 'Invalid or missing CSRF token' });
  }
  next(err);
});

// 11. Catch-all 404 handler
app.use((req, res) => res.status(404).render('error', { message: 'Page not found' }));

// 12. General error handler
app.use((err, req, res, next) => {
  console.error('General Error:', err.stack);
  res.status(500).render('error', { message: 'Internal Server Error' });
});

// 13. Start the server (only in non-test environments)
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

module.exports = app;
