const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// 🔐 Hardcoded secret (Security Hotspot)
const DB_PASSWORD = "superSecret123";

// ❌ Unused variable (Code Smell)
let tempData = "not used anywhere";

// 🔁 Duplicate Function 1
function calculateTotal(price, tax) {
  const taxAmount = price * tax;
  const total = price + taxAmount;
  return total;
}

// 🔁 Duplicate Function 2 (Same Logic – Duplication)
function calculateFinalAmount(price, tax) {
  const taxAmount = price * tax;
  const total = price + taxAmount;
  return total;
}

// ❌ No input validation (Bad practice)
app.get('/calculate', (req, res) => {
  const price = parseFloat(req.query.price);
  const tax = parseFloat(req.query.tax);

  const result = calculateTotal(price, tax);
  res.json({ total: result });
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'user-service' });
});

app.listen(PORT, () => {
  console.log(`🚀 User service running on port ${PORT}`);
});
