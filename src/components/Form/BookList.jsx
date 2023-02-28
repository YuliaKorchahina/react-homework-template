import styles from './book-list.module.css';
import PropTypes from 'prop-types';

export const BookList = ({ items, removeBook }) => {
  const elements = items.map(({ id, title, autor }) => (
    <li key={id}>
      "{title}". Autor: {autor}
      <span onClick={() => removeBook(id)} className={styles.remove}>
        {' '}
        X
      </span>
    </li>
  ));

  return (
    <>
      <h4>My books</h4>
      <ol>{elements}</ol>
    </>
  );
};

BookList.protoTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      autor: PropTypes.string.isRequired,
    })
  ),
};
