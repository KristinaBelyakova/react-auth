import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Main() {


  const dispatch = useDispatch()
  const history = useHistory()

  const authHandler = () => {
    return history.push('/signup')
  }

  const signinHandler = (e) => {
    e.preventDefault()
    const { username, password } = e.target
  
    fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data) {
          localStorage.setItem('token', data.token);
          dispatch({ type: "LOGIN", payload: data.user });
          return history.push('/profile')
        } else {
          alert('Failed access to this account')
        };
      })
  }

  return (
    <div>
      <form onSubmit={signinHandler} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "50% auto" }}>
        <img src="https://www.imaswmp.in/wp-content/uploads/default-avatar.jpg" style={{ height: "100px", borderRadius: "100px" }} alt="image1" />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px" }}>
          <input name="username" placeholder="Username" style={{ marginBottom: "10px", height: "1.3rem" }} autoFocus />
          <input name="password" placeholder="Password" style={{ height: "1.3rem" }} />
        </div>
        <div style={{ fontSize: "6px", display: "flex",  }}>
          <p><input type="checkbox" />Remember me</p>
          <p style={{alignItems: 'center'}}><a href="/">Forgot password?</a></p>
        </div>
        <input type="submit" value="Login" style={{ background: "#40cfff", color: "white", borderRadius: "4px", width: "40%", height: "30px", fontWeight: "bold" }} />
        <div style={{ marginTop: "10px" }}>
          Not a member? <input type="submit" value="Create account" style={{ background: "white", border: "1px solid #40cfff" }} onClick={authHandler} />
        </div>
      </form>

    </div>
  );
}

export default Main;
