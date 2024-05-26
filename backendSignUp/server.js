const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: 'designloginsignup.cpwygia6ohc6.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: '7C&2Fp9*Lx',
  database: 'designloginsignup',
  port: 3306,git add . && git commit -m “change_table” && git push origin main
});

const app = express();

app.use(express.json());
app.use(cors());

// Route to fetch data from the database
app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM UsersSignUp'; // Query to fetch all data from the Users table
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    } else {
      res.status(200).json(result); // Send the fetched data as a JSON response
    }
  });
});

// Route to handle login requests
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM UsersSignUp WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Login failed. Invalid username or password.' });
      }
    }
  });
});

// Route to handle sign-up requests
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO UsersSignUp (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    } else {
      res.status(200).json({ message: 'Sign up successful' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
