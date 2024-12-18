const request = require('supertest');
const app = require('./app');

describe('CSRF Protection Tests', () => {
    let csrfToken;

    beforeAll(async () => {
        const res = await request(app).get('/');
        csrfToken = /name="_csrf" value="(.+?)"/.exec(res.text)[1];
    });

    it('should allow POST requests with valid CSRF tokens', async () => {
        const res = await request(app)
            .post('/signup')
            .set('Cookie', `csrfToken=${csrfToken}`)
            .send({ _csrf: csrfToken, name: 'Test User', email: 'test@example.com', password: 'password123' });

        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Signup successful!');
    });

    it('should reject POST requests with missing CSRF tokens', async () => {
        const res = await request(app).post('/signup').send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        });

        expect(res.statusCode).toBe(403);
        expect(res.text).toContain('Forbidden');
    });

    it('should reject POST requests with invalid CSRF tokens', async () => {
        const res = await request(app)
            .post('/signup')
            .set('Cookie', `csrfToken=invalidToken`)
            .send({ _csrf: 'invalidToken', name: 'Test User', email: 'test@example.com', password: 'password123' });

        expect(res.statusCode).toBe(403);
        expect(res.text).toContain('Invalid CSRF token');
    });
});
