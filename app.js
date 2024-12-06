const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Same-Site Cookies example
app.use((req, res, next) => {
    res.cookie('sessionId', '123456', {
        sameSite: 'Strict', // Adjust to 'Lax' or 'None' as needed
        httpOnly: true,
        secure: true,
    });
    next();
});

const { logAttack } = require('./controllers/attacklogger');

app.use((req, res, next) => {
    const referrer = req.get('Referrer') || req.get('Origin');
    if (referrer && !referrer.startsWith('http://localhost:4000')) {
        logAttack(`Invalid referrer: ${referrer} on path ${req.path}`);
        return res.status(403).send('Forbidden: Invalid Referrer');
    }
    next();
});


// CSRF protection setup
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Secure route with CSRF protection
app.get('/', (req, res) => {
    res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/signup', (req, res) => {
    // Mock signup process
    console.log('Signup Data:', req.body);
    res.send('Signup successful!');
});

// Insecure route for CSRF demonstration
app.get('/insecure', (req, res) => {
    res.render('insecure');
});

app.post('/insecure_action', (req, res) => {
    console.log('Insecure Action:', req.body);
    res.send('Action performed without CSRF protection!');
});

// Vulnerable route for CSRF simulation
app.post('/vulnerable-action', (req, res) => {
    const attackDetails = `CSRF Attack Simulated with data: ${JSON.stringify(req.body)}`;
    logAttack(attackDetails);
    res.send('Simulated action executed.');
});


// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Server setup
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
