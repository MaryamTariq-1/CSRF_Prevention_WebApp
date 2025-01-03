// logController.js
const fs = require('fs').promises;
const path = require('path');

async function logMessage(type, message) {
    const logFilePath = path.join(__dirname, `../logs/${type}.log`);
    const logEntry = `${new Date().toISOString()} - ${message}\n`;

    try {
        await fs.appendFile(logFilePath, logEntry);
        console.log(`${type} logged successfully.`);
    } catch (err) {
        console.error(`Failed to log ${type}:`, err);
    }
}

async function getLogs(req, res) {
    const type = req.query.type || 'general'; // Assuming you want to filter logs by type
    const logFilePath = path.join(__dirname, `../logs/${type}.log`);

    try {
        const content = await fs.readFile(logFilePath, 'utf8');
        res.send(content);
    } catch (err) {
        res.status(500).send(`Failed to read ${type} logs: ${err}`);
    }
}

module.exports = { logMessage, getLogs };
