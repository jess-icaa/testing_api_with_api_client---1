// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.

const express = require('express');
const { resolve } = require('path');
const studentsdata = require('./data.json');
const app = express();
const port = 3010;


app.use(express.json());

app.post('/students/above-threshold', (req, res) => {
  try {
    const { threshold } = req.body;

   
    if (threshold === undefined) {
      return res.status(400).json({ error: "Threshold value is required." });
    }

    if (typeof threshold !== 'number' || threshold < 0) {
      return res.status(400).json({ error: "Threshold must be a non-negative number." });
    }

    
    const matchingStudents = studentsdata.filter(student => student.total > threshold)
      .map(student => ({ name: student.name, total: student.total }));

    
    res.json({
      count: matchingStudents.length,
      students: matchingStudents
    });

  } catch (error) {
    
    res.status(500).json({ error: "An error occurred while processing the request.", details: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3010`);
});


