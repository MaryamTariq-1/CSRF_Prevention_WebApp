const request = require('supertest');
const app = require('../app');

describe('Authentication Tests', () => {
    it('should allow a user to sign up with valid data', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Signup successful!');
    });

    it('should reject signup with missing fields', async () => {
        const res = await request(app).post('/signup').send({
            email: 'test@example.com',
            password: 'password123',
        });

        expect(res.statusCode).toBe(400);
        expect(res.text).toContain('Missing required fields');
    });

    it('should reject signup with invalid email format', async () => {
        const res = await request(app).post('/signup').send({
            name: 'Test User',
            email: 'invalid-email',
            password: 'password123',
        });

        expect(res.statusCode).toBe(400);
        expect(res.text).toContain('Invalid email format');
    });
});
