import React, { useRef } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


function Signup(props) {

  const dispatch = useDispatch()
  const history = useHistory()

  const first_password = useRef()
  const repeat_password = useRef()

  const reg1 = new RegExp(/[^A-Z-a-z-0-9]/g)
  const reg2 = new RegExp(/[A-Z]{2,}/g)
  const reg3 = new RegExp(/[0-9]{4,}/g)

  const signupHandler = (e) => {
    e.preventDefault()
    const { username, email, password } = e.target
    if (username.value.length > 12) {
      alert('Имя должно содержать менее 12 символов')
      return false;
    }
    if (password.value.length > 24) {
      alert('Пароль должен содержать менее 24 символов')
      return false;
    } else if (password.value.length < 8) {
      alert('Пароль должен содержать более 8 символов')
      return false;
    } else if (password.value.match(reg1)) {
      alert('В пароле используются спецсимволы!')
      return false;
    } else if (!password.value.match(reg2)) {
      alert('В пароле должны содержаться 2 и более заглавные буквы')
      return false;
    } else if (!password.value.match(reg3)) {
      alert('В пароле должны содержаться 4 и более цифры')
      return false;
    }
    if (first_password.current.value === repeat_password.current.value) {
      fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({ username: username.value, email: email.value, password: password.value })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data) {
            localStorage.setItem('token', data.token);
            dispatch({ type: "SIGNUP", payload: data.user });
            alert(data.message)
            // return history.push('/profile')
          } else {
            alert(data.message)
          }
        })
    } else {
      alert("Пароли не совпали!")
    }
  }

  return (
    <div>
      <form onSubmit={signupHandler} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "50% auto" }}>
        <img src="https://www.imaswmp.in/wp-content/uploads/default-avatar.jpg" style={{ height: "100px", borderRadius: "100px" }} alt="image1" />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px" }}>
          <input name="username" placeholder="Username" style={{ marginBottom: "10px", height: "1.3rem" }} autoFocus />
          <input name="email" type="email" placeholder="Email" style={{ marginBottom: "10px", height: "1.3rem" }} />
          <input ref={first_password} name="password" type="password" placeholder="Password" style={{ marginBottom: "10px", height: "1.3rem" }} />
          <input ref={repeat_password} name="repeat_password" type="password" placeholder="Repeat password" style={{ height: "1.3rem" }} />
        </div>
        <input type="submit" value="Signup" style={{ background: "#40cfff", color: "white", borderRadius: "4px", width: "40%", height: "30px", fontWeight: "bold"  }} />
      </form>
    </div>
  );
}

export default Signup;
