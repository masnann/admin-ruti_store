import React, { useEffect, useRef } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "chart.js/auto";

const DashboardPage = () => {
  const totalIncome = 1500000;
  const totalProducts = 50;
  const totalOrders = 30;

  const recentTransactions = [
    { id: 1, date: "2024-01-10", customer: "John Doe", status: "Selesai" },
    { id: 2, date: "2024-01-09", customer: "Jane Doe", status: "Dalam Proses" },
  ];

  const ordersPerWeek = [
    { week: "Week 1", total: 25 },
    { week: "Week 2", total: 40 },
    { week: "Week 3", total: 35 },
    { week: "Week 4", total: 50 },
  ];

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = ordersPerWeek.map((week) => week.week);
    const data = ordersPerWeek.map((week) => week.total);

    // Hancurkan chart sebelum membuat yang baru
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Buat chart baru
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Pesanan per Minggu",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [ordersPerWeek]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Dashboard
          </h1>
          {/* Section 1: Total Pendapatan, Produk, Pesanan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card Total Pendapatan */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Total Pendapatan
              </h2>
              <p className="text-2xl text-indigo-800 font-bold">
                Rp {totalIncome.toLocaleString()}
              </p>
            </div>

            {/* Card Total Produk */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Total Produk
              </h2>
              <p className="text-2xl text-indigo-800 font-bold">
                {totalProducts}
              </p>
            </div>

            {/* Card Total Pesanan */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Total Pesanan
              </h2>
              <p className="text-2xl text-indigo-800 font-bold">
                {totalOrders}
              </p>
            </div>
          </div>

          {/* Section 2: Grafik Pesanan Per Minggu */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Pesanan Per Minggu
            </h2>
            <canvas ref={chartRef}></canvas>
          </div>

          {/* Section 3: Transaksi Terakhir */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Transaksi Terakhir
            </h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-indigo-200">
                <tr>
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Tanggal</th>
                  <th className="border p-3">Nama Pelanggan</th>
                  <th className="border p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-100">
                    <td className="border p-3">{transaction.id}</td>
                    <td className="border p-3">{transaction.date}</td>
                    <td className="border p-3">{transaction.customer}</td>
                    <td className="border p-3">{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
