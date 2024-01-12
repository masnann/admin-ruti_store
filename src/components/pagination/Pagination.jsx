import React from "react";

export function Pagination() {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    className: `px-4 py-2 rounded focus:outline-none ${
      active === index
        ? "bg-gray-500 text-white"
        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
    }`,
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  return (
    <div className="flex justify-end mt-4">
      <div className="flex items-center gap-2">
        <button
          className={`px-4 py-2 rounded focus:outline-none ${
            active === 1
              ? "bg-gray-300 text-gray-700"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
          onClick={prev}
          disabled={active === 1}
        >
          Previous
        </button>
        <button {...getItemProps(1)}>1</button>
        <button {...getItemProps(2)}>2</button>
        <button {...getItemProps(3)}>3</button>
        <button {...getItemProps(4)}>4</button>
        <button {...getItemProps(5)}>5</button>
        <button
          className={`px-4 py-2 rounded focus:outline-none ${
            active === 5
              ? "bg-gray-300 text-gray-700"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
          onClick={next}
          disabled={active === 5}
        >
          Next
        </button>
      </div>
    </div>
  );
}
