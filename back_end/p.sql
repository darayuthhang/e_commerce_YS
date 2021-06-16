CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR(30),
  name VARCHAR(30),
  password VARCHAR(30)
);


INSERT INTO users (email, name, password) values('darayuthhang12@gmail.com', 'yuth', '123');
SELECT * FROM users;


