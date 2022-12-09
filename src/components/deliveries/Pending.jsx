import React, { useState } from "react";
import { COLUMNS } from "../../column";
import TableHeaders from "../utils/TableHeaders";
import AssignModal from "./modal/AssignModal";

export default function PendingTable() {
  const [modalOpen, setModalOpen] = useState();
  const [disableOpen, setDisableOpen] = useState();
  return (
    <div className="pt-7">
      <AssignModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
                    <th
                      scope="col"
                      class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                    ></th>
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    //onClick={() => navigate("/userdetails")}
                    class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <img src="/stock.svg" />
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Abula Rice
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className="font-black">Adeoni Muili Yewande</span>
                      <div>080617881992</div>
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className="font-black">Adeoni Muili Yewande</span>
                      <div>080617881992</div>
                    </td>
                    <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                      <span className="bg-[#DFFFF2] py-1 px-1 text-[#40A69F] font-black">
                        23, Osaye Street, Ogba
                      </span>
                      <div className="bg-[#FFDFDF] py-1 px-1 text-[#D33030] font-black">
                        20, Felicia Koleosho Street, Opebi
                      </div>
                    </td>
                    <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                      26th July 1990
                    </td>
                    <td class="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                      10000
                    </td>

                    <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                      <div
                        onClick={() => setModalOpen("modal-open")}
                        className="bg-[#FFEFDF] font-bold  text-[#E4750D] text-center py-2 px-1 rounded-lg"
                      >
                        Assign Driver
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
