import React from "react";

export default function NavBar() {
  return (
    <div className="bg-white w-full h-20 pt-3">
      <div className="flex justify-between">
        <div className="pl-3">
          <img src="/logo.svg" />
        </div>
        <div className="pr-4">
          <button className="border border-[#DC5921] rounded-3xl px-3 py-3 text-[#DC5921]">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
