import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";

export default function AssignModal({ modalOpen, setModalOpen }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Assign Driver</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>
          <div className="py-5">
            <div className="bg-white shadow-lg py-10">
              <div className="px-20">
                <div className="flex justify-center">
                  <div class="relative text-gray-600 focus-within:text-gray-400">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                      <button
                        type="submit"
                        class="p-1 focus:outline-none focus:shadow-outline"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          class="w-6 h-6"
                        >
                          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </button>
                    </span>
                    <input
                      type="search"
                      name="q"
                      class="py-3 text-sm px-44 bg-gray-200 rounded-md pl-10 outline-none focus:text-gray-900"
                      placeholder="Search..."
                      autocomplete="off"
                    />
                  </div>
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
                        Driver
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                      >
                        Location
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
                        <img src="/boy.svg" />
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Abula Rice
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span className="font-black">Adeoni Muili Yewande</span>
                        <div>080617881992</div>
                      </td>
                      <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                        <div className="bg-[#FFEFDF] font-bold  text-[#E4750D] text-center py-2 px-1 rounded-lg">
                          Assign
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
    </div>
  );
}
