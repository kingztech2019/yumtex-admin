import React from "react";

export default function TopProducts() {
  return (
    <div>
      <div className="bg-white rounded-lg h-auto px-2">
        <div className="font-semibold text-lg  pt-3">Top Rated Drivers</div>
        <div className="font-light text-sm">
          Top rated drivers in the system
        </div>
        <div className="pt-5 pb-3">
          <div className="flex justify-between pb-2">
            <div>
              <div className="flex items-center">
                <div>
                  <img src="/boy.svg" />
                </div>
                <div className="pl-2">
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
            </div>
            <div className="text-red-500">65,376 Rides</div>
          </div>
          <div className="flex justify-between pb-2">
            <div>
              <div className="flex items-center">
                <div>
                  <img src="/boy.svg" />
                </div>
                <div className="pl-2">
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
            </div>
            <div className="text-red-500">65,376 Rides</div>
          </div>
          <div className="flex justify-between pb-2">
            <div>
              <div className="flex items-center">
                <div>
                  <img src="/boy.svg" />
                </div>
                <div className="pl-2">
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
            </div>
            <div className="text-red-500">65,376 Rides</div>
          </div>
        </div>
      </div>
    </div>
  );
}
