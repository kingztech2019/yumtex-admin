import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";

export default function ItemModal({ modalOpen, setModalOpen, itemData }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Items</div>
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
                <table class="min-w-full">
                  <thead class="bg-white border-b   border-gray-300">
                    <tr>
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
                        Price
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-[#174A84] px-6 py-4 text-left"
                      >
                        Weight
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData?.es_delivery_items?.map((data, i) => (
                      <tr
                        key={i}
                        //onClick={() => navigate("/userdetails")}
                        class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {data?.name}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data?.value}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data?.weight}
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
    </div>
  );
}
