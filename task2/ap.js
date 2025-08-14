const express = require('express');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(helmet());

// 1. Sanitize and Validate Inputs
app.post('/validate-email', (req, res) => {
    const email = req.body.email;
    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email');
    }
    res.send('Valid email');
// 2. Password Hashing
app.post('/hash-password', async (req, res) => {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    res.send({ hashedPassword });
});

// 3. Basic Token-based Authentication
app.post('/login', (req, res) => {
    const user = { _id: 1 }; // Example user
    const token = jwt.sign({ id: user._id }, 'your-secret-key');
    res.send({ token });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

