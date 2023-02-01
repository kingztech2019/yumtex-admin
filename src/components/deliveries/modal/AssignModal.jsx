import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";
import Pagination from "../../utils/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


export default function AssignModal({ modalOpen, setModalOpen,driverData,driverItem }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  const [chooseData, setChooseData] = useState(5);
  const [pageNumber, setpageNumber] = useState(1);
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
  const assignDriver = (users) => {
    const token = localStorage.getItem("logisticsAdminToken");
   console.log(users);
    setLoading("loading");
    var config = {
      method: "post",
      url: ` ${process.env.REACT_APP_API}/v1/assign-driver/${users?.id}/${driverItem?.es_id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {},
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
        setModalOpen("")
    console.log(response?.data);
        //getUserData();
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
    <div>
      {/* Put this part before </body> tag */}
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
                        Email
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
                    {driverData?.data?.map((data,i)=>(
                      <tr
                      key={i}
                      //onClick={() => navigate("/userdetails")}
                      class="bg-white border-gray-300 border-b cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <img src={data?.profile_image||"/boy.png"} className="h-8 w-8" />
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data?.firstname} {data?.lastname}
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span className="font-black">{data?.email}</span>
                        <div>{data?.phone_no}</div>
                      </td>
                      <td class="text-sm font-bold  px-6 py-4 whitespace-nowrap">
                        <div onClick={()=>assignDriver(data)} className="bg-[#FFEFDF] font-bold  text-[#E4750D] text-center py-2 px-1 rounded-lg">
                          Assign
                        </div>
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
    </div>
  );
}
