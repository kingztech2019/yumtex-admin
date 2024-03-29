import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

import UsersTable from "../components/users/UsersTable";
import CreateUserModal from "../components/users/usermodals/CreateUserModal";
import CreateRoleModal from "../components/users/usermodals/CreateRoleModal";
import UsersTab from "../components/users/UsersTab";
import RoleTable from "../components/users/RoleTable";
import DeliveriesTab from "../components/deliveries/DeliveriesTab";
import PendingTable from "../components/deliveries/Pending";
import ConfirmedTable from "../components/deliveries/Confirmed";
import CompletedTable from "../components/deliveries/Completed";
import axios from "axios";

export default function Deliveries() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState();
  const [openRoleModal, setOpenRoleModal] = useState();
  const [active, setActiveTab] = useState(0);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <CreateUserModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-lg">Deliveries</div>
            </div>
            <div>
              <DeliveriesTab active={active} setActiveTab={setActiveTab} />
            </div>

            {active == 0 && (
              <div>
                <PendingTable />
              </div>
            )}
            {active == 1 && (
              <div>
                <ConfirmedTable />
              </div>
            )}
            {active == 2 && (
              <div>
                <CompletedTable />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
