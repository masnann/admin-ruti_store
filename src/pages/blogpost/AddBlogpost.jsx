import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import useCreateBlogPost from "../../hooks/article/AddBlogpost";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../components/modals/Loading";

const AddBlogPostPage = () => {
  const navigate = useNavigate();
  const {
    formData,
    loading: formLoading,
    error: formError,
    success,
    handleChange,
    handleFileChange,
    createBlogPost,
  } = useCreateBlogPost();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (success) {
      navigate("/blog-posts");
    }
  }, [success, navigate]);

  const handleAddBlogPost = async () => {
    setShowModal(true);
    await createBlogPost();
    setShowModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Tambah Artikel
          </h1>

          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-bold text-gray-600"
              >
                Judul
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                placeholder="Masukan judul artikel"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-sm font-bold text-gray-600"
              >
                Foto
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
                Konten
              </label>
              <textarea
                name="content"
                id="content"
                rows="6"
                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                placeholder="Masukan konten artikel"
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
              ></textarea>
            </div>
            
        </div>
        <button
              className="px-4 py-2 mt-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              onClick={handleAddBlogPost}
              disabled={formLoading}
            >
              {formLoading ? "Menyimoan..." : "Simpan"}
            </button>

            {formError && <p className="text-red-500 mt-2">{formError}</p>}
            {success && (
              <p className="text-green-500 mt-2">Artikel berhasil ditambahkan</p>
            )}
          </div>

          {showModal && <LoadingModal />}
      </div>
    </div>
  );
};

export default AddBlogPostPage;
