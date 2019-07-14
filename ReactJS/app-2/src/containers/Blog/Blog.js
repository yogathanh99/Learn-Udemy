import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'

import Posts from './Posts/Posts'
// import NewPost from './NewPost/NewPost'
import asyncComponent from '../../hoc/asyncComponent'
import FullPost from './FullPost/FullPost'
import './Blog.css'

const AsyncComponent = asyncComponent(() => import('./NewPost/NewPost'))

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
        <Switch>
          {/* <Route path="/new-post" component={NewPost} /> */}
          <Route path="/new-post" component={AsyncComponent} />
          <Route path="/posts/:id" component={FullPost} />
        </Switch>
      </div>
    )
  }
}

export default Blog
