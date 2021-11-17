const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pwmkuvvqjymjno',
  host: 'ec2-23-23-164-251.compute-1.amazonaws.com',
  database: 'dc70o74a8h7i39',
  password: 'e2a1f5c4f786598785c772a729ef2bb2b27d36fcf98c2b669067e7d0246466ae',
  port: 5432,
})


const getUsers = (request, response) => {
  pool.query('SELECT * FROM usuario', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTrabalho = (request, response) => {
  const idTrabalho = parseInt(request.params.idTrabalho)

  pool.query('SELECT * FROM usuario WHERE id_trabalho = $1', [idTrabalho], (error, results) => {
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

  pool.query('SELECT * FROM usuario WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { id, nome, cpf } = request.body

  pool.query('INSERT INTO usuario (id, nome, cpf) VALUES ($1, $2, $3)', [id, nome, cpf], (error, results) => {
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

