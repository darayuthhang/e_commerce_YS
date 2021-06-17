CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email text UNIQUE NOT Null,
  name VARCHAR(255),
  entries BIGINT DEFAULT 0,
  password VARCHAR(255),
  joined TIMESTAMP NOT NULL
);


INSERT INTO users (email, name, password) values('darayuthhang12@gmail.com', 'yuth', '123');
SELECT * FROM users;

select email, password
from users
where email = 'darayuthhang124@gmail.com';
