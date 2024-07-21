import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { fetchReviews } from '../features/reviews/reviewSlice';
import { fetchBooks } from '../features/books/bookSlice';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { books } = useSelector((state: RootState) => state.books);
  const { reviews, loading, error } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  const book = books.find((b) => b._id === id);

  if (!book) {
    return <div>Book not found</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">{book.title}</h1>
      <p className="text-gray-600">by {book.author}</p>
      <p className="text-gray-600">Genre: {book.genre}</p>
      <p className="mt-3">{book.description}</p>
      <h2 className="text-xl font-bold mt-5">Reviews</h2>
      <div className="mt-3">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-5 rounded shadow mb-4">
            <p className="font-semibold">{review.user.name}</p>
            <p className="text-yellow-500">Rating: {review.rating} / 5</p>
            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
