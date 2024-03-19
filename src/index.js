import HeroEntity from './hero.js'
import { HTTP_STATUS_CODE } from './util/httpCode.js'
import Http from 'http'


async function handler(req, res) {
  for await (const data of req) {
    try {
      const parsedData = JSON.parse(data)

      if (Reflect.has(parsedData, 'connectionError')) {
        throw new Error('connectionError')
      }

      const hero = new HeroEntity(parsedData)

      if (!hero.isValid()) {
        res.writeHead(HTTP_STATUS_CODE.BAD_REQUEST)
        res.end(hero.notifications.join('\n'))
        return
      }


      res.writeHead(HTTP_STATUS_CODE.OK)
      res.end()
    } catch (error) {
      res.writeHead(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      res.end()
    }
  }
}

Http.createServer(handler).listen(3000, () => console.log('running at 3000'))

// curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": "80"}'
