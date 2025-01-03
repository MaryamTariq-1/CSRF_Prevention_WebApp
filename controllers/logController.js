const fs = require('fs');
const path = require('path');

/**
 * Retrieves and displays the attack logs in a readable format.
 */
exports.getLogs = (req, res) => {
    const logFilePath = path.join(__dirname, '../logs/attacks.log');

    // Check if the log file exists
    if (!fs.existsSync(logFilePath)) {
        return res.status(404).send('No logs found.');
    }

    // Read the log file and send its content
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading log file:', err);
            return res.status(500).send('Failed to retrieve logs.');
        }

        // Display the logs in a preformatted block
        res.send(`<pre>${data}</pre>`);
    });
};

/**
 * Appends a log entry to the attack log file.
 * @param {string} message - The log message to be recorded.
 */
exports.logAttack = (message, req = null) => {
    const logFilePath = path.join(__dirname, '../logs/attacks.log');
    const timestamp = new Date().toISOString();

    // Include additional information if the request object is provided
    const additionalInfo = req
        ? `
IP: ${req.ip}
URL: ${req.originalUrl}
Headers: ${JSON.stringify(req.headers, null, 2)}
Body: ${JSON.stringify(req.body, null, 2)}
        `
        : '';

    const logMessage = `[${timestamp}] ${message}${additionalInfo}\n\n`;

    // Ensure the logs directory exists
    if (!fs.existsSync(path.dirname(logFilePath))) {
        fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
    }

    // Append the log message to the log file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('Attack logged successfully.');
        }
    });
};
