import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const [book, setBook] = useState({
    title: '',
    desc: '',
    cover: '',
    price: null,
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3000/books', book)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
      <h1 className="mt-4 mb-10 text-center font-bold text-7xl text-cyan-500">
        Add new Book
      </h1>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        placeholder="title"
        className="w-64 py-2 px-4 text-lg outline-cyan-500 md:w-96"
      />
      <input
        type="text"
        name="desc"
        onChange={handleChange}
        placeholder="desc"
        className="w-64 py-2 px-4 text-lg outline-cyan-500 md:w-96"
      />
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
        type="text"
        name="cover"
        onChange={handleChange}
        placeholder="cover"
        className="w-64 py-2 px-4 text-lg outline-cyan-500 md:w-96"
      />
      <input
        type="number"
        name="price"
        onChange={handleChange}
        placeholder="price"
        className="w-64 py-2 px-4 text-lg outline-cyan-500 md:w-96"
      />
      <button className="py-4 px-8 bg-cyan-500 text-xl font-bold text-slate-50 rounded-xl hover:bg-cyan-400">
        Add
      </button>
    </form>
  )
}

export default Add
