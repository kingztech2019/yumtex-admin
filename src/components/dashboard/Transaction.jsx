import React from "react";

export default function Transaction({ dashboardData }) {
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
        {dashboardData?.Stats?.recentDeliveries?.map((data, i) => (
          <div key={i}>
            <div className=" text-center flex justify-center">
              <hr className="border border-gray-200 px-10 w-[85%]" />
            </div>
            <div className="flex p-2 justify-evenly">
              {console.log(JSON.parse(data?.es_delivery_items))}
              <div>Abula Flour</div>
              <div>{data?.es_pickup_address}</div>
              <div>{data?.es_dropoff_address}</div>
              <div>{new Date(data?.created_at).toDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
