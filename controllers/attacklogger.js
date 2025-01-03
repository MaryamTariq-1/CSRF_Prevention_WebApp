const fs = require('fs').promises; // Use promise-based fs module

async function logAttack(message) {
    const logFilePath = path.join(__dirname, '../logs/attacks.log');
    const logMessage = `${new Date().toISOString()} - ${message}\n`;

    try {
        await fs.appendFile(logFilePath, logMessage);
        console.log('Attack logged successfully.');
    } catch (err) {
        console.error('Failed to log attack:', err);
    }
}

module.exports = { logAttack };
