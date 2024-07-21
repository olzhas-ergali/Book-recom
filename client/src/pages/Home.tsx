import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchBooks } from '../features/books/bookSlice';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Book List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-5 rounded shadow">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">by {book.author}</p>
            <p className="text-gray-600">Genre: {book.genre}</p>
            <p className="mt-3">{book.description}</p>
            <Link to={`/book/${book._id}`} className="mt-3 text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
