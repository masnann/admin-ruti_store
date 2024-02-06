import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getOrderDetails from "../../hooks/order/GetDetailsOrderApi";
import updateOrderStatus from "../../hooks/order/EditOrderApi";
import Loading from "../../components/modals/Loading";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import CustomAlert from "../../components/modals/Alert";

const EditOrder = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [orderDetailsId, setOrderDetailsId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [alerts, setAlerts] = useState([]);

  const token = sessionStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getOrderDetails(id);
      setOrderDetails(response.data);
      setLoading(false);

      if (response.data) {
        setOrderDetailsId(response.data.id_order);
        setProductId(response.data.order_details[0].product.id);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleStatusChange = async () => {
    try {
      if (!selectedStatus) {
        return;
      }
      setLoading(true);
      await updateOrderStatus(id, selectedStatus);
     
      setAlerts((prevAlerts) => [
        ...prevAlerts,
        { message: "Status pesanan berhasil diperbarui", type: "success" },
      ]);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setAlerts((prevAlerts) => [
        ...prevAlerts,
        { message: `Status pesanan gagal diperbarui: ${error.message}`, type: "error" },
      ]);
      console.error("Error updating order status:", error.message);
    }
  };
  
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
        {/* Render CustomAlert component */}
        <CustomAlert alerts={alerts} setAlerts={setAlerts} />

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
              <div className="flex justify-between mt-4 border-t border-gray-300 pt-4">
                <div className="font-semibold text-lg ">
                  Rubah Status Pesanan
                </div>
                <div className="flex items-center">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 bg-white border rounded-md mr-2"
                  >
                    <option value="">Pilih Status Baru</option>
                    <option value="Menunggu Konfirmasi">
                      Menunggu Konfirmasi
                    </option>
                    <option value="Proses">Proses</option>
                    <option value="Pengiriman">Pengiriman</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Gagal">Gagal</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={handleStatusChange}
            disabled={!selectedStatus}
          >
            Perbarui Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
