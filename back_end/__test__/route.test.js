const app = require("../app");
const request = require('supertest')

describe('Post Endpoints', () => {
  test('should create a new post', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: "yuth",
        email: 'darayuthhang12@gmail.com',
        password:"asdfas"
      })
    expect(res.statusCode).toEqual(200)

  })
})

