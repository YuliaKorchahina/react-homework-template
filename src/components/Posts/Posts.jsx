import styles from './Post.module.css';
import { Component } from 'react';

import { getPosts } from '../API/posts';


class Posts extends Component {

    state = {
      items: [],
      loading: false,
      error: null,
      page: 1,
    }
  
    componentDidMount(){
      this.fetchPosts();
    
    }
  
    componentDidUpdate(_, prevState) {
      const {page} = this.state;
  
      if(prevState.page !== page) {
         this.fetchPosts();
      }
    }
  
    async fetchPosts() {
      const {page} = this.state;
      this.setState({
          loading: true,
      });
  
      try {
          const data = await getPosts(page);
          this.setState(({items}) => ({
              items: [...items, ...data]
          }))
      } catch (error) {
          this.setState({
              error,
          })
      }
      finally {
          this.setState({ loading: false })
      }
    }
  
    /*
    fetchPosts() {
      const {page} = this.state;
      this.setState({
          loading: true,
      });
  
      axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=12`)
          .then(({data}) => {
              this.setState(({items}) => ({
                  items: [...items, ...data]
              }))
          })
          .catch(error => {
              this.setState({
                  error,
              })
          })
          .finally(()=> this.setState({ loading: false }))
    }
    */
    loadMore = () => {
      this.setState(({page}) => ({
          page: page + 1
      }))
    }
  
   
    render() {
      const { items, loading, error } = this.state;
      const {loadMore} = this;
  
      const elements = items.map(({ id, title }) => <li key={id} className={styles.item}>{title}</li>);
  
      return (
          <div className={styles.container}>
              <h2 className={styles.title}>List of posts</h2>
              <ul className={styles.list}>{elements}</ul>
              {loading && <p>....Loading posts</p>}
              {error && <p>Ooops...</p>}
              {Boolean(items.length) && <button onClick={loadMore}>load more</button>}
          </div>
      
      )
    }
  }

  export default Posts;
