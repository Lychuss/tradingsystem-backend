/* Create all needed tables for database */
CREATE TABLE users (
	student_id VARCHAR(9) PRIMARY KEY,
	first_name VARCHAR(225),
	last_name VARCHAR(225),
	grade_level VARCHAR(225),
	college VARCHAR(225),
	email VARCHAR(225),
	passwords VARCHAR
);

CREATE TABLE trading_products (
	product_id BIGSERIAL PRIMARY KEY,
	title VARCHAR(225),
	requirements VARCHAR(225),
	url VARCHAR(225),
	price Decimal(10,2),
	methods INT References methods(method_id),
	student_id TEXT References users(student_id),
	program INT References programs(program_id),
	type INT References types(type_id),
	email VARCHAR(225),
	location VARCHAR(225)
);

CREATE TABLE methods (
	method_id BIGSERIAL PRIMARY KEY,
	methods VARCHAR(225)
);

CREATE TABLE programs(
	program_id BIGSERIAL PRIMARY KEY,
	programs VARCHAR(225)
);

CREATE TABLE types(
	type_id BIGSERIAL PRIMARY KEY,
	types VARCHAR(225)
);

/* Example insert of value */
INSERT INTO methods (methods) VALUES ('Trade'), ('Sell');

INSERT INTO programs (programs) VALUES ('CIT'), ('CABHA'), ('CEN'), ('CAS'), ('CAM'), ('CAG'), ('CTE');

INSERT INTO types (types) VALUES ('Book'), ('Notes'), ('Uniforms');

INSERT INTO users VALUES ('24L-00021', 'raphael mharcus', 'san juan', '2', 'CEN', 'rap@slsu.edu.ph', 'leesingripex');

INSERT INTO trading_products (
  product_id, title, requirements, url, price, methods, student_id, program, type, email, location
) VALUES (
  10,
  'biology notes 2',
  'dadwadawdsagasgasgsagwawa',
  'https://res.cloudinary.com/dkacxbbwh/image/upload/v1759571757/yes4trade/yhbx4w8ggh5u7umi7b2l.jpg',
  NULL,
  1,
  '24L-00021',
  4,
  2,
  'rap@gmail.com',
  'near the slsu'
);

/* Update values inside of the database */
UPDATE types SET types = 'Uniform' WHERE type_id = 3;

UPDATE types SET types = 'Books' WHERE type_id = 1;