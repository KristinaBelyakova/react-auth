import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import jwt from "jsonwebtoken"

const app = express()

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "mysql2",
  password: ""
});


connection.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


// app.get('/', (req, res) => {
//   const sql = 'CREATE TABLE users (id int AUTO_INCREMENT, username VARCHAR(14), email VARCHAR(30), password VARCHAR(20), PRIMARY KEY (id))'
//   connection.query(sql, (err) => {
//     if (err) {
//       throw err
//     }
//     res.send('table created')
//   })
// })

// app.get('/', (req, res) => {
//   const sql = 'INSERT INTO users (username, email, password) VALUES ("petr", "1@1.ru", "123")'
//   connection.query(sql, (err) => {
//     if (err) {
//       throw err
//     }
//     res.send('user created')
//   })
// })

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body

  try {
    connection.query('select * from users where username = ? and email = ?',
      [username, email],
      (err, result) => {
        console.log(result);
        if (result.length) {
          return res.status(400).json({
            message: 'Такой пользователь уже существует!'
          });
        } else {
          connection.query('insert into users (username, email, password) values (?, ?, ?)',
            [username, email, password],
            (err, result) => {
              if (err) {
                return res.status(400).json({ message: err })
              } else {
                console.log(result);
                const token = jwt.sign({ id: result.id }, '12345dfjg', {
                  expiresIn: '1h'
                });
                return res.status(201).json({ user: result[0], token, message: 'Успешная регистрация!' })
              }
            })
        }
      }
    )
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Ошибка регистрации" })
  }
})

app.post('/signin', (req, res) => {
  const { username, password } = req.body

  connection.query('select * from users where username = ? and password = ?',
    [username, password],
    (err, result) => {
      if (err) {
        return res.json(err);
      } else {
        if (result) {
          const token = jwt.sign({ id: result[0].id }, '12345dfjg', {
            expiresIn: '1h'
          });
          return res.status(201).json({ user: result[0], token, message: 'Успешная авторизация' })
        }
        res.status(400).json({ message: 'Неправильная комбинация пользователь/пароль' })
      }
    }
  )
})

export default app
