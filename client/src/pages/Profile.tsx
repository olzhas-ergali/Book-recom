import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { loadUser } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Profile</h1>
      <p className="text-gray-600">Name: {user.name}</p>
      <p className="text-gray-600">Email: {user.email}</p>
      <h2 className="text-xl font-bold mt-5">My Reviews</h2>
      <div className="mt-3">
        {user.reviews.map((review) => (
          <div key={review._id} className="bg-white p-5 rounded shadow mb-4">
            <Link to={`/book/${review.book._id}`} className="font-semibold text-blue-500 hover:underline">
              {review.book.title}
            </Link>
            <p className="text-yellow-500">Rating: {review.rating} / 5</p>
            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
