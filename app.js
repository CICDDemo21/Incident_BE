const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')
const incApi = require('./queries/incident')
const userApi = require('./queries/user')

const app = express()
app.use(
    cors({
        origin: "*",
    })
);

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const port = 3001

/* Home page */
app.get('/', async (req, res, next) => {
    try {
        res.json({ message: 'Hello, I am alive and ready to serve you based on your request' });
    } catch (err) {
        console.error(`Error while getting all users `, err.message);
        next(err);
    }
})

/* USERS */
/* Get all active users */
app.get('/users', userApi.getUsers);

/* To get active user details by ID */
app.get('/users/:id', userApi.getUserById)

/* To create new user */
app.post('/users', userApi.createUser)

/* To delete user  */
app.delete('/users/:id', userApi.deleteUser)

/* INCIDENTS */

/* Get all active incidents */
app.get('/incidents', incApi.getIncidents);

/* To get active incident details by ID */
app.get('/incidents/:id', incApi.getIncidentById)

/* To create new incident */
app.post('/incidents', incApi.createIncident)

/* To delete incident  */
app.put('/incidents/:id', incApi.updateIncident)

/* To delete incident  */
app.delete('/incidents/:id', incApi.deleteIncident)

app.listen(port, () => { console.log(`Backend server running on ${ 'http://localhost:' + port}`) });