import express from 'express'
import mysql from 'mysql2'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  database: 'test',
  user: 'root',
  password: 'paxxword',
  insecureAuth: true,
})

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books'

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err)

    res.json(data)
  })
})

app.get('/books/:id', (req, res) => {
  const q = 'SELECT * FROM books WHERE id = ?'

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err)

    res.json(data)
  })
})

app.post('/books', (req, res) => {
  const q = 'INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)'
  const { title, desc, cover, price } = req.body
  const values = [title, desc, cover, price]

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err)

    res.json(data)
  })
})

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q = 'DELETE FROM books WHERE id = ?'

  db.query(q, [bookId], (err, data) => {
    if (err) return res.status(500).json(err)

    res.json('Book has been deleted successfully')
  })
})

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q =
    'UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?'

  const { title, desc, cover, price } = req.body
  const values = [title, desc, cover, price]

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.status(500).json(err)

    res.json('Book has been updated successfully')
  })
})

app.listen(3000, () => console.log('Running on port 3000'))
