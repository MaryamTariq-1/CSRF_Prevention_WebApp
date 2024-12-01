const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CSRF protection
const csrfProtection = csrf({ cookie: true });

// View engine setup
app.set('view engine', 'ejs');

// Routes
app.get('/', csrfProtection, (req, res) => {
    res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/submit', csrfProtection, (req, res) => {
    res.send('Form submitted successfully!');
});

// Server setup
app.listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});
