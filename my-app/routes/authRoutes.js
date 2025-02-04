app.post('/register', async (req, res) => {
    const { username, password } = req.body;  // Extract username & password from request body
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt (10 rounds)
    const user = new User({ username, password: hashedPassword }); // Create a new user instance
    await user.save(); // Save user to database
    res.status(201).send("User registered"); // Send success response
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body; // Extract username & password from request body
    const user = await User.findOne({ username }); // Find user in database

    if (!user || !(await bcrypt.compare(password, user.password))) { 
        return res.status(400).send("Invalid credentials"); // If user not found or password is incorrect
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    // Generate JWT token that expires in 1 hour

    res.json({ token }); // Send token as response
});
