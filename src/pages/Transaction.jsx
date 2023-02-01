import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

import UsersTable from "../components/users/UsersTable";
import CreateUserModal from "../components/users/usermodals/CreateUserModal";
import CreateRoleModal from "../components/users/usermodals/CreateRoleModal";
import UsersTab from "../components/users/UsersTab";
import RoleTable from "../components/users/RoleTable";
import StockTable from "../components/driver/DriverTable";
import StoreModal from "../components/driver/modal/StockModal";
import TransactionTable from "../components/transaction/TransactionTable";
import axios from "axios";

export default function Transaction() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState();
  const [openRoleModal, setOpenRoleModal] = useState();
  const [active, setActiveTab] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [chooseData, setChooseData] = useState(5);
  const [pageNumber, setpageNumber] = useState(1);
  const [loading, setLoading] = useState();
  const getTransactionData = () => {
    const token = localStorage.getItem("logisticsAdminToken");
    setLoading("loading");
    var config = {
      method: "get",
      url: ` ${process.env.REACT_APP_API}/v1/list-transactions?page=${pageNumber}&limit=${chooseData}`,
      headers: { Authorization: `Bearer ${token}` },
    };

    axios(config)
      .then(function (response) {
        setTransactionData(response.data?.data);
        console.log(response.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getTransactionData();
  }, [pageNumber, chooseData]);
  const nextPage = () => {
    setpageNumber(pageNumber + 1);
  };
  const prevPage = () => {
    if (pageNumber > 1) {
      setpageNumber(pageNumber - 1);
    }
  };
  console.log(transactionData, "STATE");
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <StoreModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-lg">Transaction</div>
            </div>

            <div>
              <TransactionTable
                nextPage={nextPage}
                prevPage={prevPage}
                chooseData={chooseData}
                setChooseData={setChooseData}
                transactionData={transactionData}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
