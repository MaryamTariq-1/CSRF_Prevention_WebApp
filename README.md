
# **CSRF Prevention WebApp**

This project demonstrates effective prevention techniques against Cross-Site Request Forgery (CSRF) attacks using **Node.js**, **Express.js**, and **Bootstrap**.

---

## **Overview**
CSRF (Cross-Site Request Forgery) is a type of attack where malicious actors trick users into performing unintended actions on a trusted web application where they're authenticated. This project showcases:
- How CSRF attacks work.
- Methods to mitigate CSRF vulnerabilities.
- Hands-on implementation of secure practices using middleware and tokens.

---

## **Project Objective**
The goal of this project is to educate developers and demonstrate how CSRF attacks can be mitigated using:
1. **CSRF Token Validation**
2. **Same-Site Cookies**
3. **Referrer Validation**

---

## **Features**
1. **Secure Routes**: Protected with CSRF tokens to prevent malicious requests.
2. **Simulated Vulnerabilities**: Demonstrates insecure endpoints for learning purposes.
3. **Attack Logging**: Captures and logs suspicious or malicious activities.
4. **Bootstrap-Based UI**: Provides a responsive and user-friendly interface.

---

## **Setup Instructions**

### **Prerequisites**
- **Node.js**: v14 or later
- **npm**: v6 or later

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
   npx nodemon app.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4000
   ```

---

## **Testing the Project**

### **Prerequisites for Testing**
- Install Jest and Supertest for automated testing:
  ```bash
  npm install jest supertest --save-dev
  ```

### **Run Tests**
Run the tests using Jest:
```bash
npx jest
```
Here’s the formatted section for inclusion in your **`README.md`** file using proper Markdown syntax:

---

## **Test Results**

The test suite verifies the functionality of CSRF protection and authentication features. Below are the results:

```terminal 
PASS  tests/csrf.test.js
  CSRF and Authentication Tests
    √ should register a new user (133 ms)
    √ should allow a registered user to perform CSRF-protected actions (24 ms)
    √ should reject requests with an invalid CSRF token (57 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.633 s, estimated 3 s
Ran all test suites
```

### **Test Cases**
1. **Register a New User**:
   - Ensures a new user can successfully register with valid data.
2. **Perform CSRF-Protected Actions**:
   - Validates that authenticated users can perform protected actions with a valid CSRF token.
3. **Reject Invalid CSRF Token**:
   - Confirms that requests with an invalid CSRF token are correctly rejected.

Run the tests using:
```terminal
npx jest
```

---
### **Test Coverage**
- **CSRF Protection**
  - Valid token: Request succeeds.
  - Missing token: Request is rejected.
  - Invalid token: Request is rejected.
- **Authentication**
  - Valid signup data: User is registered.
  - Missing/invalid data: Signup fails.
- **Attack Logging**
  - Malicious requests are logged in `logs/attacks.log`.

---

## **How to Use**

### **Secure Routes**
1. **Home Page**: 
   - URL: `http://localhost:4000/`
   - Includes a CSRF-protected signup form.

2. **CSRF Demo**:
   - URL: `http://localhost:4000/csrf_demo`
   - Demonstrates a form protected by CSRF tokens.

3. **View Logs**:
   - URL: `http://localhost:4000/logs`
   - Displays recorded attack logs.

---

### **Simulating a CSRF Attack**
1. Open the `tests/malicious.html` file in your browser.
2. Submit the form targeting:
   ```
   http://localhost:4000/vulnerable-action
   ```
3. **Expected Outcome**:
   - The server rejects the request and logs the attack.

---

## **Folder Structure**

```
CSRF_Prevention_WebApp/
├── controllers/
│   ├── attacklogger.js    # Handles attack logging.
│   ├── authController.js  # Handles signup functionality.
│   ├── csrfController.js  # Simulates CSRF attacks.
│   └── logController.js   # Retrieves attack logs.
├── logs/
│   └── attacks.log        # Stores attack logs.
├── public/
│   ├── css/               # Contains stylesheets.
│   ├── js/                # Contains JavaScript files.
│   └── malicious.html     # Simulates CSRF attacks.
├── tests/
│   ├── auth.test.js       # Automated tests for authentication.
│   ├── csrf.test.js       # Automated tests for CSRF protection.
│   └── malicious.html     # Test for CSRF vulnerability.
├── views/
│   ├── index.ejs          # Home page with CSRF-protected forms.
│   ├── signup.ejs         # Signup page.
│   └── error.ejs          # Error handling page.
├── app.js                 # Main application logic.
├── package.json           # Node.js dependencies and scripts.
├── package-lock.json      # Dependency lock file.
└── README.md              # Project documentation.
```

---

## **Key Endpoints**

### **Secure Endpoints**
1. **Home Page**: 
   - URL: `http://localhost:4000/`
   - Displays the CSRF-protected form.

2. **Sign Up**:
   - URL: `http://localhost:4000/signup`
   - Handles form submission with CSRF token validation.

3. **CSRF Demo**:
   - URL: `http://localhost:4000/csrf_demo`
   - Protected demo endpoint for CSRF validation.

### **Vulnerable Endpoints**
1. **Simulate Malicious Request**:
   - URL: `http://localhost:4000/vulnerable-action`
   - Accepts malicious data (for testing purposes).

---

## **Security Practices Implemented**
1. **CSRF Tokens**:
   - Unique tokens embedded in forms and validated server-side.

2. **Same-Site Cookies**:
   - Cookies set with `SameSite=Strict` and `HttpOnly`.

3. **Referrer Validation**:
   - Blocks requests with invalid or missing referrers.

4. **Attack Logging**:
   - Logs all invalid requests and attacks for auditing.

---

## **Contact**
For questions, suggestions, or contributions, feel free to reach out:

- **GitHub**: [MaryamTariq-1](https://github.com/MaryamTariq-1)
- **LinkedIn**: [Maryam Tariq](https://www.linkedin.com/in/maryamtariq1/)
- **Email**: marymughal216@gmail.com

