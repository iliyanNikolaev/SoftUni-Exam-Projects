import React from 'react'
import { Link } from 'react-router-dom'

export const LoginPage = () => {
  return (
    <section id="login">
    <div className="form">
      <h2>Login</h2>
      <form className="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
      </form>
    </div>
  </section>
  )
}
