import React from "react";

const DeliveriesTab = (props) => {
  const items = [
    "Pending Deliveries",
    "Confirmed Deliveries",
    "Completed Deliveries",
  ];

  return (
    <nav className="h-full flex lg:inline-flex justify-center items-center lg:items-end rounded-md  overflow-hidden">
      {items.map((item, i) => (
        <button
          className={`${
            i == props.active
              ? "border-b-2 border-[#DC5921] font-bold text-[#DC5921] bg-white "
              : "text-dark-light hover:bg-primary-lightest hover:text-primary"
          } block whitespace-nowrap px-4   lg:px-8 py-3`}
          onClick={() => props.setActiveTab(i)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
};

export default DeliveriesTab;
