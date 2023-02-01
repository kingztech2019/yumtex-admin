import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import TableHeaders from "../utils/TableHeaders";
import AssignRole from "./usermodals/AssignRole";
import DisableNotify from "./usermodals/DisableNotify";
import UsersTab from "./UsersTab";
import axios from "axios";
import Pagination from "../utils/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UsersTable() {
  const [modalOpen, setModalOpen] = useState();
  const [disableOpen, setDisableOpen] = useState();
  const [userData, setUserData] = useState();
  const [chooseData, setChooseData] = useState(5);
  const [pageNumber, setpageNumber] = useState(1);
  const [loading, setLoading] = useState();
  const getUserData = () => {
    const token = localStorage.getItem("logisticsAdminToken");

    var config = {
      method: "get",
      url: ` ${process.env.REACT_APP_API}/v1/list-members?page=${pageNumber}`,
      headers: { Authorization: `Bearer ${token}` },
    };

    axios(config)
      .then(function (response) {
        setUserData(response.data?.data);
        console.log(response.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const nextPage = () => {
    if (userData?.links[2]["active"] == true) {
      setpageNumber(pageNumber + 1);
    }
  };
  const prevPage = () => {
    if (pageNumber > 1) {
      setpageNumber(pageNumber - 1);
    }
  };
  useEffect(() => {
    getUserData();
  }, [pageNumber]);

  const Disabled = (users, status) => {
    const token = localStorage.getItem("logisticsAdminToken");
    const data = {
      customer: users?.id,
      status: status,
    };
    setLoading("loading");
    var config = {
      method: "patch",
      url: ` ${process.env.REACT_APP_API}/v1/edit-member`,
      headers: { Authorization: `Bearer ${token}` },
      data: { ...data },
    };

    axios(config)
      .then(function (response) {
        setLoading();
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        console.log(response?.data);
      })
      .catch(function (error) {
        if (error?.response?.data?.error) {
          setLoading();
          toast.error(error?.response?.data?.error[0], {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        } else {
          setLoading();
          toast.error(error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.log(error);
      });
  };
  return (
    <div className="pt-7">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AssignRole modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <DisableNotify modalOpen={disableOpen} setModalOpen={setDisableOpen} />
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              <div className="py-3 px-4">
                <TableHeaders showFilter={true} />
              </div>

              <table class="min-w-full">
                <thead class="bg-white border-b   border-gray-300">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    ></th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Account Balance
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Roles
                    </th>

                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    ></th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.data?.map((data, i) => (
                    <tr
                      //onClick={() => navigate("/userdetails")}
                      class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <img src="/boy.svg" />
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.firstname} {data?.lastname}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.email}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.phone_no}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.current_balance}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div
                          className={`${
                            data?.status == "disabled"
                              ? "bg-[#FFDFE5] font-bold  text-[#F9395B]"
                              : "bg-[#EBFFF3] text-[#61BB84]"
                          }  text-center py-2 px-1 rounded-lg`}
                        >
                          {data?.status}
                        </div>
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Super Admin{" "}
                        <span className="btn btn-sm text-[10px]">Change</span>
                      </td>

                      <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                        <div className="bg-[#EBFFF3] text-[#61BB84] text-center py-2 px-1 rounded-lg">
                          Edit
                        </div>
                      </td>
                      <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                        {data?.status == "enabled" ? (
                          <div
                            onClick={() => Disabled(data, "disabled")}
                            className="bg-[#FFEFDF] font-bold  text-[#E4750D] text-center py-2 px-1 rounded-lg"
                          >
                            Disable
                          </div>
                        ) : (
                          <div
                            onClick={() => Disabled(data, "enabled")}
                            className="bg-[#FFEFDF] font-bold  text-[#E4750D] text-center py-2 px-1 rounded-lg"
                          >
                            Enable
                          </div>
                        )}
                      </td>
                      {/* <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                        <div className="bg-[#FFDFE5] font-bold  text-[#F9395B] text-center py-2 px-1 rounded-lg">
                          Block
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end pt-2 pb-24 px-7">
                <div>
                  <Pagination
                    chooseData={chooseData}
                    setChooseData={setChooseData}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    totalPage={userData?.total}
                    show={false}
                    data={userData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
