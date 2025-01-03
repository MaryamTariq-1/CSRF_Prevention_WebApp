const request = require('supertest');
const app = require('../app');

describe('CSRF and Authentication Tests', () => {
  let csrfToken; // Store CSRF token
  let authToken; // Store auth token
  let server;
  const agent = request.agent(app); // Persistent agent for cookie handling

  beforeAll(async () => {
    const csrfResponse = await agent.get('/csrf-token');
    expect(csrfResponse.status).toBe(200);
    csrfToken = csrfResponse.body.csrfToken; // Save the token
  });

  it('should register a new user', async () => {
    const registerResponse = await agent
      .post('/api/register')
      .set('csrf-token', csrfToken) // Include CSRF token in header
      .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
    expect(registerResponse.status).toBe(201); // Registration should succeed
    expect(registerResponse.body).toHaveProperty('token');
    authToken = registerResponse.body.token; // Save auth token
  }, 10000);

  it('should allow a registered user to perform CSRF-protected actions', async () => {
    const protectedResponse = await agent
      .post('/api/protected-endpoint')
      .set('Authorization', `Bearer ${authToken}`) // Include auth token
      .set('csrf-token', csrfToken) // Include CSRF token
      .send({ data: 'test' });
    expect(protectedResponse.status).toBe(200); // Success
  });

  it('should reject requests with an invalid CSRF token', async () => {
    const response = await agent
      .post('/api/protected-endpoint')
      .set('Authorization', `Bearer ${authToken}`)
      .set('csrf-token', 'invalid-token') // Invalid CSRF token
      .send({ data: 'test' });
    expect(response.status).toBe(403); // Forbidden
  });
});
