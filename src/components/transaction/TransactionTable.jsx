import axios from "axios";
import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import Pagination from "../utils/Pagination";
import TableHeaders from "../utils/TableHeaders";
import TransactionModal from "./modal/TransactionModal";

export default function TransactionTable({
  chooseData,
  nextPage,
  prevPage,
  setChooseData,
  transactionData,
}) {
  const d = new Date();
  let monthNumber = [d.getMonth()];
  let yearNumber = [d.getFullYear()];
  const [monthIndex, setMonthIndex] = useState(monthNumber);
  const [modalOpen, setModalOpen] = useState();
  const [loading, setLoading] = useState();
  const [searchData, setSearchData] = useState();
  const [filterTriggered, setFilterTriggered] = useState(false);
  var currentDate = new Date(yearNumber, monthIndex);
  var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  var lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  var startDate = new Date(firstDay).toLocaleDateString().replaceAll("/", "-");
  var endDate = new Date(lastDay).toLocaleDateString().replaceAll("/", "-");
  console.log(startDate.replaceAll("/", "-"));
  const getDatingSearch = async () => {
    setLoading(true);
    const token = localStorage.getItem("logisticsAdminToken");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/v1/sort-transactions/${startDate}/${endDate}`,
        {
          headers: headers,
        }
      );

      setSearchData(response?.data?.data);
      console.log(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  useEffect(() => {
    if (filterTriggered) {
      getDatingSearch();
    }
  }, [monthIndex]);

  return (
    <div className="pt-7">
      <TransactionModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              <div className="py-3 px-4">
                <TableHeaders
                  showFilter={true}
                  rootElementId="pagetodownload"
                  downloadFileName="transaction-data"
                  setMonthIndex={setMonthIndex}
                  getSearch={getDatingSearch}
                  setFilterTriggered={setFilterTriggered}
                  filterTriggered={filterTriggered}
                />
              </div>

              <table class="min-w-full" id="pagetodownload">
                <thead class="bg-white border-b   border-gray-300">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Type
                    </th>

                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Amount Paid (NGN)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData?.data?.map((data, i) => (
                    <tr
                      onClick={() => setModalOpen("modal-open")}
                      key={i}
                      class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.user?.firstname} {data?.user?.lastname}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {data?.th_record_type}
                      </td>

                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {new Date(data?.date).toLocaleDateString()}
                      </td>

                      <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                        {new Date(data?.date).toLocaleTimeString()}
                      </td>
                      <td class="text-sm text-gray-900 font-bold  px-6 py-4 whitespace-nowrap">
                        {data?.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {transactionData?.data?.length == 0 && (
                <div className="flex justify-center items-center h-screen">
                  <div className="text-xl font-black">No Available data</div>
                </div>
              )}
              <div className="flex justify-end pt-2 pb-24 px-7">
                <div>
                  <Pagination
                    chooseData={chooseData}
                    setChooseData={setChooseData}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    totalPage={transactionData?.total}
                    show={true}
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
