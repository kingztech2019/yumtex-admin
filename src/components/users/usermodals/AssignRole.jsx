import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AssignRole({ modalOpen, setModalOpen }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();

  return (
    <div>
      {/* Put this part before </body> tag */}

      <input type="checkbox" id="my-modal-13" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Assign Role</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <form>
            <div className="flex justify-between pt-10 py-3">
              <div className="w-1/2">
                <label className="text-black text-sm font-black px-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your First Name"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  {...register("email")}
                  required
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="text-black text-sm font-black px-2">
                  Last Name
                </label>
                <input
                  type="text"
                  p
                  placeholder="Enter your Last Name"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  {...register("email")}
                  required
                />
              </div>
            </div>

            <div class="relative py-4">
              <label className="text-black text-sm font-black px-2">Role</label>
              <select
                class="block appearance-none w-full bg-white border border-[#E8E9EA]  py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white "
                id="grid-state"
              >
                <option selected disabled>
                  Select role
                </option>
                <option>Missouri</option>
                <option>Texas</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="flex justify-between py-4">
              <div>
                <label
                  onClick={() => setModalOpen("")}
                  className="border border-[#3b4046] px-5 text-black rounded-lg py-4"
                >
                  Cancel
                </label>
              </div>
              <div className="pl-2">
                <label
                  //htmlFor="my-modal-3"
                  className="bg-gradient-to-l from-[#F39531] to-[#DC5921] px-4 text-[#fff] rounded-lg py-4 cursor-pointer"
                >
                  Create User
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
