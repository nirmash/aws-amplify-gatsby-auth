import React from 'react'
import { Link } from 'gatsby'
import { getCurrentUser } from '../utils/auth'

const Home = () =>{ 
const user = getCurrentUser()
return(<div>
  <h1>Home</h1>
	<p>Hello {user.username}</p>
	<p>You are now logged in! <Link to="/app/profile">View profile</Link></p>
	<p>Now go build something great and deploy it using the <a href="https://console.amplify.aws">AWS Amplify Console</a></p>
	</div>)
}

export default Home