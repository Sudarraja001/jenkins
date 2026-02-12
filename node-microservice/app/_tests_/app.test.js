const request = require('supertest');
const app = require('../index');

describe('User Service API Tests', () => {

  // ✅ Health Check Test
  describe('GET /health', () => {
    it('should return service status UP', async () => {
      const res = await request(app).get('/health');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        status: 'UP',
        service: 'user-service'
      });
    });
  });

  // ✅ Successful Calculation Test
  describe('GET /calculate - Valid Input', () => {
    it('should calculate total correctly', async () => {
      const res = await request(app)
        .get('/calculate')
        .query({ price: 100, tax: 0.1 });

      expect(res.statusCode).toBe(200);
      expect(res.body.total).toBe(110);
    });
  });

  // ❌ Invalid Input (Non-number)
  describe('GET /calculate - Invalid Input', () => {
    it('should return 400 for invalid numbers', async () => {
      const res = await request(app)
        .get('/calculate')
        .query({ price: 'abc', tax: 0.1 });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  // ❌ Negative Input
  describe('GET /calculate - Negative Values', () => {
    it('should return 400 for negative values', async () => {
      const res = await request(app)
        .get('/calculate')
        .query({ price: -100, tax: 0.1 });

      expect(res.statusCode).toBe(400);
    });
  });

});

