import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

import UsersTable from "../components/users/UsersTable";
import CreateUserModal from "../components/users/usermodals/CreateUserModal";
import CreateRoleModal from "../components/users/usermodals/CreateRoleModal";
import UsersTab from "../components/users/UsersTab";
import RoleTable from "../components/users/RoleTable";

export default function UsersRole() {
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
          <CreateRoleModal
            modalOpen={openRoleModal}
            setModalOpen={setOpenRoleModal}
          />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-lg">Users & Roles Management</div>
              <div>
                <div className="flex">
                  <div>
                    <label
                      onClick={() => setOpenRoleModal("modal-open")}
                      //htmlFor="my-modal-3"
                      className="border border-[#2F93F6] px-4 text-[#2F93F6] rounded-lg py-4"
                    >
                      Create Role
                    </label>
                  </div>
                  <div className="pl-2">
                    <label
                      onClick={() => setModalOpen("modal-open")}
                      //htmlFor="my-modal-3"
                      className="bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer"
                    >
                      Create User
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <UsersTab active={active} setActiveTab={setActiveTab} />
            </div>

            {active == 0 && (
              <div>
                <UsersTable />
              </div>
            )}
            {active == 1 && (
              <div>
                <RoleTable />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
