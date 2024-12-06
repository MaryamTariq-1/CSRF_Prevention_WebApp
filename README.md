# CSRF_Prevention_WebApp

Here’s the cleaned and consolidated version of your README file:

---

# **CSRF Prevention WebApp**

This project demonstrates effective prevention techniques against Cross-Site Request Forgery (CSRF) attacks using **Node.js**, **Express.js**, and **Bootstrap**.

## **Project Objective**
The objective of this project is to educate and showcase how CSRF attacks can be mitigated by implementing:
- CSRF Token Validation
- Same-Site Cookies
- Referrer Validation

## **Features**
1. Secure Routes with CSRF Token Protection.
2. Simulated Vulnerable Routes to demonstrate attacks.
3. Attack Logging for monitoring suspicious activities.
4. User-Friendly Interface built with Bootstrap.

---

## **Setup Instructions**

### **Prerequisites**
- Node.js (v14 or later)
- npm (v6 or later)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/MaryamTariq-1/CSRF_Prevention_WebApp.git
   cd CSRF_Prevention_WebApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4000
   ```

---

## **Testing the Project**

To test the project, install Jest and Supertest:
```bash
npm install jest supertest --save-dev
npx jest
```

### **Automated Tests**
We use `jest` and `supertest` for testing CSRF protection. The tests include:
1. **Valid CSRF Token Test:** Ensures requests with valid tokens succeed.
2. **Missing CSRF Token Test:** Ensures requests without tokens are rejected.
3. **Invalid CSRF Token Test:** Ensures requests with invalid tokens are rejected.

### Example Test Code (`csrf.test.js`):
```javascript
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
```

---

## **Accessing Routes**

### **Secure Route**
- **URL:** `http://localhost:4000/`
- **Purpose:** Demonstrates a form protected by CSRF tokens.
- **Steps:**
  1. Submit data through the signup form.
  2. The server validates the CSRF token before processing the request.

### **Vulnerable Route**
- **URL:** `http://localhost:4000/vulnerable-action`
- **Purpose:** Simulates a CSRF attack via a malicious HTML page.
- **Steps:**
  1. Open `malicious.html` in your browser.
  2. Click the "Execute Malicious Action" button to simulate an attack.
  3. The server logs the attack attempt.

---

## **Folder Structure**

- **`public/`**: Contains static assets like CSS and JavaScript.
- **`views/`**: Contains EJS templates for rendering web pages.
- **`controllers/`**: Includes the `attacklogger.js` for logging attack attempts.
- **`logs/`**: Stores attack logs.
- **`app.js`**: Main server logic.

---

## **Contact**

For queries, reach out via:
- **GitHub:** [MaryamTariq-1](https://github.com/MaryamTariq-1)
- **LinkedIn:** [Maryam Tariq](https://www.linkedin.com/in/maryamtariq1/)
- **Email:** marymughal216@gmail.com

---

