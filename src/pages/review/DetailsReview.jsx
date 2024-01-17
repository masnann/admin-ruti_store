import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";
import { Pagination } from "../../components/pagination/Pagination";
import useProductReviews from "../../hooks/review/GetProductReviews";
import LoadingModal from '../../components/modals/Loading';

const ProductReviewsPage = () => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingModal, setLoadingModal] = useState(false);

    const { reviews, loading, error, totalPages } = useProductReviews(id, currentPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Function to show/hide the loading modal
    const toggleLoadingModal = () => {
        setLoadingModal(!loadingModal);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                <div className="container mx-auto mt-8">
                    <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
                        Product Reviews
                    </h1>

                    {/* Display Product Reviews */}
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    {review.user.photo_profile ? (
                                        <img
                                            src={review.user.photo_profile}
                                            alt={`${review.user.name}'s profile`}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300"></div>
                                    )}
                                </div>
                                <span className="font-semibold text-lg ml-4">{review.user.name}</span>
                                <div className="flex text-yellow-500 mt-1 ml-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            size={18}
                                            color={review.rating >= star ? "#FFD700" : "#C0C0C0"}
                                        />
                                    ))}
                                </div>
                            </div>
                            {review.photos.length > 0 && (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {review.photos.map((photo) => (
                                        <div key={photo.id}>
                                            <img
                                                className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                                                src={photo.url}
                                                alt={`review-photo-${photo.id}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center mt-4">
                                <span className="text-gray-600">{review.description}</span>
                            </div>
                        </div>
                    ))}

                    {/* Display Pagination */}
                    <div className="mt-8">
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onChangePage={handlePageChange}
                        />
                    </div>
                </div>
            </div>

            {/* Loading Modal */}
            {loading && <LoadingModal />}
        </div>
    );
};

export default ProductReviewsPage;
