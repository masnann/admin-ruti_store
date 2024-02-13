import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import getProductDetails from "../../hooks/product/GetDetailsProductApi";
import Loading from "../../components/modals/Loading";
import Sidebar from "../../components/sidebar/Sidebar";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductDetails(id);
        console.log("Product Details Response:", response);

        if (response) {
          setProductDetail(response);
          setActive(response.photos[0]?.url || "");
        } else {
          console.error("Error fetching product details:", response);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetail) {
      setActive(productDetail.photos[0].url);
    }
  }, [productDetail]);

  const filledStars = Array.from({
    length: Math.floor(productDetail?.rating || 0),
  }).map((_, index) => (
    <StarIcon key={index} className="w-5 h-5 text-yellow-500" />
  ));

  const emptyStars = Array.from({
    length: 5 - Math.floor(productDetail?.rating || 0),
  }).map((_, index) => (
    <StarIcon key={index} className="w-5 h-5 text-gray-300" />
  ));

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Detail Produk
          </h1>
          {loading ? (
            <Loading />
          ) : productDetail ? (
            <div className="bg-white p-8 rounded-md shadow-md">
              <div className="flex flex-col md:flex-row">
                <div className="mb-4 md:mr-4 md:w-full lg:w-1/2">
                  <img
                    className="w-full h-64 md:h-auto rounded-lg object-cover object-center mb-4"
                    src={active}
                    alt=""
                  />
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    {productDetail.photos.map((photo, index) => (
                      <div key={index}>
                        <img
                          onClick={() => setActive(photo.url)}
                          src={photo.url}
                          className={`h-16 w-16 md:h-24 md:w-24 max-w-full cursor-pointer rounded-lg object-cover object-center ${
                            active === photo.url
                              ? "border-4 border-blue-500"
                              : ""
                          }`}
                          alt={`gallery-image-${index}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <h2 className="text-xl md:text-3xl font-semibold mb-2 md:mb-0">
                      {productDetail.name}
                    </h2>
                    <p className="mb-2 md:mb-0 text-red-500 font-semibold">
                      Rp. {productDetail.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row mb-2">
                    <div className="flex items-center mb-2 md:mb-0">
                      <div className="flex">
                        {filledStars}
                        {emptyStars}
                      </div>
                      <p className="ml-2 text-sm md:ml-4">
                        {productDetail.rating}
                      </p>
                    </div>
                    <p className="text-sm md:ml-4 text-orange-500">
                      Diskon: Rp.{productDetail.discount}
                    </p>
                  </div>
                  <p className="text-gray-700 mb-4 text-sm">
                    {productDetail.description}
                  </p>
                  <p className="text-gray-700 mb-4 text-sm">
                    Stok: {productDetail.stock}
                  </p>
                  <div className="flex items-center">
                    <p className="text-gray-700 mb-4 text-sm mr-2">Ukuran: {productDetail.size}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-700 mb-4 text-sm mr-2">Warna: {productDetail.color}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 mb-2 text-sm font-semibold">
                      Kategori:
                    </p>
                    {productDetail.categories &&
                    productDetail.categories.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {productDetail.categories.map((category) => (
                          <span key={category.id}>{category.name}</span>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm">Tidak ada kategori</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Error fetching product details</p>
          )}

          {/* Edit Product Button outside the product details container */}
          <div className="mt-4 flex justify-end">
            <Link to={`/edit-product/${id}`}>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                Ubah Produk
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
