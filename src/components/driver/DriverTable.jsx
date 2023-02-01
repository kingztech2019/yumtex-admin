import axios from "axios";
import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import TableHeaders from "../utils/TableHeaders";
import DriverModal from "./modal/DriverModal";
import Pagination from "../utils/Pagination";

export default function DriverTable() {
  const [modalOpen, setModalOpen] = useState();
  const [driverData, setDriverData] = useState();
  const [active, setActiveTab] = useState(0);
  const [singleDriverData, setSingleDriverData] = useState();
  const [chooseData, setChooseData] = useState(5);
  const [pageNumber, setpageNumber] = useState(1);

  
  const getDrivers = () => {
    const token = localStorage.getItem("logisticsAdminToken");

    var config = {
      method: "get",
      url: ` ${process.env.REACT_APP_API}/v1/get-drivers?page=${pageNumber}`,
      headers: { Authorization: `Bearer ${token}` },
    };

    axios(config)
      .then(function (response) {
        setDriverData(response.data?.data);
        console.log(response.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const nextPage = () => {
    if (driverData?.links[2]["active"] == true) {
      setpageNumber(pageNumber + 1);
    }
  };
  const prevPage = () => {
    if (pageNumber > 1) {
      setpageNumber(pageNumber - 1);
    }
  };
  useEffect(() => {
    getDrivers();
  }, []);
  return (
    <div className="pt-7">
      <DriverModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        singleDriverData={singleDriverData}
      />
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
                      Email Address
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Phone Number
                    </th>
                    {/* <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      No of Rides
                    </th> */}

                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Driver Status
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {driverData?.data?.map((data, i) => (
                    <tr
                      //onClick={() => navigate("/userdetails")}
                      class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <img
                          src={data?.profile_image || "/boy.png"}
                          className="h-8 w-8 rounded-full"
                        />
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
                      {/* <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        3
                      </td> */}

                      <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                        {data?.driver_status}
                      </td>

                      <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setModalOpen("modal-open");
                            setSingleDriverData(data);
                          }}
                          className="bg-[#cecfe0] font-bold  text-gray-600 text-center py-2 px-1 rounded-lg"
                        >
                          View details
                        </button>
                      </td>
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
                    totalPage={driverData?.total}
                    show={false}
                    data={driverData}
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
