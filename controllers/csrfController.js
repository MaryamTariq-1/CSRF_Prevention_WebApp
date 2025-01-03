// csrfController.js
const { logMessage } = require('./logController');

exports.simulateAttack = (req, res) => {
    const data = req.body.data;
    logMessage('attacks', `Simulated CSRF attack with data: ${data}`);
    res.send('Simulated CSRF attack executed.');
};

exports.secureAction = (req, res) => {
    const data = req.body.data;
    console.log(`Secure action performed with data: ${data}`);
    res.send('Secure action completed.');
};
