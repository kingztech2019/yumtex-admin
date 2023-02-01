import axios from "axios";
import React, { useState, useEffect } from "react";
import { COLUMNS } from "../../column";
import TableHeaders from "../utils/TableHeaders";
import ItemModal from "./modal/Items";

export default function CompletedTable() {
  const [modalOpen, setModalOpen] = useState();
  const [disableOpen, setDisableOpen] = useState();
  const [deliveryData, setDeliveryData] = useState();
  const [itemData, setItemData] = useState();
  const [loading, setLoading] = useState();
  const getDeliveryData = () => {
    const token = localStorage.getItem("logisticsAdminToken");
    setLoading("loading");
    var config = {
      method: "get",
      url: ` ${process.env.REACT_APP_API}/v1/get-schedule-deliveries/delivered`,
      headers: { Authorization: `Bearer ${token}` },
    };

    axios(config)
      .then(function (response) {
        setDeliveryData(response.data?.data);
        console.log(response.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getDeliveryData();
  }, []);
  const getItems = (data) => {
    setItemData(data);
    setModalOpen("modal-open");
  };
  return (
    <div className="pt-7">
      <ItemModal
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        itemData={itemData}
      />
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white">
              <div className="py-3 px-4">
                <TableHeaders showFilter={false} />
              </div>

              <table class="min-w-full">
                <thead class="bg-white border-b   border-gray-300">
                  <tr>
                    {/* <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    ></th> */}
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Sender’s Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Receiver’s Name
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      PickUp/Destination
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
                      Amount
                    </th>

                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    >
                      Assigned Driver
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryData?.data?.map((data, i) => (
                    <tr
                      onClick={() => getItems(data)}
                      class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      {/* <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <img src="/stock.svg" />
                      </td> */}
                      <td class="text-base text-gray-900 font-black px-6 py-4 whitespace-nowrap">
                        View
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span className="font-black">
                          {data?.es_senders_name}
                        </span>
                        <div>{data?.es_senders_phone_no}</div>
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span className="font-black">
                          {data?.es_receivers_name}
                        </span>
                        <div>{data?.es_receivers_phone_no}</div>
                      </td>
                      <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                        <span className="bg-[#DFFFF2] py-1 px-1 text-[#40A69F] font-black">
                          {data?.es_pickup_address}
                        </span>
                        <div className="bg-[#FFDFDF] py-1 px-1 text-[#D33030] font-black">
                          {data?.es_dropoff_address}
                        </div>
                      </td>
                      <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                        {new Date(data?.created_at).toDateString()}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                        {+data?.es_total}
                      </td>

                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className="font-black">{data?.driver?.firstname} {data?.driver?.lastname}</span>
                      <div>{data?.driver?.phone_no}</div>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
