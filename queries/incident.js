const Pool = require('pg').Pool;
const config = require('../config');
const pool = new Pool(config.db);

/* INCIDENTS */

// to get all active incidents
const getIncidents = (request, response) => {
    pool.query('SELECT id, inc_title, inc_desc, inc_type, is_acked, acked_by, acked_name, created_date FROM incidents WHERE is_deleted = false ORDER BY created_date DESC',
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

// To get incident details by uuid
const getIncidentById = (request, response) => {
    pool.query('SELECT id, inc_title, inc_desc, inc_type, is_acked, acked_by, acked_name FROM incidents WHERE is_deleted = false AND id = $1',
        [request.params.id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows[0])
        })
}

// To create incident
const createIncident = (request, response) => {
    const { incidentTitle, incidentDesc, incidentType, ackdName } = request.body
    pool.query('INSERT INTO incidents (inc_title, inc_desc, inc_type, acked_name) VALUES ($1, $2, $3, $4)',
        [incidentTitle, incidentDesc, incidentType, ackdName], (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Incident were added with ID: ${results.insertId}`)
        })
}

// To update incident by id
const updateIncident = (request, response) => {
    const { incidentTitle, incidentDesc, incidentType, ackdName, ackdState } = request.body
    pool.query('UPDATE incidents SET inc_title = $1, inc_desc = $2, inc_type = $3, acked_name = $4, is_acked = $5 WHERE id = $6',
        [incidentTitle, incidentDesc, incidentType, ackdName, ackdState, request.params.id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Incident updated with ID: ${request.params.id}`)
        })
}

// To delete incident - not hot delete, apply soft delete
const deleteIncident = (request, response) => {
    pool.query('UPDATE incidents SET is_deleted = true WHERE id = $1',
        [request.params.id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Incident deleted incident with ID: ${request.params.id}`)
        })
}

module.exports = {
    getIncidents,
    getIncidentById,
    createIncident,
    updateIncident,
    deleteIncident
}