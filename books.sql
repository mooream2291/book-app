DROP TABLE IF EXISTS savedBooks;

CREATE TABLE IF NOT EXISTS savedBooks (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  isbn NUMBER,
  image_url VARCHAR,
  description VARCHAR
)

INSERT INTO book_table (authors, title, image_url, description, bookshelf) VALUES (‘some author’, ‘some title’, ‘some image’, ‘some descript’, ‘some bookshelf’);
