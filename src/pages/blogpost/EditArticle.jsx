import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import useEditBlogPost from "../../hooks/article/EditBlogPost";
import LoadingModal from "../../components/modals/Loading";
import { useParams, useNavigate } from "react-router-dom";

const EditBlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    formData,
    loading: formLoading,
    handleChange,
    handleFileChange,
    editBlogPost,
    success,
  } = useEditBlogPost(id);

  const handleEditBlogPost = async () => {
    await editBlogPost();
  };

  useEffect(() => {
    // No need to fetch data here, as it's handled within the useEditBlogPost hook
  }, []); // Dependency array left empty to ensure it runs only once

  useEffect(() => {
    if (success) {
      navigate("/blog-posts");
    }
  }, [success, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Edit Blog Post
          </h1>

          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-bold text-gray-600"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                placeholder="Enter blog post title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-sm font-bold text-gray-600"
              >
                Photo
              </label>
              <input
                type="file"
                name="photo"
                id="photo"
                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                onChange={(e) => handleFileChange("photo", e.target.files[0])}
              />
            </div>

            <div className="mb-4 col-span-2">
              <label
                htmlFor="content"
                className="block text-sm font-bold text-gray-600"
              >
                Content
              </label>
              <textarea
                name="content"
                id="content"
                rows="6"
                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                placeholder="Enter blog post content"
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
              ></textarea>
            </div>

            <button
              className="px-4 py-2 mt-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              onClick={handleEditBlogPost}
              disabled={formLoading}
            >
              {formLoading ? "Updating..." : "Update Blog Post"}
            </button>
          </div>

          {formLoading && <LoadingModal />}
        </div>
      </div>
    </div>
  );
};

export default EditBlogPostPage;
