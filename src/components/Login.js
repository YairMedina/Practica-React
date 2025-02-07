import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css' // Importar Bootstrap
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    axios
      .post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password
      })
      .then(response => {
        console.log(response.data)
        localStorage.setItem("token",response.data.token)
        login({ email });
        navigate("/");
      })
      .catch(error => {
        console.log(error.response.data)
        alert(error.response.data.message)
      })
    
  }
// USER "ADMIN"
//Email: Ymedina388@gmail.com
//Password: Ymedina388


  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-4 shadow-lg' style={{ width: '350px' }}>
        <h2 className='text-center mb-4'>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='email'
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
            Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='password'
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn btn-primary w-100'>
           SIGN IN
          </button>
          &nbsp;
          <button className='btn btn-warning w-100 ' onClick={() => navigate('/')}>
            <i className='fa-solid fa-house'></i> HOME
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
