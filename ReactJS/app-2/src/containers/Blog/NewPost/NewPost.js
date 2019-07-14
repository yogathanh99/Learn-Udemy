import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import './NewPost.css'

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: 'Thanh',
    submitted: false
  }

  postDataHandler = () => {
    const post = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.author
    }

    axios.post('/posts', post).then(response => {
      console.log(response)
      //I can use props.history to redirect -> history push method use stack to save current page
      this.props.history.push('/')
      //Redirect use replace current page -> Same as history replace method
      // this.setState({ submitted: true })
    })
  }

  render() {
    // let submitted = null
    // if (this.state.submitted) {
    //   submitted = <Redirect to="/" />
    // }
    return (
      <div className="NewPost">
        {/* {submitted} */}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Thanh">Thanh</option>
          <option value="Minh">Minh</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    )
  }
}

export default NewPost
