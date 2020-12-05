import React from 'react'
import { Link } from 'gatsby'
import { getCurrentUser } from '../utils/auth'

const Home = () =>{ 
const user = getCurrentUser()
return(<div>
  <h1>Home</h1>
	<p>Hello {user.username}</p>
	<p>You are now logged in! <Link to="/app/profile">View profile</Link></p>
	<p>Todo list <Link to="">Todo List</Link></p>
	</div>)
}

export default Home