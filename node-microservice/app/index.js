const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'user-service' });
});

app.listen(PORT, () => {
  console.log(`🚀 User service running on port ${PORT}`);
});

