import React from "react";

export default function RecentJoin({ dashboardData }) {
  console.log(dashboardData, "This is data");
  return (
    <div>
      <div className="bg-white rounded-lg h-[160px]">
        <div className="font-semibold text-lg pl-28 py-6">Recently Joined</div>
        <div className="flex justify-evenly">
          {dashboardData?.lastNewCustomers?.map((data, i) => (
            <>
              <div>
                <div className="inline-flex">
                  <div>
                    <img src={data?.profile_image || "/boy.svg"} />
                  </div>
                  <div className="font-medium pl-2">
                    {data?.firstname} {data?.lastname}
                    <div className="font-normal pt-1">20.02.22</div>
                  </div>
                </div>
              </div>
              <div className="border-r border-gray-400"></div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
