const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, './mock.json'), 'utf8'));

app.get('/api/bookingCode/:bookingCode', (req, res) => {
  const { bookingCode } = req.params;
  const booking = mockData.booking.find((item) => item.bookingCode === bookingCode);
  if (!booking) {
    res.status(404).json({ error: 'Booking not found' });
  } else {
    res.json(booking);
  }
});

app.get('/api/passengers', (req, res) => {
  res.json([mockData.passengers]);
});

console.log(`Mock API server running at http://localhost:${port}`);

app.listen(port);
