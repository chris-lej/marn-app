import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {

  state = {
    title: '',
    body: '',
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost()
  }

  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data
        this.setState({ posts: data })
        console.log('Data received')
      })
      .catch((error) => {
        console.log('Error:', error)
      })
  };

  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value
    })
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data was sent!!')
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => console.log('Internal server error'))
  };

  displayBlogPosts = (posts) => {
    if (!posts.length) return <div>No posts yet</div>;

    return posts.map((post, index) => (
      <div key={index} className="blog-posts_display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
  };

  render() {
    console.log('State', this.state);

    return (
      <div className="app">
        <h2>
          Welcome To My World!
        </h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="Body"
              name="body"
              rows="10"
              cols="30"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </div>

          <button>Submit</button>
        </form>

        <div className="blog-">
          {
            this.displayBlogPosts(this.state.posts)
          }
        </div>
      </div>

  );
  }
}


export default App;
