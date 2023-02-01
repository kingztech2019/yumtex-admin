import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  // const [sidebarExpanded, setSidebarExpanded] = useState(
  //   storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  // );
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-white bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white border-r-2 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img src="logo.svg" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("dashboard") && "bg-[#FFEDE5]"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("dashboard") && "text-[#DC5921]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5938 4.64273L8.20629 0.796357C7.80409 0.436615 7.28341 0.237732 6.74379 0.237732C6.20418 0.237732 5.6835 0.436615 5.28129 0.796357L0.893795 4.64273C0.661527 4.85046 0.476178 5.10529 0.35009 5.39025C0.224002 5.67521 0.160068 5.98376 0.162545 6.29536V12.6865C0.162545 13.2683 0.393672 13.8263 0.805079 14.2377C1.21649 14.6491 1.77448 14.8802 2.35629 14.8802H11.1313C11.7131 14.8802 12.2711 14.6491 12.6825 14.2377C13.0939 13.8263 13.325 13.2683 13.325 12.6865V6.28804C13.3265 5.97767 13.262 5.67053 13.136 5.38691C13.0099 5.10329 12.8251 4.84964 12.5938 4.64273ZM8.20629 13.4177H5.28129V9.76148C5.28129 9.56754 5.35834 9.38155 5.49547 9.24441C5.63261 9.10727 5.8186 9.03023 6.01254 9.03023H7.47504C7.66898 9.03023 7.85498 9.10727 7.99212 9.24441C8.12925 9.38155 8.20629 9.56754 8.20629 9.76148V13.4177ZM11.8625 12.6865C11.8625 12.8804 11.7855 13.0664 11.6484 13.2036C11.5112 13.3407 11.3252 13.4177 11.1313 13.4177H9.66879V9.76148C9.66879 9.17966 9.43767 8.62167 9.02626 8.21027C8.61485 7.79886 8.05686 7.56773 7.47504 7.56773H6.01254C5.43073 7.56773 4.87274 7.79886 4.46133 8.21027C4.04992 8.62167 3.81879 9.17966 3.81879 9.76148V13.4177H2.35629C2.16236 13.4177 1.97636 13.3407 1.83922 13.2036C1.70209 13.0664 1.62504 12.8804 1.62504 12.6865V6.28804C1.62518 6.18422 1.64742 6.08161 1.69028 5.98705C1.73315 5.89248 1.79567 5.80813 1.87367 5.73961L6.26117 1.90054C6.39461 1.78331 6.56617 1.71866 6.74379 1.71866C6.92142 1.71866 7.09297 1.78331 7.22642 1.90054L11.6139 5.73961C11.6919 5.80813 11.7544 5.89248 11.7973 5.98705C11.8402 6.08161 11.8624 6.18422 11.8625 6.28804V12.6865Z"
                        fill={
                          pathname.includes("dashboard") ? "#DC5921" : "#A4B4CB"
                        }
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Analytics */}
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("customers") && "bg-[#FFEDE5]"
                }`}
              >
                <NavLink
                  end
                  to="/customers"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("customers") && "text-[#DC5921]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={
                          pathname.includes("customers") ? "#DC5921" : "#A4B4CB"
                        }
                        d="M6.57071 8.14387C6.42608 8.14387 6.2847 8.18676 6.16445 8.26711C6.04419 8.34746 5.95047 8.46167 5.89512 8.59529C5.83978 8.7289 5.82529 8.87593 5.85351 9.01778C5.88172 9.15963 5.95137 9.28993 6.05364 9.39219C6.1559 9.49446 6.2862 9.56411 6.42805 9.59232C6.5699 9.62054 6.71693 9.60606 6.85055 9.55071C6.98416 9.49536 7.09837 9.40164 7.17872 9.28138C7.25907 9.16113 7.30196 9.01975 7.30196 8.87512C7.30196 8.68118 7.22492 8.49519 7.08778 8.35805C6.95064 8.22091 6.76465 8.14387 6.57071 8.14387V8.14387ZM9.49571 8.14387C9.35108 8.14387 9.2097 8.18676 9.08945 8.26711C8.96919 8.34746 8.87547 8.46167 8.82012 8.59529C8.76478 8.7289 8.75029 8.87593 8.77851 9.01778C8.80673 9.15963 8.87637 9.28993 8.97864 9.39219C9.0809 9.49446 9.2112 9.56411 9.35305 9.59232C9.4949 9.62054 9.64193 9.60606 9.77555 9.55071C9.90917 9.49536 10.0234 9.40164 10.1037 9.28138C10.1841 9.16113 10.227 9.01975 10.227 8.87512C10.227 8.68118 10.1499 8.49519 10.0128 8.35805C9.87564 8.22091 9.68965 8.14387 9.49571 8.14387ZM12.4207 8.14387C12.2761 8.14387 12.1347 8.18676 12.0144 8.26711C11.8942 8.34746 11.8005 8.46167 11.7451 8.59529C11.6898 8.7289 11.6753 8.87593 11.7035 9.01778C11.7317 9.15963 11.8014 9.28993 11.9036 9.39219C12.0059 9.49446 12.1362 9.56411 12.278 9.59232C12.4199 9.62054 12.5669 9.60606 12.7005 9.55071C12.8342 9.49536 12.9484 9.40164 13.0287 9.28138C13.1091 9.16113 13.152 9.01975 13.152 8.87512C13.152 8.68118 13.0749 8.49519 12.9378 8.35805C12.8006 8.22091 12.6146 8.14387 12.4207 8.14387ZM9.49571 1.56262C8.53542 1.56262 7.58453 1.75177 6.69734 2.11925C5.81014 2.48674 5.00402 3.02538 4.32499 3.7044C2.95363 5.07576 2.18321 6.93573 2.18321 8.87512C2.17682 10.5637 2.76148 12.2012 3.83583 13.5039L2.37333 14.9664C2.27187 15.0693 2.20313 15.1998 2.1758 15.3417C2.14847 15.4836 2.16377 15.6303 2.21977 15.7635C2.28051 15.8951 2.37897 16.0056 2.50265 16.0811C2.62634 16.1567 2.76967 16.1937 2.91446 16.1876H9.49571C11.4351 16.1876 13.2951 15.4172 14.6664 14.0458C16.0378 12.6745 16.8082 10.8145 16.8082 8.87512C16.8082 6.93573 16.0378 5.07576 14.6664 3.7044C13.2951 2.33304 11.4351 1.56262 9.49571 1.56262V1.56262ZM9.49571 14.7251H4.67677L5.35683 14.0451C5.42593 13.9773 5.4809 13.8966 5.51855 13.8075C5.55621 13.7183 5.57581 13.6226 5.57621 13.5259C5.57346 13.333 5.49461 13.149 5.35683 13.014C4.39932 12.0576 3.80306 10.7987 3.66961 9.45193C3.53617 8.10515 3.87382 6.75377 4.62502 5.62802C5.37622 4.50228 6.49451 3.67181 7.78935 3.27811C9.08419 2.88442 10.4755 2.95185 11.7262 3.46893C12.9769 3.986 14.0096 4.92072 14.6484 6.11384C15.2872 7.30696 15.4926 8.68466 15.2295 10.0122C14.9665 11.3398 14.2513 12.5351 13.2057 13.3944C12.1602 14.2538 10.8491 14.7241 9.49571 14.7251V14.7251Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Customers
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("users-roles") && "bg-[#FFEDE5]"
                }`}
              >
                <NavLink
                  end
                  to="/users-roles"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("users-roles") && "text-[#DC5921]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={
                          pathname.includes("users-roles")
                            ? "#DC5921"
                            : "#A4B4CB"
                        }
                        d="M3.81885 7.3374H6.0126C6.20654 7.3374 6.39253 7.26036 6.52967 7.12322C6.66681 6.98609 6.74385 6.80009 6.74385 6.60615C6.74385 6.41221 6.66681 6.22622 6.52967 6.08908C6.39253 5.95194 6.20654 5.8749 6.0126 5.8749H3.81885C3.62491 5.8749 3.43891 5.95194 3.30178 6.08908C3.16464 6.22622 3.0876 6.41221 3.0876 6.60615C3.0876 6.80009 3.16464 6.98609 3.30178 7.12322C3.43891 7.26036 3.62491 7.3374 3.81885 7.3374ZM12.5938 0.0249023H2.35635C1.77453 0.0249023 1.21654 0.256029 0.805132 0.667437C0.393724 1.07884 0.162598 1.63683 0.162598 2.21865V8.7999C0.162598 9.38172 0.393724 9.93971 0.805132 10.3511C1.21654 10.7625 1.77453 10.9937 2.35635 10.9937H12.5938C13.1757 10.9937 13.7337 10.7625 14.1451 10.3511C14.5565 9.93971 14.7876 9.38172 14.7876 8.7999V2.21865C14.7876 1.63683 14.5565 1.07884 14.1451 0.667437C13.7337 0.256029 13.1757 0.0249023 12.5938 0.0249023ZM13.3251 8.7999C13.3251 8.99384 13.2481 9.17984 13.1109 9.31697C12.9738 9.45411 12.7878 9.53115 12.5938 9.53115H2.35635C2.16241 9.53115 1.97641 9.45411 1.83928 9.31697C1.70214 9.17984 1.6251 8.99384 1.6251 8.7999V4.4124H13.3251V8.7999ZM13.3251 2.9499H1.6251V2.21865C1.6251 2.02471 1.70214 1.83872 1.83928 1.70158C1.97641 1.56444 2.16241 1.4874 2.35635 1.4874H12.5938C12.7878 1.4874 12.9738 1.56444 13.1109 1.70158C13.2481 1.83872 13.3251 2.02471 13.3251 2.21865V2.9499Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Users & Roles
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("driver") && "bg-[#FFEDE5]"
                }`}
              >
                <NavLink
                  end
                  to="/driver"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("driver") && "text-[#DC5921]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={
                          pathname.includes("driver") ? "#DC5921" : "#A4B4CB"
                        }
                        d="M12.5938 7.875H7.4751V2.75625C7.4751 2.3175 7.1826 2.025 6.74385 2.025C3.0876 2.025 0.162598 4.95 0.162598 8.60625C0.162598 12.2625 3.0876 15.1875 6.74385 15.1875C10.4001 15.1875 13.3251 12.2625 13.3251 8.60625C13.3251 8.1675 13.0326 7.875 12.5938 7.875ZM7.4751 13.6519C4.69635 14.0906 2.06385 12.1163 1.69822 9.3375C1.25947 6.55875 3.23385 3.92625 6.0126 3.56062V8.60625C6.0126 9.045 6.3051 9.3375 6.74385 9.3375H11.7895C11.497 11.6044 9.74197 13.3594 7.4751 13.6519ZM9.66885 0.5625C9.2301 0.5625 8.9376 0.855 8.9376 1.29375V5.68125C8.9376 6.12 9.2301 6.4125 9.66885 6.4125H14.0563C14.4951 6.4125 14.7876 6.12 14.7876 5.68125C14.7876 2.82937 12.5207 0.5625 9.66885 0.5625ZM10.4001 4.95V2.09812C11.8626 2.39062 12.9595 3.4875 13.252 4.95H10.4001Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Drivers
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("transaction") && "bg-[#FFEDE5]"
                }`}
              >
                <NavLink
                  end
                  to="/transaction"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("transaction") && "text-[#DC5921]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={
                          pathname.includes("transaction")
                            ? "#DC5921"
                            : "#A4B4CB"
                        }
                        d="M6.02402 4.95H10.4115C10.6055 4.95 10.7915 4.87296 10.9286 4.73582C11.0657 4.59869 11.1428 4.41269 11.1428 4.21875C11.1428 4.02481 11.0657 3.83881 10.9286 3.70168C10.7915 3.56454 10.6055 3.4875 10.4115 3.4875H6.02402C5.83008 3.4875 5.64409 3.56454 5.50695 3.70168C5.36982 3.83881 5.29277 4.02481 5.29277 4.21875C5.29277 4.41269 5.36982 4.59869 5.50695 4.73582C5.64409 4.87296 5.83008 4.95 6.02402 4.95ZM4.56152 7.875H10.4115C10.6055 7.875 10.7915 7.79796 10.9286 7.66082C11.0657 7.52369 11.1428 7.33769 11.1428 7.14375C11.1428 6.94981 11.0657 6.76381 10.9286 6.62668C10.7915 6.48954 10.6055 6.4125 10.4115 6.4125H4.56152C4.36758 6.4125 4.18159 6.48954 4.04445 6.62668C3.90732 6.76381 3.83027 6.94981 3.83027 7.14375C3.83027 7.33769 3.90732 7.52369 4.04445 7.66082C4.18159 7.79796 4.36758 7.875 4.56152 7.875ZM4.56152 10.8H10.4115C10.6055 10.8 10.7915 10.723 10.9286 10.5858C11.0657 10.4487 11.1428 10.2627 11.1428 10.0688C11.1428 9.87481 11.0657 9.68882 10.9286 9.55168C10.7915 9.41454 10.6055 9.3375 10.4115 9.3375H4.56152C4.36758 9.3375 4.18159 9.41454 4.04445 9.55168C3.90732 9.68882 3.83027 9.87481 3.83027 10.0688C3.83027 10.2627 3.90732 10.4487 4.04445 10.5858C4.18159 10.723 4.36758 10.8 4.56152 10.8ZM13.3365 0.5625H1.63652C1.44258 0.5625 1.25659 0.639542 1.11945 0.776678C0.982316 0.913814 0.905273 1.09981 0.905273 1.29375V14.4563C0.905273 14.5921 0.94309 14.7252 1.01449 14.8407C1.08588 14.9562 1.18803 15.0496 1.3095 15.1103C1.43096 15.171 1.56694 15.1967 1.70219 15.1845C1.83745 15.1724 1.96663 15.1227 2.07527 15.0413L3.58896 13.9078L5.09534 15.0413C5.22191 15.1362 5.37587 15.1875 5.53409 15.1875C5.69231 15.1875 5.84626 15.1362 5.97284 15.0413L7.48652 13.9078L9.00021 15.0413C9.12679 15.1362 9.28074 15.1875 9.43896 15.1875C9.59718 15.1875 9.75113 15.1362 9.87771 15.0413L11.3841 13.9078L12.8978 15.0413C13.0069 15.1226 13.1367 15.1719 13.2723 15.1835C13.408 15.1951 13.5442 15.1687 13.6656 15.1071C13.7862 15.0463 13.8876 14.9533 13.9586 14.8384C14.0296 14.7236 14.0674 14.5913 14.0678 14.4563V1.29375C14.0678 1.09981 13.9907 0.913814 13.8536 0.776678C13.7165 0.639542 13.5305 0.5625 13.3365 0.5625ZM12.6053 12.9938L11.8228 12.4088C11.6963 12.3138 11.5423 12.2625 11.3841 12.2625C11.2259 12.2625 11.0719 12.3138 10.9453 12.4088L9.43896 13.5422L7.92527 12.4088C7.7987 12.3138 7.64474 12.2625 7.48652 12.2625C7.3283 12.2625 7.17435 12.3138 7.04777 12.4088L5.53409 13.5422L4.02771 12.4088C3.90113 12.3138 3.74718 12.2625 3.58896 12.2625C3.43074 12.2625 3.27679 12.3138 3.15021 12.4088L2.36777 12.9938V2.025H12.6053V12.9938Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Transactions
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("revenue") && "bg-[#FFEDE5]"
                }`}
              >
                <NavLink
                  end
                  to="/revenue"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("revenue") && "text-[#DC5921]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={
                          pathname.includes("revenue") ? "#DC5921" : "#A4B4CB"
                        }
                        d="M7.4751 3.03779C7.28116 3.03779 7.09516 3.11484 6.95803 3.25197C6.82089 3.38911 6.74385 3.5751 6.74385 3.76904V11.0815C6.74385 11.2755 6.82089 11.4615 6.95803 11.5986C7.09516 11.7358 7.28116 11.8128 7.4751 11.8128C7.66904 11.8128 7.85503 11.7358 7.99217 11.5986C8.12931 11.4615 8.20635 11.2755 8.20635 11.0815V3.76904C8.20635 3.5751 8.12931 3.38911 7.99217 3.25197C7.85503 3.11484 7.66904 3.03779 7.4751 3.03779ZM3.81885 7.42529C3.62491 7.42529 3.43891 7.50234 3.30178 7.63947C3.16464 7.77661 3.0876 7.9626 3.0876 8.15654V11.0815C3.0876 11.2755 3.16464 11.4615 3.30178 11.5986C3.43891 11.7358 3.62491 11.8128 3.81885 11.8128C4.01279 11.8128 4.19878 11.7358 4.33592 11.5986C4.47306 11.4615 4.5501 11.2755 4.5501 11.0815V8.15654C4.5501 7.9626 4.47306 7.77661 4.33592 7.63947C4.19878 7.50234 4.01279 7.42529 3.81885 7.42529ZM11.1313 5.96279C10.9374 5.96279 10.7514 6.03983 10.6143 6.17697C10.4771 6.31411 10.4001 6.5001 10.4001 6.69404V11.0815C10.4001 11.2755 10.4771 11.4615 10.6143 11.5986C10.7514 11.7358 10.9374 11.8128 11.1313 11.8128C11.3253 11.8128 11.5113 11.7358 11.6484 11.5986C11.7856 11.4615 11.8626 11.2755 11.8626 11.0815V6.69404C11.8626 6.5001 11.7856 6.31411 11.6484 6.17697C11.5113 6.03983 11.3253 5.96279 11.1313 5.96279ZM12.5938 0.112793H2.35635C1.77453 0.112793 1.21654 0.34392 0.805132 0.755328C0.393724 1.16674 0.162598 1.72472 0.162598 2.30654V12.544C0.162598 13.1259 0.393724 13.6839 0.805132 14.0953C1.21654 14.5067 1.77453 14.7378 2.35635 14.7378H12.5938C13.1757 14.7378 13.7337 14.5067 14.1451 14.0953C14.5565 13.6839 14.7876 13.1259 14.7876 12.544V2.30654C14.7876 1.72472 14.5565 1.16674 14.1451 0.755328C13.7337 0.34392 13.1757 0.112793 12.5938 0.112793ZM13.3251 12.544C13.3251 12.738 13.2481 12.924 13.1109 13.0611C12.9738 13.1983 12.7878 13.2753 12.5938 13.2753H2.35635C2.16241 13.2753 1.97641 13.1983 1.83928 13.0611C1.70214 12.924 1.6251 12.738 1.6251 12.544V2.30654C1.6251 2.1126 1.70214 1.92661 1.83928 1.78947C1.97641 1.65234 2.16241 1.57529 2.35635 1.57529H12.5938C12.7878 1.57529 12.9738 1.65234 13.1109 1.78947C13.2481 1.92661 13.3251 2.1126 13.3251 2.30654V12.544Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Revenue
                    </span>
                  </div>
                </NavLink>
              </li> */}
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("deliveries") && "bg-[#FFEDE5]"
                }`}
              >
                <NavLink
                  end
                  to="/deliveries"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("deliveries") && "text-[#DC5921]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={
                          pathname.includes("deliveries")
                            ? "#DC5921"
                            : "#A4B4CB"
                        }
                        d="M4.57071 7.14399C4.42608 7.14399 4.2847 7.18688 4.16445 7.26723C4.04419 7.34758 3.95047 7.46179 3.89512 7.59541C3.83978 7.72903 3.82529 7.87606 3.85351 8.0179C3.88173 8.15975 3.95137 8.29005 4.05364 8.39232C4.1559 8.49458 4.2862 8.56423 4.42805 8.59244C4.5699 8.62066 4.71693 8.60618 4.85055 8.55083C4.98416 8.49548 5.09837 8.40176 5.17872 8.28151C5.25907 8.16125 5.30196 8.01987 5.30196 7.87524C5.30196 7.6813 5.22492 7.49531 5.08778 7.35817C4.95064 7.22104 4.76465 7.14399 4.57071 7.14399ZM7.49571 7.14399C7.35108 7.14399 7.2097 7.18688 7.08945 7.26723C6.96919 7.34758 6.87547 7.46179 6.82012 7.59541C6.76478 7.72903 6.75029 7.87606 6.77851 8.0179C6.80673 8.15975 6.87637 8.29005 6.97864 8.39232C7.0809 8.49458 7.2112 8.56423 7.35305 8.59244C7.4949 8.62066 7.64193 8.60618 7.77555 8.55083C7.90916 8.49548 8.02337 8.40176 8.10372 8.28151C8.18407 8.16125 8.22696 8.01987 8.22696 7.87524C8.22696 7.6813 8.14992 7.49531 8.01278 7.35817C7.87564 7.22104 7.68965 7.14399 7.49571 7.14399ZM10.4207 7.14399C10.2761 7.14399 10.1347 7.18688 10.0144 7.26723C9.89419 7.34758 9.80047 7.46179 9.74512 7.59541C9.68978 7.72903 9.67529 7.87606 9.70351 8.0179C9.73173 8.15975 9.80137 8.29005 9.90364 8.39232C10.0059 8.49458 10.1362 8.56423 10.278 8.59244C10.4199 8.62066 10.5669 8.60618 10.7005 8.55083C10.8342 8.49548 10.9484 8.40176 11.0287 8.28151C11.1091 8.16125 11.152 8.01987 11.152 7.87524C11.152 7.6813 11.0749 7.49531 10.9378 7.35817C10.8006 7.22104 10.6146 7.14399 10.4207 7.14399ZM7.49571 0.562744C6.53542 0.562744 5.58453 0.751888 4.69734 1.11938C3.81014 1.48686 3.00402 2.0255 2.32499 2.70453C0.953631 4.07589 0.183209 5.93585 0.183209 7.87524C0.176816 9.5638 0.761476 11.2014 1.83583 12.5041L0.373334 13.9666C0.271867 14.0694 0.203133 14.2 0.175803 14.3418C0.148473 14.4837 0.163773 14.6305 0.219771 14.7636C0.280507 14.8952 0.378968 15.0058 0.502653 15.0813C0.626339 15.1568 0.769672 15.1938 0.914459 15.1877H7.49571C9.4351 15.1877 11.2951 14.4173 12.6664 13.046C14.0378 11.6746 14.8082 9.81464 14.8082 7.87524C14.8082 5.93585 14.0378 4.07589 12.6664 2.70453C11.2951 1.33317 9.4351 0.562744 7.49571 0.562744ZM7.49571 13.7252H2.67677L3.35683 13.0452C3.42593 12.9775 3.4809 12.8967 3.51855 12.8076C3.55621 12.7185 3.57581 12.6227 3.57621 12.526C3.57346 12.3331 3.49461 12.1491 3.35683 12.0141C2.39932 11.0577 1.80306 9.79883 1.66961 8.45205C1.53617 7.10527 1.87382 5.75389 2.62502 4.62814C3.37622 3.5024 4.49451 2.67193 5.78935 2.27824C7.08419 1.88454 8.47548 1.95198 9.72618 2.46905C10.9769 2.98612 12.0096 3.92085 12.6484 5.11397C13.2872 6.30708 13.4926 7.68479 13.2295 9.01234C12.9665 10.3399 12.2513 11.5352 11.2057 12.3945C10.1602 13.2539 8.84908 13.7242 7.49571 13.7252Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Deliveries
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-4 rounded-lg mb-0.5 last:mb-0 ${
                  pathname.includes("express") && "bg-[#FFEDE5]"
                }`}
              >
                <NavLink
                  end
                  to="/express"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("express") && "text-[#DC5921]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill={
                          pathname.includes("express") ? "#DC5921" : "#A4B4CB"
                        }
                        d="M7.4751 3.03779C7.28116 3.03779 7.09516 3.11484 6.95803 3.25197C6.82089 3.38911 6.74385 3.5751 6.74385 3.76904V11.0815C6.74385 11.2755 6.82089 11.4615 6.95803 11.5986C7.09516 11.7358 7.28116 11.8128 7.4751 11.8128C7.66904 11.8128 7.85503 11.7358 7.99217 11.5986C8.12931 11.4615 8.20635 11.2755 8.20635 11.0815V3.76904C8.20635 3.5751 8.12931 3.38911 7.99217 3.25197C7.85503 3.11484 7.66904 3.03779 7.4751 3.03779ZM3.81885 7.42529C3.62491 7.42529 3.43891 7.50234 3.30178 7.63947C3.16464 7.77661 3.0876 7.9626 3.0876 8.15654V11.0815C3.0876 11.2755 3.16464 11.4615 3.30178 11.5986C3.43891 11.7358 3.62491 11.8128 3.81885 11.8128C4.01279 11.8128 4.19878 11.7358 4.33592 11.5986C4.47306 11.4615 4.5501 11.2755 4.5501 11.0815V8.15654C4.5501 7.9626 4.47306 7.77661 4.33592 7.63947C4.19878 7.50234 4.01279 7.42529 3.81885 7.42529ZM11.1313 5.96279C10.9374 5.96279 10.7514 6.03983 10.6143 6.17697C10.4771 6.31411 10.4001 6.5001 10.4001 6.69404V11.0815C10.4001 11.2755 10.4771 11.4615 10.6143 11.5986C10.7514 11.7358 10.9374 11.8128 11.1313 11.8128C11.3253 11.8128 11.5113 11.7358 11.6484 11.5986C11.7856 11.4615 11.8626 11.2755 11.8626 11.0815V6.69404C11.8626 6.5001 11.7856 6.31411 11.6484 6.17697C11.5113 6.03983 11.3253 5.96279 11.1313 5.96279ZM12.5938 0.112793H2.35635C1.77453 0.112793 1.21654 0.34392 0.805132 0.755328C0.393724 1.16674 0.162598 1.72472 0.162598 2.30654V12.544C0.162598 13.1259 0.393724 13.6839 0.805132 14.0953C1.21654 14.5067 1.77453 14.7378 2.35635 14.7378H12.5938C13.1757 14.7378 13.7337 14.5067 14.1451 14.0953C14.5565 13.6839 14.7876 13.1259 14.7876 12.544V2.30654C14.7876 1.72472 14.5565 1.16674 14.1451 0.755328C13.7337 0.34392 13.1757 0.112793 12.5938 0.112793ZM13.3251 12.544C13.3251 12.738 13.2481 12.924 13.1109 13.0611C12.9738 13.1983 12.7878 13.2753 12.5938 13.2753H2.35635C2.16241 13.2753 1.97641 13.1983 1.83928 13.0611C1.70214 12.924 1.6251 12.738 1.6251 12.544V2.30654C1.6251 2.1126 1.70214 1.92661 1.83928 1.78947C1.97641 1.65234 2.16241 1.57529 2.35635 1.57529H12.5938C12.7878 1.57529 12.9738 1.65234 13.1109 1.78947C13.2481 1.92661 13.3251 2.1126 13.3251 2.30654V12.544Z"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Express
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* E-Commerce */}

              {/* <li
                className={`px-3 py-4 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("all-transaction") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/customers"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("customers") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-black ${
                          pathname.includes("customers") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-black  ${
                          pathname.includes("customers") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      All Transaction
                    </span>
                  </div>
                </NavLink>
              </li> */}

              {/* <li
                className={`px-3 py-4 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("customers") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/customers"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("customers") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-black ${
                          pathname.includes("customers") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-black  ${
                          pathname.includes("customers") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      All Transaction
                    </span>
                  </div>
                </NavLink>
              </li> */}

              {/* <li
                className={`px-3 py-4 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("customers") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/customers"
                  className={`block text-black hover:text-black truncate transition duration-150 ${
                    pathname.includes("customers") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-black ${
                          pathname.includes("customers") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-black  ${
                          pathname.includes("customers") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      All Transaction
                    </span>
                  </div>
                </NavLink>
              </li> */}
              {/*           
              <SidebarLinkGroup activecondition={pathname.includes("agent")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("agent") && "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes("agent") &&
                                  "text-indigo-500"
                                }`}
                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                              />
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes("agent") &&
                                  "text-indigo-300"
                                }`}
                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                              />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Agent
                            </span>
                          </div>

                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "transform rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/create-agent"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Create Agent
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/all-agents"
                              className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                All agents
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup> */}
              {/* Messages */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("messages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("messages") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("messages") && "text-indigo-500"
                        }`}
                        d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("messages") && "text-indigo-300"
                        }`}
                        d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Messages
                    </span>
                  </div>
                </NavLink>
              </li> */}
              {/* Tasks */}
              {/* <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("tasks") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("tasks") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("tasks") && "text-indigo-500"
                        }`}
                        d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                      />
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("tasks") && "text-indigo-500"
                        }`}
                        d="M1 1h22v23H1z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("tasks") && "text-indigo-300"
                        }`}
                        d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Tasks
                    </span>
                  </div>
                </NavLink>
              </li> */}
              {/* Inbox */}

              {/* Calendar */}

              {/* Settings */}

              {/* Utility */}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
