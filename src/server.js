import { createServer } from 'http'
import { convertedJson } from '../middlewares/json.js'
import { routes } from './routes.js'

const server = createServer(async (req, res) => {
  const { method, url } = req

  await convertedJson(req, res)

  const route = routes.find((route) => route.method === method)

  if (route) {
    return route.handler(req, res)
  }
})

server.listen(3000)
