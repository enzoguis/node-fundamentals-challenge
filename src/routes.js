import { Database } from './database.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      return res.end(JSON.stringify(database.select('tasks')))
    },
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body

      const data = {
        title,
        description,
        created_at: new Date(),
        completed_at: null,
      }
      console.log(data)

      database.insert('tasks', data)
      return res.writeHead(201).end()
    },
  },
  {
    method: 'PUT',
    path: '/tasks/:id',
    handler: (req, res) => {},
  },
]
