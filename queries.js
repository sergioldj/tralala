const Pool = require('pg').Pool
const pool = new Pool({
  user: 'nyukjhaufopvle',
  host: 'ec2-174-129-253-27.compute-1.amazonaws.com',
  database: 'dov20jmj6edd7',
  password: 'bd5660571a1eb04839f0330c5d351c2fd28b065dd519421c05a79acadf69f9e4',
  port: 5432,
})


const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTrabalho = (request, response) => {
  const idTrabalho = parseInt(request.params.idTrabalho)

  pool.query('SELECT * FROM trabalho WHERE id_trabalho = $1', [idTrabalho], (error, results) => {
    if (error) {
      throw error
    }
	  if(results.rows.length > 0){
		  response.status(200).json(results.rows)
	  }
	  else{
		  response.status(201).send(`No work found with this id!!!`)
	  }
  })
}

const updateTrabalho = (request, response) => {
  const id_trabalho = parseInt(request.params.id_trabalho)
  const { json_trabalho } = request.body

  pool.query(
    'UPDATE trabalho SET json_trabalho = $2 WHERE id_trabalho = $1',
    [id_trabalho, json_trabalho],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id_trabalho}`)
    }
  )
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { id, name, email } = request.body

  pool.query('INSERT INTO users (id, name, email) VALUES ($1, $2, $3)', [id, name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Usuario adicionado with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getTrabalho,
  updateTrabalho,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}

