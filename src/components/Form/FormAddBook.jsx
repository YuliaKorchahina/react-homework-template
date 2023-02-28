import { Component } from 'react';
import styles from './BookForm.module.css';

export class FormAddBook extends Component {
  state = {
    title: '',
    autor: '',
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.setState({
      title: '',
      autor: '',
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { title, autor } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            value={title}
            name="title"
            onChange={handleChange}
            className={styles.field}
            placeholder="Enter the Title"
            type="text"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Autor</label>
          <input
            value={autor}
            name="autor"
            onChange={handleChange}
            className={styles.field}
            placeholder="Enter the author"
            type="text"
          />
        </div>
        <button className={styles.btn}>Add book</button>
      </form>
    );
  }
}
