# Placement Cell
An interface for the employees of the company to fill in the data of students and interviews into the database and then download it in CSV
format.
by nikhil dodtalle
## Installation
To install Placement Cell, please follow these steps:
```
Install the required dependencies using the following command:
```
$ npm install 
```
Start the application using the following command:
```
$ npm start 
```
Open the application in your web browser by visiting the following URL:
```
$ http://localhost:8000 
```

## Features
* Signup and Signin: Users can create an account on the app and also sign in.
* CSV file download: Users can download CSV files of data.
* Dashboard: Users can see data of students and interviews on dashboard.
* Add: Users can add a student as well as interview.
* Update: Users can update or delete students and interviews.
* Alotting a interview: A interview can be easily alotted to a student.

## Folder Structure
```
CSV_Upload/
|── |assets/
│   |      ├── css/
│   │      |     ├── header.css
│   │      |     |
│   │      |     ├── interview.css
│   │      |     |
│   │      |     ├── jobs.css
│   │      |     |
│   │      |     ├── layout.css
│   │      |     |
│   │      |     ├── sign_up.css
│   │      |     |
│   │      |     ├── student.css
│   │      |     |
│   |      ├── js/
│   |            ├── home.js
|   |            |
|   |            ├── jobs.js
|   |            |
├── uploads/
|   |
├── config/
|   ├── mongoose.js
|   |
|   ├── middleware.js
|   |
|   ├── passport-local-strategy.js
|   |
├── routes/
│   ├── index.js
|   |
│   ├── csv.js
|   |
│   ├── interviews.js
|   |
│   ├── jobs.js
|   |
│   ├── students.js
|   |
│   ├── users.js
|   |
├── controllers/
│   ├── csv_controller.js
|   |
|   ├── home_controller.js
|   |
│   ├── interviews_controller.js
|   |
|   ├── jobs_controller.js
|   |
│   ├── students_controller.js
|   |
|   ├── users_controller.js
|   |
├── models/
│   ├── interview.js
|   |
│   ├── student.js
|   |
│   ├── user.js
|   |
├── views/
|   ├── _header_.ejs
|   |
|   ├── home.ejs
|   |
|   ├── interview.ejs
|   |  
|   ├── jobs.ejs
|   |
|   ├── layout.ejs
|   |
|   ├── student.ejs
|   |  
|   ├── update_student.ejs
|   |
|   ├── user_signin.ejs
|   |
|   ├── user_signup.ejs
|   |    
├── index.js 
├── .gitignore
├── package.json
├── readme.md
