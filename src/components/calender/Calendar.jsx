import React, { useState } from "react";
import { HiX, HiDownload } from "react-icons/hi";
import downloadReport from "../../hooks/order/DownloadReportApi";

const Calendar = ({ onClose }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startOfMonth = () => {
    return new Date(selectedYear, selectedMonth, 1);
  };

  const formatSelectedDate = (date) => {
    if (!date) return null;
    const year = selectedYear;
    const month = `${selectedMonth + 1}`.padStart(2, "0");
    const day = `${date}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateCalendar = () => {
    const calendar = [];
    const currentDate = startOfMonth();
    const daysInCurrentMonth = daysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );

    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        const currentDay = dayCounter <= daysInCurrentMonth ? dayCounter : null;

        if ((i === 0 && j < currentDate.getDay()) || currentDay === null) {
          week.push(null);
        } else {
          week.push(currentDay);
          dayCounter++;
        }
      }
      calendar.push(week);
    }

    return calendar;
  };

  const handleDateClick = (day) => {
    if (!selectedStartDate) {
      // Set the selected start date
      setSelectedStartDate(day);
      setSelectedEndDate(null); // Reset end date if already selected
    } else if (day >= selectedStartDate) {
      // Set the selected end date only if it's equal to or after the start date
      setSelectedEndDate(day);
    } else {
      // Swap the dates if the selected end date is before the start date
      setSelectedStartDate(day);
      setSelectedEndDate(selectedStartDate);
    }
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const handleDownload = async () => {
    try {
      const formattedStartDate = formatSelectedDate(selectedStartDate);
      const formattedEndDate = formatSelectedDate(selectedEndDate);

      // Panggil fungsi downloadReport
      const reportData = await downloadReport(
        formattedStartDate,
        formattedEndDate
      );

      console.log("Downloaded report data:", reportData);
    } catch (error) {
      console.error("Error downloading report:", error.message);
    }
  };

  const calendar = generateCalendar();

  return (
    <div className="fixed top-20 letf-8 bg-white shadow-md p-4 rounded-t-lg md:w-2/3 lg:w-1/2 xl:w-1/3">
      <div className="mb-4">
        <p className="font-semibold mb-2">Pilih Rentang Tanggal :</p>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label className="mr-2">Bulan:</label>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="border px-2 py-1 rounded-md text-sm mb-2 md:mb-0"
            >
              {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                <option key={month} value={month}>
                  {new Date(0, month).toLocaleString("id", { month: "long" })}
                </option>
              ))}
            </select>
            <label className="mx-2">Tahun:</label>
            <input
              type="number"
              value={selectedYear}
              onChange={handleYearChange}
              className="border px-2 py-1 rounded-md text-sm"
            />
          </div>
          <div className="flex">
            <HiDownload
              className="cursor-pointer text-blue-500 text-xl mr-4"
              onClick={handleDownload}
            />
            <HiX
              className="cursor-pointer text-gray-500 text-xl"
              onClick={onClose}
            />
          </div>
        </div>
        <table className="table-auto w-full text-xs">
          <thead>
            <tr>
              <th className="px-1 py-1 text-gray-600">Minggu</th>
              <th className="px-1 py-1 text-gray-600">Senin</th>
              <th className="px-1 py-1 text-gray-600">Selasa</th>
              <th className="px-1 py-1 text-gray-600">Rabu</th>
              <th className="px-1 py-1 text-gray-600">Kamis</th>
              <th className="px-1 py-1 text-gray-600">Jumat</th>
              <th className="px-1 py-1 text-gray-600">Sabtu</th>
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <td
                    key={dayIndex}
                    className={`px-1 py-1 cursor-pointer text-center ${
                      day === selectedStartDate || day === selectedEndDate
                        ? "bg-blue-500 text-white font-semibold"
                        : day >= selectedStartDate && day <= selectedEndDate
                        ? "bg-blue-200"
                        : ""
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
