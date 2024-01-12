import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Pagination } from '../../components/pagination/Pagination';
import usePaymentData from '../../hooks/payment/Payment';

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8; // Adjust the number of items per page as needed

  // Using the custom hook to fetch payment data
  const { paymentData, loading, error } = usePaymentData(currentPage, itemsPerPage);

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = paymentData.slice(startIndex, endIndex);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Payment Page
          </h1>

          {/* Display Payment Table */}
          <table className="min-w-full bg-white border border-gray-300 mt-8">
            <thead>
              <tr>
                <th className="border p-3">ID</th>
                <th className="border p-3">Customer</th>
                <th className="border p-3">Amount</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-red-500">
                    Error: {error}
                  </td>
                </tr>
              ) : (
                currentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-100">
                    <td className="border p-3">{payment.id_order}</td>
                    <td className="border p-3">{payment.name}</td>
                    <td className="border p-3">{payment.total_amount_paid}</td>
                    <td className="border p-3">{new Date(payment.date).toLocaleString()}</td>
                    <td className="border p-3">{payment.payment_status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Display Pagination */}
          <div className="mt-8">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
