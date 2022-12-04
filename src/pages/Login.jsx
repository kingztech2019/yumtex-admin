import {
  faArrowCircleLeft,
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/header/NavBar";
const LogIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  // const onSubmit = (data) => {
  //   setLoading(true);
  //   var config = {
  //     method: "post",
  //     url: ` ${import.meta.env.VITE_APP_API}auth/login`,
  //     headers: {},
  //     data: { ...data },
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       setLoading(false);
  //       toast.success(response?.data?.message, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //       localStorage.setItem(
  //         "giftAdminToken",
  //         response?.data?.data?.access_token
  //       );
  //       console.log(response?.data?.data?.access_token);
  //       navigate("/dashboard");
  //       // console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       if (error?.response?.data?.error) {
  //         setLoading(false);
  //         toast.error(error?.response?.data?.error[0], {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         return;
  //       } else {
  //         setLoading(false);
  //         toast.error(error?.response?.data?.message, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       }
  //       console.log(error);
  //     });
  // };
  return (
    <>
      <NavBar />
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
      <div className="flex justify-center  items-center h-screen bg-[#F6F6F6]">
        <div className="mx-6 w-[540px]">
          <div>
            <div className="mb-8  bg-white border-white rounded-2xl py-12 px-12  w-full mx-auto">
              <div>
                <div className="text-black font-extrabold text-center text-2xl  pt-6 ">
                  Sign In
                  <div className="font-light text-sm text-gray-400">
                    Start managing your account
                  </div>
                </div>
                <form>
                  <div className="py-2">
                    <label className="text-black text-sm font-black px-2">
                      Email Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your email address"
                      className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                      {...register("email")}
                      required
                    />
                  </div>{" "}
                  <label className="text-black text-sm font-black px-2 ">
                    Password
                  </label>
                  <div className="flex relative justify-between items-center">
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
                          <FontAwesomeIcon
                            icon={faEye}
                            className=""
                            size="sm"
                          />
                        </span>
                      ) : (
                        <span>
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            className=""
                            size="sm"
                          />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="text-right font-black pt-4 text-deepBlue">
                      Forget Password
                    </div>
                    <button className="bg-gradient-to-l from-[#F39531] to-[#DC5921] text-center  w-full text-base py-3 text-white rounded-3xl border-deepBlue  font-medium">
                      {loading ? "Loading" : "Login"}
                    </button>
                  </div>
                  <div className="text-center">
                    Don't have an account{" "}
                    <span className="text-deepBlue font-black">Sign Up</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <form/> */}
    </>
  );
};
export default LogIn;
