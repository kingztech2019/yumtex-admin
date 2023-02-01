import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

import DriverTable from "../components/driver/DriverTable";
import StoreModal from "../components/driver/modal/StockModal";
import axios from "axios";

export default function Drivers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <StoreModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-lg">Drivers</div>
            </div>

            <div>
              <DriverTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
