import axios from "axios";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateCategory({ modalOpen, setModalOpen }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
const [roleData,setRoleData] =useState()



  const CreateUser = (data) => {
    const token = localStorage.getItem("logisticsAdminToken");
    const payload = {
      ...data
    };
    setLoading("loading");
    var config = {
      method: "post",
      url: ` ${process.env.REACT_APP_API}/v1/create-category`,
      headers: { Authorization: `Bearer ${token}` },
      data: { ...payload },
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
window.location.reload()
        setModalOpen("")
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
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Create Category</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <form onSubmit={handleSubmit(CreateUser)}>
            <div className="flex justify-between pt-10 py-3">
              <div className="w-1/2">
                <label className="text-black text-sm font-black px-2">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your Category Name"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  {...register("category_name")}
                  required
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="text-black text-sm font-black px-2">
                  Delivery Per KG
                </label>
                <input
                  type="text"
                  p
                  placeholder="Enter your delivery per KG"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  {...register("category_delivery_per_kg")}
                  required
                />
              </div>
            </div>
            <div className="py-3">
              <label className="text-black text-sm font-black px-2">
                Category Commission
              </label>
              <input
                type="text"
                placeholder="Enter your commisson"
                className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                {...register("category_commission")}
                required
              />
            </div>
            
             
           

            {/* <div className="flex relative justify-between items-center">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your Password"
                id="fname"
                name="fname"
                className="border border-[#E8E9EA] outline-none  px-3 py-4 text-sm w-full bg-white focus:bg-white "
                required
                {...register("password")}
              />
              <div
                className="absolute right-1"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <span>
                    <FontAwesomeIcon icon={faEye} className="" size="sm" />
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faEyeSlash} className="" size="sm" />
                  </span>
                )}
              </div>
            </div> */}
            <div className="flex justify-between py-4">
              <div>
                <label
                  onClick={() => setModalOpen("")}
                  className="border border-[#3b4046] btn px-5 text-white rounded-lg py-4"
                >
                  Cancel
                </label>
              </div>
              <div className="pl-2">
                <button
                  //htmlFor="my-modal-3"
                  className={`${loading} btn border-0 bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer`}
                >
                  Create Category
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
