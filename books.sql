DROP TABLE IF EXISTS book_tables;

CREATE TABLE IF NOT EXISTS book_table (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  isbn NUMBER,
  image_url VARCHAR,
  description VARCHAR
)

INSERT INTO book_table (authors, title, image_url, description, bookshelf) VALUES (‘some author’, ‘some title’, ‘some image’, ‘some descript’, ‘some bookshelf’);
