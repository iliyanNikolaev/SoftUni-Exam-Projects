import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect } from 'react';

export const LoginPage = () => {
  const { login, userData } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if(userData.isAuthenticated) navigate('/');
  }, [])
  
  const { formValues, onChange } = useForm({
    email: '',
    password: ''
  });

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    if(!email || !password) {
      return alert('All fields are required!');
    }
    await login(email, password);
    navigate('/');
  }

  return (
    <section id="login">
    <div className="form">
      <h2>Login</h2>
      <form className="login-form" onSubmit={loginSubmitHandler}>
        <input type="text" name="email" id="email" placeholder="email" onChange={onChange}/>
        <input type="password" name="password" id="password" placeholder="password" onChange={onChange}/>
        <button type="submit">login</button>
        <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
      </form>
    </div>
  </section>
  )
}
