const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// ✅ Use environment variable instead of hardcoded secret
const DB_PASSWORD = process.env.DB_PASSWORD || '';

/**
 * ✅ Single reusable function (Removed duplication)
 */
function calculateAmount(price, taxRate) {
  return price + (price * taxRate);
}

/**
 * ✅ Input validation middleware
 */
function validateNumbers(price, tax) {
  if (Number.isNaN(price) || Number.isNaN(tax)) {
    return false;
  }
  if (price < 0 || tax < 0) {
    return false;
  }
  return true;
}

app.get('/calculate', (req, res) => {
  const price = Number.parseFloat(req.query.price);
  const tax = Number.parseFloat(req.query.tax);

  // ✅ Proper validation
  if (!validateNumbers(price, tax)) {
    return res.status(400).json({
      error: 'Invalid price or tax value. Must be positive numbers.'
    });
  }

  const result = calculateAmount(price, tax);

  res.json({ total: result });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'user-service'
  });
});

module.exports = app;
