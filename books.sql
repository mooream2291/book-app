DROP TABLE IF EXISTS book_table;

CREATE TABLE IF NOT EXISTS book_table (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  isbn NUMERIC,
  bookShelf VARCHAR,
  image_url VARCHAR,
  description VARCHAR
);

INSERT INTO book_table (author, title, image_url, description, bookShelf, isbn) VALUES ('some author', 'some title', 'some image', 'some descript', 'some bookshelf', 456894576);

INSERT INTO book_table (author, title, image_url, description, bookShelf, isbn) VALUES ('some author', 'some title', 'some image', 'some descript', 'some bookshelf', 456894576);

INSERT INTO book_table (author, title, image_url, description, bookShelf, isbn) VALUES ('some author', 'some title', 'some image', 'some descript', 'some bookshelf', 456894576);

INSERT INTO book_table (author, title, image_url, description, bookShelf, isbn) VALUES ('some author', 'some title', 'some image', 'some descript', 'some bookshelf', 456894576);
