import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Details from "../components/Details"
import Home from "../components/Home"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import PrivateRoute from "../components/PrivateRoute"
import Todo from "../components/Todo"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/home" component={Home} />
      <PrivateRoute path="/app/profile" component={Details} />
      <PrivateRoute path="/app/todo" component={Todo} />
      <Login path="/app/login" />
      <SignUp path="/app/signup" />
      <Todo path="/app/todo" />
    </Router>
  </Layout>
)

export default App