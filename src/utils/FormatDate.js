const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
    hour12: true,
  };

  const formattedDate = new Date(dateString).toLocaleDateString(
    "id-ID",
    options
  );
  return formattedDate;
};

export { formatDate };
