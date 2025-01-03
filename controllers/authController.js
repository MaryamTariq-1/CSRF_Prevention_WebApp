const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    
    // Data validation
    if (!username || !email.includes('@') || password.length < 8) {
        return res.status(400).send('Invalid data provided');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Mock user registration logic
    console.log(`New user registered: Name=${username}, Email=${email}`);

    res.status(201).json({
        message: 'Signup successful!',
        token: 'mock-auth-token', // Example token
    });
};
