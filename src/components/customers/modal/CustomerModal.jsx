import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";

export default function CustomerModal({ modalOpen, setModalOpen }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Customer Details</div>
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
                <div className="flex justify-between py-4">
                  <div>
                    <div className="text-gray-400 text-sm">FIRST NAME</div>
                    <div className="font-black">Ayodele</div>
                  </div>
                  <div className="pl-5">
                    <div className="text-gray-400 text-sm">LAST NAME</div>
                    <div className="font-black">Fekomi</div>
                  </div>
                </div>
                <div className="flex justify-between  py-4">
                  <div>
                    <div className="text-gray-400 text-sm">EMAIL ADDRESS</div>
                    <div className="font-black ">ayodelefekomi@gmail.com</div>
                  </div>
                  <div className="pl-5">
                    <div className="text-gray-400 text-sm">PHONE NUMBER</div>
                    <div className="font-black">09066331112</div>
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
