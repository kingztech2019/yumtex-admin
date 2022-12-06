import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";

export default function DriverModal({ modalOpen, setModalOpen }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Driver’s Details</div>
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
                    <div className="text-gray-400 text-sm">
                      MEANS OF IDENTIFICATION
                    </div>
                    <div className="font-black">NIN</div>
                  </div>
                  <div className="pl-5">
                    <div className="text-gray-400 text-sm">
                      DRIVER’S LICENSE
                    </div>
                    <div className="font-black">NTA6678899A2</div>
                  </div>
                  <div className="pl-5">
                    <div className="text-gray-400 text-sm">ENGINE NUMBER</div>
                    <div className="font-black">3455688990</div>
                  </div>
                </div>
                <div className="flex justify-between  py-4">
                  <div>
                    <div className="text-gray-400 text-sm">PLATE NUMBER</div>
                    <div className="font-black ">128901212000</div>
                  </div>
                  <div className="pl-5">
                    <div className="text-gray-400 text-sm">CHASIS NUMBER</div>
                    <div className="font-black">35629008812</div>
                  </div>
                  <div className="pl-5">
                    <div className="text-gray-400 text-sm">RATINGS</div>
                    <div className="rating">
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-green-500"
                      />
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-green-500"
                        checked
                      />
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-green-500"
                      />
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-green-500"
                      />
                      <input
                        type="radio"
                        name="rating-4"
                        className="mask mask-star-2 bg-green-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="py-2 border-b border-gray-200">
                    MOTORCYCLE IMAGES
                  </div>
                  <div className="flex justify-between py-4">
                    <div>
                      <img src="/motor1.svg" />
                    </div>
                    <div>
                      <img src="/motor2.svg" />
                    </div>
                    <div>
                      <img src="/motor3.svg" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="py-2 border-b border-gray-200">
                    BANK DETAILS
                  </div>
                  <div className="flex justify-between py-4">
                    <div>
                      <div className="text-gray-400 text-sm">BANK</div>
                      <div className="font-black">GTBANK</div>
                    </div>
                    <div className="pl-5">
                      <div className="text-gray-400 text-sm">
                        ACCOUNT NUMBER
                      </div>
                      <div className="font-black">02223312222</div>
                    </div>
                    <div className="pl-5">
                      <div className="text-gray-400 text-sm">ACCOUNT NAME</div>
                      <div className="font-black">SOFTAMOS TECH</div>
                    </div>
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
