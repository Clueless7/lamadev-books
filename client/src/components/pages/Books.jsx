import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ImPlus } from 'react-icons/im'

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/books')
        setBooks(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:3000/books/' + id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className="mt-4 mb-10 text-center font-bold text-7xl text-cyan-500">
        List of Books
      </h1>
      <div className="flex flex-col gap-4 justify-center items-center">
        {books.map((book) => (
          <div
            key={book.id}
            className="mb-4 max-w-lg flex flex-col items-center gap-4"
          >
            {book.cover ? (
              <img
                className="w-64 h-96 object-cover rounded-xl"
                src={book.cover}
                alt=""
              />
            ) : (
              <div className="w-64 h-96 bg-gray-300 rounded-xl"></div>
            )}
            <h2 className="text-4xl text-center font-medium">{book.title}</h2>
            <h2 className="text-xl text-center font-light">{book.desc}</h2>
            <span className="text-xl text-center text-slate-600 italic">
              ${book.price}
            </span>
            <button className="py-2 px-4 rounded-lg text-slate-50 bg-cyan-500 hover:bg-cyan-400">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
            <button
              onClick={() => handleDelete(book.id)}
              className="py-2 px-4 rounded-lg text-slate-50 bg-purple-500 hover:bg-purple-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-cyan-500 text-center text-slate-50 hover:bg-cyan-400">
        <Link
          className="w-full h-full flex justify-center items-center"
          to="/add"
        >
          <ImPlus />
        </Link>
      </button>
    </div>
  )
}

export default Books
