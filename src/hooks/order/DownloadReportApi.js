import axios from "axios";
import { BASE_URL } from "../../utils/ApiConfig";

const downloadReport = async (startDate, endDate) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found. Redirecting to login.");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${BASE_URL}/api/v1/order/get-report-order?start_date=${startDate}&end_date=${endDate}`,
      {
        headers,
        responseType: 'blob',  // Mengatur tipe respons sebagai blob
      }
    );

    // Mendapatkan nama file dari header respons
    const contentDispositionHeader = response.headers['content-disposition'];
    const fileNameMatch = contentDispositionHeader && contentDispositionHeader.match(/filename="(.+)"/);
    const fileName = fileNameMatch ? fileNameMatch[1] : `Laporan_Penjualan_${startDate}.xlsx`;

    // Membuat objek Blob dari respons
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Membuat tautan untuk file Blob
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName;

    // Simulasikan klik pada tautan untuk memulai proses download
    downloadLink.click();

    // Hapus elemen anchor setelah proses download selesai
    window.URL.revokeObjectURL(downloadLink.href);
  } catch (error) {
    console.error("Error downloading report:", error.message);
    // Handle error (tampilkan pesan kesalahan, dll.)
  }
};

export default downloadReport;
