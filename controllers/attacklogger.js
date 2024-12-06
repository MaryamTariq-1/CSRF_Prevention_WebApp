const fs = require('fs');
const path = require('path');

/**
 * Logs attack attempts for CSRF or other vulnerabilities.
 * @param {string} message - The log message describing the attack.
 */
function logAttack(message) {
    const logFilePath = path.join(__dirname, '../logs/attack.log');
    const logMessage = `${new Date().toISOString()} - ${message}\n`;

    // Ensure the logs directory exists
    if (!fs.existsSync(path.dirname(logFilePath))) {
        fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
    }

    // Append the log message to the file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to log attack:', err);
        } else {
            console.log('Attack logged successfully.');
        }
    });
}

module.exports = { logAttack };
