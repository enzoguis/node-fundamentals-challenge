import { Database } from './database.js'
import { randomUUID } from 'crypto'
import { routePathRegex } from './utils/route-path-regex.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: routePathRegex('/tasks'),
    handler: (req, res) => {
      return res.end(JSON.stringify(database.select('tasks')))
    },
  },
  {
    method: 'POST',
    path: routePathRegex('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      const data = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        completed_at: null,
        completed: false,
        updated_at: null,
      }

      database.insert('tasks', data)
      return res.writeHead(201).end()
    },
  },
  {
    method: 'PUT',
    path: routePathRegex('/tasks/:id'),
    handler: (req, res) => {
      console.log('acessou')
    },
  },
  {
    method: 'PATCH',
    path: routePathRegex('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      const data = {
        completed: true,
        completed_at: new Date(),
        updated_at: new Date(),
      }
      database.completed('tasks', id, data)
      res.writeHead(200).end()
    },
  },
  {
    method: 'DELETE',
    path: routePathRegex('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      database.delete('tasks', id)
      return res.writeHead(204).end()
    },
  },
]
