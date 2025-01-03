const { logAttack } = require('./attacklogger');

/**
 * Simulates a CSRF attack for demonstration purposes.
 */
exports.simulateAttack = (req, res) => {
    const data = req.body.data;

    // Log the simulated attack
    logAttack(`Simulated CSRF attack with data: ${data}`);

    res.send('Simulated CSRF attack executed.');
};

/**
 * Handles secure actions protected by CSRF.
 */
exports.secureAction = (req, res) => {
    const data = req.body.data;

    // Process the secure action
    console.log(`Secure action performed with data: ${data}`);

    res.send('Secure action completed.');
};
