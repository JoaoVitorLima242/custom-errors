import BusinessError from './errors/businessError.js'
import { HTTP_STATUS_CODE } from './util/httpCode.js'
import Http from 'http'

function validateHero(hero) {
  if (hero.age < 20) {
    throw new BusinessError('age must be higher than 20!')
  }

  if (hero.name?.length < 4) {
    throw new BusinessError('name length must be higher than 4!')
  }

  if (Reflect.has(hero, 'connectionError')) {
    throw new Error('error connection')
  }
}

async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data)
      console.log({ hero })
      validateHero(hero)
      res.writeHead(HTTP_STATUS_CODE.OK)
      res.end()
    } catch (error) {
      if (error instanceof BusinessError) {
        res.writeHead(HTTP_STATUS_CODE.BAD_REQUEST)
        res.end(error.message)
        continue;
      }
      res.writeHead(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      res.end()
    }
  }
}

Http.createServer(handler).listen(3000, () => console.log('running at 3000'))

// curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": "80"}'
