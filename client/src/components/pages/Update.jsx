import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const Update = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    cover: '',
    price: null,
  })
  const navigate = useNavigate()
  const location = useLocation()

  const bookID = location.pathname.split('/')[2]

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`http://localhost:3000/books/${bookID}`, book)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/books/${bookID}`)
        setBook(res.data[0])
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
      <h1 className="mt-4 mb-10 text-center font-bold text-7xl text-cyan-500">
        Update Book
      </h1>
      <div className="flex flex-col gap-2 justify-center items-center">
        <label className="text-lg text-cyan-500 font-medium" htmlFor="title">
          Title:
        </label>
        <input
          id="title"
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          className="w-64 py-2 px-4 text-lg outline-cyan-500 md:w-96"
          value={book.title}
        />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <label className="text-lg text-cyan-500 font-medium" htmlFor="desc">
          Description:
        </label>
        <input
          id="desc"
          type="text"
          name="desc"
          onChange={handleChange}
          placeholder="desc"
          className="w-64 py-2 px-4 text-lg outline-cyan-500 md:w-96"
          value={book.desc}
        />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <label className="text-lg text-cyan-500 font-medium" htmlFor="cover">
          Cover
        </label>
        {book.cover ? (
          <img
            className="w-64 h-96 object-cover rounded-xl"
            src={book.cover}
            alt=""
          />
        ) : (
          <div className="w-64 h-96 bg-gray-300 rounded-xl"></div>
        )}
        <input
          id="cover"
          type="text"
          name="cover"
          onChange={handleChange}
          placeholder="cover"
          className="w-64 py-2 px-4 text-lg outline-cyan-500 md:w-96"
          value={book.cover}
        />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <label className="text-lg text-cyan-500 font-medium" htmlFor="price">
          Price
        </label>
        <input
          id="price"
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="price"
          className="w-64 py-2 px-4 text-lg outline-cyan-500 text-center md:w-96"
          value={book.price}
        />
      </div>
      <button className="py-4 px-8 bg-cyan-500 text-xl font-bold text-slate-50 rounded-xl hover:bg-cyan-400">
        Update
      </button>
    </form>
  )
}

export default Update
