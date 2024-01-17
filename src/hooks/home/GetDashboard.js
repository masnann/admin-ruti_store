import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/ApiConfig";

const useDashboardData = (token) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = `${BASE_URL}/api/v1/home/dashboard/`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        //console.log("Dashboard data:", data); // Log the data
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error); // Log the error
        setError("An error occurred while fetching the dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }

  }, [token]);

  return { dashboardData, loading, error };
};

export default useDashboardData;
