import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getOrderDetails from "../../hooks/order/GetDetailsOrderApi";
import Loading from "../../components/modals/Loading";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [orderDetailsId, setOrderDetailsId] = useState(null);
  const [productId, setProductId] = useState(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getOrderDetails(id);
        setOrderDetails(response.data);
        setLoading(false);

        if (response.data) {
          setOrderDetailsId(response.data.id);
          setProductId(response.data.order_details[0].product.id);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching order details: {error.message}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="container mx-auto p-4 mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
          Detail Pesanan
        </h1>
        <div className="bg-white p-8 rounded-md shadow-md mb-4">
          {orderDetail && (
            <>
              <div className="flex justify-between">
                <div className="mb-4 font-semibold text-blue-500">
                  <p>Nomor Pesanan: {orderDetail.id_order}</p>
                </div>
                <p className="font-semibold mb-2 text-red-600 flex justify-end">
                  Status Pesanan: {orderDetail.order_status}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row mb-4">
                <div className="lg:w-3/4 mb-4 lg:mb-0">
                  <div className="mb-4 font-semibold text-lg">
                    Detail Produk
                  </div>
                  {orderDetail.order_details.map((orderDetailItem) => (
                    <div
                      key={orderDetailItem.id}
                      className="flex flex-col md:flex-row mt-4 items-center border-b border-gray-300 pb-4 mr-4"
                    >
                      <div className="w-full md:w-40 md:h-40 mb-4 md:mb-0">
                        <img
                          src={orderDetailItem.product.product_photos[0].url}
                          alt={orderDetailItem.product.name}
                          className="w-full h-full object-cover max-w-full max-h-full rounded-md shadow-md"
                        />
                      </div>
                      <div className="w-3/4 md:ml-4">
                        <p className="font-semibold text-xl">
                          {orderDetailItem.product.name}
                        </p>
                        <p>Ukuran: {orderDetailItem.size}</p>
                        <p>Warna: {orderDetailItem.color}</p>
                        <p>Jumlah: {orderDetailItem.quantity}</p>
                        <p>Total Harga: Rp. {orderDetailItem.total_price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:w-1/4">
                  <div className="bg-white p-4 rounded-md shadow-md mb-4">
                    <div className="mb-4 font-semibold text-lg">
                      Alamat Pengiriman
                    </div>
                    <p className="mb-2">
                      <span className="font-semibold">Nama:</span>{" "}
                      {orderDetail.address.accepted_name}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Telepon:</span>{" "}
                      {orderDetail.address.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Alamat:</span>{" "}
                      {`${orderDetail.address.address}, ${orderDetail.address.city_name}, ${orderDetail.address.province_name}`}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-md">
                    <div className="mb-4 font-semibold text-lg">
                      Informasi Pembeli
                    </div>
                    <div className="flex items-center mb-2">
                      <img
                        src={orderDetail.user.photo_profile}
                        alt={orderDetail.user.name}
                        className="w-16 h-16 object-cover rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold">{orderDetail.user.name}</p>
                        <p>{orderDetail.user.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
