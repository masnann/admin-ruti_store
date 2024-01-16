// PaymentPage.jsx
import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import Sidebar from '../../components/sidebar/Sidebar';
import { Pagination } from '../../components/pagination/Pagination';
import usePaymentData from '../../hooks/payment/Payment';

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();  

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const { paymentData, loading, error, totalPages } = usePaymentData(
    currentPage,
    itemsPerPage,
    token
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    // Logika untuk meng-handle edit
    console.log(`Edit button clicked for ID ${id}`);
  };

  const handleDelete = (id) => {
    // Logika untuk meng-handle delete
    console.log(`Delete button clicked for ID ${id}`);
  };

  const handleDetails = (id) => {
    // Logika untuk meng-handle details
    console.log(`Details button clicked for ID ${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Payment
          </h1>

          {/* Display Payment Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 mt-8">
              <thead>
                <tr>
                  <th className="border p-3 bg-gray-300 text-gray-700">ID</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Customer</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Amount</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Date</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Payment Status</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : (
                  paymentData.map((payment) => (
                    <tr key={payment.id_order} className="hover:bg-gray-100">
                      <td className="border p-3">{payment.id_order}</td>
                      <td className="border p-3">{payment.name}</td>
                      <td className="border p-3">Rp. {payment.total_amount_paid}</td>
                      <td className="border p-3">
                        {new Date(payment.date).toLocaleString()}
                      </td>
                      <td className="border p-3">{payment.payment_status}</td>
                      <td className="border p-3">
                        <button
                          className="mr-2 text-purple-600 hover:text-purple-900"
                          onClick={() => handleEdit(payment.id_order)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="mr-2 text-blue-600 hover:text-blue-900"
                          onClick={() => handleDetails(payment.id_order)}
                        >
                          <FaInfoCircle />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(payment.id_order)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

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
    </div>
  );
};

export default PaymentPage;
