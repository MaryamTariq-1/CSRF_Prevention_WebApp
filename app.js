const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

// Import controllers
const authController = require('./controllers/authController');
const csrfController = require('./controllers/csrfController');
const logController = require('./controllers/logController');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// Ensure the logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// CSRF protection setup
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes

// Home route
app.get('/', (req, res) => {
    res.render('index', { csrfToken: req.csrfToken() });
});

// Route for the Sign Up page
app.get('/signup', (req, res) => {
    res.render('signup', { csrfToken: req.csrfToken() });
});

// Route for the CSRF Demo page
app.get('/csrf_demo', (req, res) => {
    res.render('csrf_demo', { csrfToken: req.csrfToken() });
});

// Signup route
app.post('/signup', csrfProtection, authController.signup);

// Simulate CSRF attack route
app.post('/simulate', csrfProtection, csrfController.simulateAttack);

// Secure action route
app.post('/secure-action', csrfProtection, csrfController.secureAction);

// Logs retrieval route
app.get('/logs', logController.getLogs);

// Same-Site Cookies setup
app.use((req, res, next) => {
    res.cookie('sessionId', '123456', {
        sameSite: 'Strict', // Adjust to 'Lax' or 'None' as needed
        httpOnly: true,
        secure: true, // Set to true in production (requires HTTPS)
    });
    next();
});

// Referrer validation middleware
app.use((req, res, next) => {
    const referrer = req.get('Referrer') || req.get('Origin');
    if (referrer && !referrer.startsWith('http://localhost:4000')) {
        console.warn(`Invalid referrer: ${referrer} on path ${req.path}`);
        return res.status(403).send('Forbidden: Invalid Referrer');
    }
    next();
});

// Catch 404 and render error page
app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found' });
});

// General error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Internal Server Error' });
});
// Referrer validation middleware
app.use((req, res, next) => {
    const referrer = req.get('Referrer') || req.get('Origin');
    if (referrer && !referrer.startsWith('http://localhost:4000')) {
        logController.logAttack('Invalid referrer detected', req);
        return res.status(403).send('Forbidden: Invalid Referrer');
    }
    next();
});

// CSRF error handling middleware
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        logController.logAttack('CSRF attack detected: Invalid or missing CSRF token', req);
        return res.status(403).render('error', { message: 'Invalid or missing CSRF token' });
    }
    next(err);
});

// Server setup
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
