DROP TABLE IF EXISTS book_table;

CREATE TABLE IF NOT EXISTS book_table (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  isbn VARCHAR(255),
  bookshelf VARCHAR(255),
  image_url VARCHAR(255),
  description TEXT
);

INSERT INTO book_table (author, title, image_url, description, bookshelf, isbn) VALUES ('some author', 'some title', 'some image', 'some descript', 'some bookshelf', 456894576);

INSERT INTO book_table (author, title, image_url, description, bookshelf, isbn) VALUES ('some author', 'some title', 'some image', 'some descript', 'some bookshelf', 456894576);

INSERT INTO book_table (author, title, image_url, description, bookshelf, isbn) VALUES ('some author', 'some title', 'some image', 'some descript', 'some bookshelf', 456894576);

INSERT INTO book_table (author, title, image_url, description, bookshelf, isbn) VALUES ('some author', 'some title', 'some image', 'some descript', 'some bookshelf', 456894576);

