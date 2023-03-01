import { Component } from 'react';
import styles from './books.module.css';
import { FormAddBook } from './Form/FormAddBook';
import { BookList } from './Form/BookList';

import { nanoid } from 'nanoid';

// const books = [
//   {
//     id: '1',
//     title: 'Worm',
//     autor: 'Jon Mackay',
//   },
// ];

export class Books extends Component {
  state = {
    books: [],
    filter: '',
    url: '',
  };

  componentDidMount() {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books?.length) {
      this.setState({
        books,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { books } = this.state;
    if (prevState.books.length !== books.length) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  addBook = data => {
    this.setState(prevState => {
      const newBook = {
        id: nanoid(),
        ...data,
      };

      return {
        books: [...prevState.books, newBook],
      };
    });
  };

  removeBook = id => {
    this.setState(({ books }) => {
      const newBooks = books.filter(item => item.id !== id);
      return {
        books: newBooks,
      };
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getFiltredBooks = () => {
    const { books, filter } = this.state;

    if (!filter) {
      return books;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filtredBooks = books.filter(({ title, autor }) => {
      const normalizedTitle = title.toLocaleLowerCase();
      const normalizedAutor = autor.toLocaleLowerCase();
      const results =
        normalizedTitle.includes(normalizedFilter) ||
        normalizedAutor.includes(normalizedFilter);
      return results;
    });

    return filtredBooks;
  };

  render() {
    const books = this.getFiltredBooks();
    const { addBook, removeBook, handleChange } = this;
    return (
      <div className={styles.container}>
        <h2>My books</h2>
        <div className={styles.row}>
          <div className={styles.column}>
            <FormAddBook onSubmit={addBook} />
          </div>
          <div className={styles.column}>
            <input
              name="filter"
              onChange={handleChange}
              className="filter"
              type="text"
              placeholder="Filter"
            />
            <BookList items={books} removeBook={removeBook} />
          </div>
        </div>
      </div>
    );
  }
}
