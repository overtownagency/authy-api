# authy-api
API for standalone authentication and user management UI.

Built with:
* NodeJs + Express
* bcrypt
* jsonwebtoken
* Mongodb
  * dotenv file contains connection string for mongo db.

![Alt text](./diagram.png?raw=true "Process flow")

# Routes

HTTP Method | Endpoint | Description
------------ | ------------- | -----------
POST | /api/auth | authenticate an email and password
POST | /api/auth | authenticate an email and password
POST | /api/auth/validate | validates an auth token
GET | /api/users | gets all users
POST | /api/users | creates user
GET | /api/users/:email | gets a user by specified email
POST | /api/users/:email | updates user info
DELETE | /api/users/:email | deletes a user by email
POST | /api/password/change | change password for currently logged in user

# To Dos

- [x] Structure
- [x] User management
- [x] Authentication
- [ ] Password management
- [ ] Application management
- [ ] Role management
