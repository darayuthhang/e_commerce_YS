CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email text UNIQUE NOT Null,
  name VARCHAR(255),
  refreshToken VARCHAR(255) DEFAULT NULL,
  entries BIGINT DEFAULT 0,
  password VARCHAR(255),
  joined TIMESTAMP NOT NULL
);

Drop TABLE IF EXISTS users;
INSERT INTO users (email, name, password) values('darayuthhang12@gmail.com', 'yuth', '123');
SELECT * FROM users;

select email, password
from users
where email = 'darayuthhang124@gmail.com';
