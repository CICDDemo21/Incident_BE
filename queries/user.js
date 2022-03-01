const Pool = require('pg').Pool;
const config = require('../config');
const pool = new Pool(config.db);

/* INCIDENT_USERS */

// To get all users
const getUsers = (request, response) => {
    pool.query('SELECT id, first_name as firstname, last_name as lastname, user_role as usernole FROM incident_users WHERE is_deleted = false ORDER BY first_name ASC',
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

// To get user details by uuid
const getUserById = (request, response) => {
    pool.query('SELECT id, first_name as firstname, last_name as lastname, user_role as usernole FROM incident_users WHERE is_deleted = false AND id = $1',
        [request.params.id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

// To create new incident user
const createUser = (request, response) => {
    const { firstname, lastname, role } = request.body
    pool.query('INSERT INTO incident_users (first_name, last_name, user_role) VALUES ($1, $2, $3)',
        [firstname, lastname, role], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added with ID: ${results.insertId}`)
        })
}

// To delete incident user - not hot delete, apply soft delete
const deleteUser = (request, response) => {
    pool.query('UPDATE incident_users SET is_deleted = true WHERE id = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${request.params.id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
}