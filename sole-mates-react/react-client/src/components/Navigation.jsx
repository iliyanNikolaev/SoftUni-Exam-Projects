import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export const Navigation = () => {
  const { userData } = useAuthContext();

  return (
    <header>
      <Link id="logo" to="/"><img id="logo-img" src="./images/logo.png" alt="" /></Link>
      <nav>
        <div>
          <Link to="/dashboard">Dashboard</Link>
          {/* <a href="#">Search</a> */}
        </div>
      {userData.isAuthenticated ? <UserTemplate /> : <GuestTemplate />}
      </nav>
    </header>
  )
}

const UserTemplate = () =>
  <div className="user">
    <Link to="/create">Add Pair</Link>
    <Link to="/logout">Logout</Link>
  </div>

const GuestTemplate = () => <div className="guest">
  <Link to="/login">Login</Link>
  <Link to="/register">Register</Link>
</div>

