// src/pages/blogpost/ArticleDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import LoadingModal from '../../components/modals/Loading';
import useArticleDetails from '../../hooks/article/DetailBlogpost';

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articleDetails, loading, error } = useArticleDetails(id);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (error) {
      // Jika terjadi kesalahan saat mengambil detail artikel, arahkan kembali ke halaman blogpost
      navigate('/blog-posts');
    }
  }, [error, navigate]);

  if (loading) {
    // Tampilkan modal loading selama data dimuat
    return <LoadingModal />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Article Details
          </h1>

          <div className="bg-white p-6 rounded-md shadow-md">
            {articleDetails ? (
              <>
                <h2 className="text-4xl font-bold mb-4 text-gray-800">{articleDetails.title}</h2>
                {articleDetails.photo && (
                  <img
                    src={articleDetails.photo}
                    alt={`Photo for ${articleDetails.title}`}
                    className="mb-4 w-full h-64 object-cover rounded-md"
                  />
                )}
                <p className="text-gray-700 mb-4">{articleDetails.content}</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-700">Author: {articleDetails.author}</p>
                  <p className="text-gray-700">
                    Date Created: {new Date(articleDetails.created_at).toLocaleString()}
                  </p>
                </div>
                {/* Tambahkan informasi lainnya yang ingin ditampilkan */}
              </>
            ) : (
              <p className="text-gray-700">Article not found.</p>
            )}
          </div>

          {showModal && <LoadingModal />}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
