import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'

import Posts from './Posts/Posts'
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'
import './Blog.css'

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-post',
                    search: '?sumit=true',
                    hash: '#submit'
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Route exact path="/" component={Posts} />
        <Route exact path="/post/:id" component={FullPost} />
        <Route path="/new-post" component={NewPost} />
      </div>
    )
  }
}

export default Blog
