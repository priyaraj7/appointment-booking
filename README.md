# Appointment Booking App

### Table of Contents

[About the Project]((#about-the-project)
[Features of this app](#features-of-this-app)
[Technology used](#technology-used-1)
[App Design/List of APIs](#app-design)
[Wire framing](#wire-framing)

### About the Project

This is fullstack app. Planning to build using react, typescript, node and postgres

### Features of this app

This app has two users: Admin and Patients

**Admin User**

1. Admin can Add, Edit, Delete and view Doctor Data

2. Admin can login to the app(nice to have)

**Patient User**

1. Patient can view Doctor list
2. Patient can search Doctor
3. Patient can book appointment
4. Patient can add their profile details
5. Patient can get confirmation message via phone number(nice to have)

### Technology used

**Backend**

- nodejs
- express
- prisma
- postgres

**Frontend**

- React
- Typescript
- Chakra UI

### Technology used

[dbdiagram](https://dbdiagram.io/d/62df135d0d66c746554ab129)
![dbdiagram](./screenshots/dbdiagram.png)

### App Design

| Functionality             | Method | Path                                |
| ------------------------- | ------ | ----------------------------------- |
| list of doctors           | GET    | /                                   |
| add new doctor            | POST   | /add-doctor                         |
| update doctor info        | PUT    | /edit-doctor-details/:id/:last_name |
| View individual doctor    | GET    | /view-doctor-details/:id/:last_name |
| Delete individual doctor  | DELETE | /:id                                |
| Doctor list(public- view) | GET    | /public-doctor-list                 |

### Wire framing

Please click [here](https://app.diagrams.net/#G1QRSWzpZixVfFF8Xm8DQCiyJ28nhHi1j6) to see wire-framing
