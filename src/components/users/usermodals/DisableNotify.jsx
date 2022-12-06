import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function DisableNotify({ modalOpen, setModalOpen }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();

  return (
    <div>
      {/* Put this part before </body> tag */}

      <input type="checkbox" id="my-modal-13" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Notification</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <div>
            <div className="py-5 px-6 flex justify-center">
              Wait there! You are about to disable this user.
            </div>
            <div className="text-center"> Do you want to proceed?</div>
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
                  Yes Proceed
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
