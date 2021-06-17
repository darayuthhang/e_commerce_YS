const app = require("../app");
const request = require('supertest')
// CREATE TABLE users (
//   ID SERIAL PRIMARY KEY,
//   email text UNIQUE NOT Null,
//   name VARCHAR(255),
//   entries BIGINT DEFAULT 0,
//   password VARCHAR(255),
//   joined TIMESTAMP NOT NULL
// );

describe('Post Endpoints', () => {
  test('should create a new post', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: "yuth",
        email: 'darayuthhang124@gmail.com',
        password:"asdfas",
        joined: new Date()
      })
    expect(res.statusCode).toEqual(200)

  })
})

