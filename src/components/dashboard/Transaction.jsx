import React from "react";

export default function Transaction() {
  return (
    <div>
      <div className="bg-white rounded-lg h-auto">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-lg pl-28 py-6">
            Recent Deliveries
          </div>
          <div className="pr-28">View All</div>
        </div>

        <div className="flex p-2 justify-evenly">
          <div>ITEM</div>
          <div>PICK UP</div>
          <div>DESTINATION</div>
          <div>DATE</div>
        </div>
        <div className=" text-center flex justify-center">
          <hr className="border border-gray-200 px-10 w-[85%]" />
        </div>
        <div className="flex p-2 justify-evenly">
          <div>Abula Flour</div>
          <div>23, Osaye Street, Ogba</div>
          <div>23, Felicia Koleosho, Opebi</div>
          <div>22 Nov 2022</div>
        </div>
        <div className=" text-center flex justify-center">
          <hr className="border border-gray-200 px-10 w-[85%]" />
        </div>
        <div className="flex p-2 justify-evenly">
          <div>Abula Flour</div>
          <div>23, Osaye Street, Ogba</div>
          <div>23, Felicia Koleosho, Opebi</div>
          <div>22 Nov 2022</div>
        </div>
        <div className=" text-center flex justify-center">
          <hr className="border border-gray-200 px-10 w-[85%]" />
        </div>
        <div className="flex p-2 justify-evenly">
          <div>Abula Flour</div>
          <div>23, Osaye Street, Ogba</div>
          <div>23, Felicia Koleosho, Opebi</div>
          <div>22 Nov 2022</div>
        </div>
      </div>
    </div>
  );
}
