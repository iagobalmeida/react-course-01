import './styles.css';
// React
import { Component } from 'react';
// Utils
import { loadPost } from '../../utils/loadPosts';
// Components
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    search: ''
  };

  fetchPosts = async() => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPost();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({
      posts, page: nextPage
    })
  }

  async componentDidMount() {
    await this.fetchPosts();
  }

  handleInputChange = (value) => {
    this.setState({search: value});
  }

  render() {
    const { posts, allPosts, postsPerPage, page, search } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = posts.filter((post) => ( search ? (post.title.toLowerCase() + post.body.toLowerCase()).includes(search.toLowerCase()) : true ));

    return (
      <section className="post-wrapper">
        <SearchInput handleChange={this.handleInputChange} value={search}/>
        {
          filteredPosts.length > 0 && (
            <Posts posts={filteredPosts} />
          )
        }
        {
          filteredPosts.length <= 0 && (
            <p>No post found</p>
          )
        }
        { !search && (
          <Button text="Load more posts" onClick={this.loadMorePosts} disabled={noMorePosts}/>
        )}
      </section>
    )
  };
}

export default Home;
