import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';

const OrderPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800">
            Selamat Datang di Halaman Pesanan!
          </h1>
          <p className="text-gray-600">
            Ini adalah halaman yang dirancang khusus untuk menampilkan informasi dan fungsi terkait pengguna.
            Nikmati pengalaman pengguna yang menyenangkan!
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderPage