# expressjs-signup-email-verifier
User verification app made from expresjs. When the user is registered then the verification email is sent to the registered email.  


## You can test this app with just a few steps, clone the repository and follow the following steps
                
1.  install the dependencies  
`$ npm install`
2. You will need to make some configuration with your gmail account to send email from nodejs server. So click on this link to generate password for your app
https://security.google.com/settings/security/apppasswords
3. After you have done these two steps. create .env file on your root directory and copy the following code  
  
  ```javascript
  jwt_key=[YOUR ANY SECRET KEY]
mailUser=[YOUR EMAIL THAT IS CONFIGURED ON STEP 2]
mailPass=[YOUR CONFIGURED PASSWORD FROM STEP 2]
  ```
4. run `$ npm run test`
5. You can then test the app

----




## dependencies
```json
"scripts": {
    "test": "nodemon index.js",
    "watchcss": "npx tailwindcss -i ./public/tailwind.css -o ./public/style.css --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.0.2",
    "ejs": "^3.1.8",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.6.1",
    "nodemailer": "^6.7.8",
    "nodemon": "^2.0.20"
  },
  "devDependencies": {
    "tailwindcss": "^3.1.8"
  }
```

