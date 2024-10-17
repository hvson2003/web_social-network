import { Link } from "react-router-dom"
import "./login.scss"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>SocialNetwork</h1>
          <p>
            Welcome to our social network, where you can connect, share, and engage with friends and communities. Join us and be part of a vibrant digital space!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>

        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={ handleLogin }>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login