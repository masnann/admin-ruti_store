// src/pages/AddProductPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import useCategoryData from "../../hooks/category/GetAll";
import useProductForm from "../../hooks/product/AddProduct";

const AddProductPage = () => {
  const navigate = useNavigate();
  const {
    formData,
    loading: formLoading,
    error: formError,
    success,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  } = useProductForm();

  const {
    categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useCategoryData();

  useEffect(() => {
    if (categoryData.length > 0 && formData.category_id.length === 0) {
      handleChange("category_id", [categoryData[0].id]);
    }
  }, [categoryData, formData, handleChange]);

  const handleAddProduct = async () => {
    await handleSubmit();
    if (success) {
      navigate("/products");
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

          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-md">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-600"
              >
                Nama
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                placeholder="Masukkan nama produk"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
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
                value={formData.price}
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
                value={formData.stock}
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
                value={formData.discount}
                onChange={(e) => handleChange("discount", e.target.value)}
              />
            </div>

            {/* <div className="mb-4">
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
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
              />
            </div> */}

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Kategori
              </label>
              {categoryLoading ? (
                <p>Loading categories...</p>
              ) : categoryError ? (
                <p>Error loading categories: {categoryError}</p>
              ) : (
                <select
                  id="category"
                  name="category"
                  value={formData.category_id}
                  onChange={(e) =>
                    handleCategoryChange(parseInt(e.target.value))
                  }
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Pilih Kategori</option>
                  {categoryData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="photos"
                className="block text-sm font-bold text-gray-600"
              >
                Foto
              </label>
              <input
                type="file"
                name="photos"
                id="photos"
                className="mt-1 p-2 w-full border rounded-md bg-gray-100"
                placeholder="Upload foto produk"
                onChange={(e) => handleChange("photos", e.target.files)}
                multiple
              />
            </div>

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
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              ></textarea>
            </div>
          </div>

          <button
            className="px-4 py-2 mt-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            onClick={handleAddProduct}
            disabled={formLoading}
          >
            {formLoading ? "Menyimpan..." : "Simpan Produk"}
          </button>

          {formError && <p className="text-red-500 mt-2">{formError}</p>}
          {success && (
            <p className="text-green-500 mt-2">Produk berhasil ditambahkan!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
