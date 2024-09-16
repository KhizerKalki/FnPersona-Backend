require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database'); // DB connection

// Import models
const User = require('./Models/user');
const TotalNetWorth = require('./Models/TotalNetWorth');
const BudgetOverview = require('./Models/BudgetOverview');
const UserGrowth = require('./Models/UserGrowth');
const AssetsLiabilities = require('./Models/AssetsLiabilities');
const Notifications = require('./Models/Notifications');
const UpcomingExpenses = require('./Models/UpcomingExpenses');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.create({ firstname, lastname, email, password });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'User creation failed', details: error });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = user.generateJWT();
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error });
  }
});

// Sync models and start server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
