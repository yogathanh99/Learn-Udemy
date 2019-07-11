import React, { Component } from 'react'
import axios from 'axios'

import Post from '../../../components/Post/Post'
import './Posts.css'

export default class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount() {
    axios
      .get('/posts')
      .then(respone => {
        const posts = respone.data.slice(0, 4)
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Thanh'
          }
        })
        this.setState({ posts: updatedPosts })
      })
      .catch(error => {
        console.log(error)
        this.setState({ error: true })
      })
  }

  postSelectedHandler = id => {
    this.props.history.push(`/posts/${id}`)
  }
  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something wrong...</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        <Post
          key={post.id}
          author={post.author}
          title={post.title}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      ))
    }
    return <section className="Posts">{posts}</section>
  }
}
