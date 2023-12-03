import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useAuthContext } from '../contexts/AuthContext';

export const RegisterPage = () => {

  const { formValues, onChange } = useForm({
    email: '',
    password: '',
    're-password': ''
  });

  const { register } = useAuthContext();

  const navigate = useNavigate();

  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password, ['re-password']: rePass } = formValues;
    if(!email || !password) {
      return alert('All fields are required!');
    }
    if(password != rePass) {
      return alert('Passwords don\'t match!');
    }
    await register(email, password);
    navigate('/');
  }

  return (
    <section id="register">
    <div className="form">
      <h2>Register</h2>
      <form className="login-form" onSubmit={registerSubmitHandler}>
        <input type="text" name="email" id="register-email" placeholder="email" onChange={onChange} />
        <input type="password" name="password" id="register-password" placeholder="password" onChange={onChange} />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" onChange={onChange} />
        <button type="submit">login</button>
        <p className="message">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  </section>
  )
}
