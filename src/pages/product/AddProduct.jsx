import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import createProduct from "../../hooks/product/CreateProductApi";
import createProductPhoto from "../../hooks/product/CreateProductPhotoApi";
import getAllCategories from "../../hooks/category/GetAllCategoryApi";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        const categoriesData =
          response.data && Array.isArray(response.data) ? response.data : [];
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    const photosArray = Array.from(files);
    setUploadedPhotos([...uploadedPhotos, ...photosArray]);
  };

  const handlePreviewClick = (index) => {
    setCurrentPhotoIndex(index);
  };

  const handleDeletePreview = (index) => {
    const newPhotos = [...uploadedPhotos];
    newPhotos.splice(index, 1);
    setUploadedPhotos(newPhotos);
    setCurrentPhotoIndex(0);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const productData = {
        name: formData.name,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        discount: parseInt(formData.discount),
        weight: parseInt(formData.weight),
        size: formData.size,
        color: formData.color,
        description: formData.description,
        category_id: formData.category_id,
      };

      console.log("Data yang dikirim ke API:", productData);

      // Panggil API untuk membuat produk
      const createdProduct = await createProduct(productData);

      console.log("Product yang dibuat:", createdProduct);

      // Upload foto untuk produk yang baru saja dibuat
      const productId = createdProduct.data.id;

      for (let i = 0; i < uploadedPhotos.length; i++) {
        const photoFormData = new FormData();
        photoFormData.append("product_id", productId);
        photoFormData.append("photo", uploadedPhotos[i]);

        console.log(`Mengunggah foto ke-${i + 1}:`, uploadedPhotos[i]);

        await createProductPhoto(photoFormData);
      }

      console.log("Pengunggahan foto selesai.");

      setFormData({});
      setUploadedPhotos([]);
      setCurrentPhotoIndex(0);
      setLoading(false);

      navigate(`/products`);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Add Product
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-600 text-sm font-medium"
                >
                  Nama:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                  placeholder="Masukkan nama produk"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-bold text-gray-600"
                >
                  Harga
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                  placeholder="Masukkan harga produk"
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="stock"
                  className="block text-sm font-bold text-gray-600"
                >
                  Stok
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                  placeholder="Masukkan jumlah stok"
                  onChange={(e) => handleChange("stock", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="discount"
                  className="block text-sm font-bold text-gray-600"
                >
                  Diskon
                </label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                  placeholder="Masukkan diskon (persentase)"
                  onChange={(e) => handleChange("discount", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="weight"
                  className="block text-sm font-bold text-gray-600"
                >
                  Berat
                </label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                  placeholder="Masukkan berat produk"
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="size"
                  className="block text-sm font-bold text-gray-600"
                >
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                  placeholder="Masukkan ukuran produk"
                  onChange={(e) => handleChange("size", e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="color"
                  className="block text-sm font-bold text-gray-600"
                >
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  id="size"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                  placeholder="Masukkan warna produk"
                  onChange={(e) => handleChange("color", e.target.value)}
                />
              </div>
              <select
                id="categories"
                name="categories"
                className="block w-full p-2 border border-gray-300 rounded-md"
                multiple
                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions
                  ).map((option) => parseInt(option.value));
                  handleChange("category_id", selectedOptions);
                }}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <div className="mb-4 col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-bold text-gray-600"
                >
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                  placeholder="Masukkan deskripsi produk"
                  onChange={(e) => handleChange("description", e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4 col-span-2">
                <label className="text-sm font-medium">Unggah Foto:</label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  multiple
                  className="border rounded-md p-2 w-full mb-4"
                />
              </div>
              {uploadedPhotos.length > 0 && (
                <div className="flex flex-wrap space-x-4">
                  {uploadedPhotos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Ulasan Foto ${index + 1}`}
                        className={`w-24 h-24 object-cover rounded-md cursor-pointer ${
                          index === currentPhotoIndex
                            ? "border-2 border-blue-500"
                            : ""
                        }`}
                        onClick={() => handlePreviewClick(index)}
                      />
                      <button
                        onClick={() => handleDeletePreview(index)}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 mt-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Tambah
        </button>
      </div>
    </div>
  );
};
export default AddProductPage;
