import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Sidebar from "../../components/sidebar/Sidebar";
import { Pagination } from "../../components/pagination/Pagination";
import useUserData from "../../hooks/user/GetAll";
import { formatDate } from "../../utils/FormatDate";
import useDeleteUser from "../../hooks/user/DeleteUserApi";

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const { deleteUser, resetDeleteState } = useDeleteUser();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { userData, loading, error, totalPages } = useUserData(
    currentPage,
    itemsPerPage,
    token
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4 text-indigo-800 border-b-2 border-indigo-500 pb-2">
            Users
          </h1>

          {/* Display User Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 mt-8">
              <thead>
                <tr>
                
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Email
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Nama</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Nomor Telepon
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Jenis Kelamin
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Dibuat Pada
                  </th>
                  <th className="border p-3 bg-gray-300 text-gray-700">Peran</th>
                  <th className="border p-3 bg-gray-300 text-gray-700">
                    Foto Profil
                  </th>
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
                  userData.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                     
                      <td className="border p-3">{user.email}</td>
                      <td className="border p-3">{user.name}</td>
                      <td className="border p-3">{user.phone}</td>
                      <td className="border p-3">{user.gender}</td>
                      <td className="border p-3">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="border p-3 text-center">{user.role}</td>
                      <td className="border p-3 text-center">
                        {user.photo_profile ? (
                          <div className="flex justify-center items-center">
                            <img
                              src={user.photo_profile}
                              alt={`Photo for ${user.photo_profile}`}
                              className="w-12 h-12 object-cover"
                            />
                          </div>
                        ) : (
                          <p className="text-gray-800">
                            Tidak ada foto tersedia
                          </p>
                        )}
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

export default UserPage;
