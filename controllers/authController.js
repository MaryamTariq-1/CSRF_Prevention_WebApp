/**
 * Handles user signup.
 */
exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    // Mock user registration logic (you can replace this with database logic)
    console.log(`New user registered: Name=${name}, Email=${email}`);

    res.send('Signup successful!');
};
