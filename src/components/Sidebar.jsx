import { TfiBarChartAlt } from "react-icons/tfi";
import { GrNotes } from "react-icons/gr";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import { CgNotes } from "react-icons/cg";
import { GiBrokenShield } from "react-icons/gi";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { LiaToolsSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

export default function Sidebar() {
  const [isSystemModalOpenSites, setisSystemModalOpenSites] = useState(false);
  const [isProtectionOpenDropdown, setIsProtectionDropdown] = useState(false);
  const [sitesDropValue, setSitesDropValue] = useState(0);
  const [isSystemModalOpen, setSystemModalOpen] = useState(false); // State for modal

  const location = useLocation(); // Get the current location

  const toggleDropdownSites = () => {
    setisSystemModalOpenSites(!isSystemModalOpenSites);
    setIsProtectionDropdown(false);
  };

  const toogleOtherComponents = () => {
    setSitesDropValue(0);
    setisSystemModalOpenSites(false);
  };

  const toggleDropdownProtection = () => {
    setIsProtectionDropdown(!isProtectionOpenDropdown);
    setSitesDropValue(0);
    setisSystemModalOpenSites(false);
  };

  const toggleSystemModal = () => {
    setSystemModalOpen(!isSystemModalOpen); // Toggle the modal state
  };

  // Function to determine if a route is active
  const isActive = (path) => (location.pathname === path ? "bg-sea-green-p text-white" : "");

  return (
    <>
      <div className="w-52 h-full p-4 relative overflow-hidden">
        <div className="flex items-center gap-1 cursor-pointer">
          <img
            src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1819120589.1727740800&semt=ais_hybrid"
            alt="logo"
            className="w-6 h-6"
          />
          <h1 className="text-xl font-bold">SafeLine WAF</h1>
        </div>

        <div className="flex flex-col mt-6 gap-1">
          <a
            href="/dashboard"
            className={`flex items-center gap-3 w-full ${isActive('/dashboard')} rounded-md p-4 ease-in duration-100`}
            onClick={toogleOtherComponents}
          >
            <TfiBarChartAlt />
            <span>Dashboard</span>
          </a>

          <a
            href="#"
            className={`flex items-center gap-3 w-full ${isActive('/events')} rounded-md p-4 ease-in duration-100`}
            onClick={toogleOtherComponents}
          >
            <GrNotes />
            <span>Events</span>
          </a>

          {/* Sites Dropdown */}
          <button
            type="button"
            className={`flex items-center gap-3 w-full ${isActive('/sites')} rounded-md p-4 ease-in duration-100`}
            onClick={toggleDropdownSites}
          >
            <div className="flex items-center gap-3">
              <IoShieldCheckmarkOutline />
              <span>Sites</span>
            </div>
            <div>{isSystemModalOpenSites ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
          </button>

          <div
            className={`overflow-hidden ease-in-out duration-500 ${
              isSystemModalOpenSites ? "max-h-40" : "max-h-0" 
            }`}
          >
            <div className={`flex flex-col gap-2 p-4`}>
              <a
                href="/sites"
                className="flex items-center gap-4 ease-in duration-100"
                role="sites-item"
                onClick={() => setSitesDropValue(1)}
              >
                {sitesDropValue === 1 ? (
                  <>
                    <GoDotFill className="text-sea-green-p" />
                    <span className="font-bold">Website</span>
                  </>
                ) : (
                  <>
                    <LuDot />
                    <span className="text-gray-500">Website</span>
                  </>
                )}
              </a>

              <a
                href="#"
                className="flex items-center gap-4 ease-in duration-100"
                role="sites-item"
                onClick={() => setSitesDropValue(2)}
              >
                {sitesDropValue === 2 ? (
                  <>
                    <GoDotFill className="text-sea-green-p" />
                    <span className="font-bold">SSL Cert</span>
                  </>
                ) : (
                  <>
                    <LuDot />
                    <span className="text-gray-500">SSL Cert</span>
                  </>
                )}
              </a>

              <a
                href="#"
                className="flex items-center gap-4 ease-in duration-100"
                role="sites-item"
                onClick={() => setSitesDropValue(3)}
              >
                {sitesDropValue === 3 ? (
                  <>
                    <GoDotFill className="text-sea-green-p" />
                    <span className="font-bold">Proxy Setting</span>
                  </>
                ) : (
                  <>
                    <LuDot />
                    <span className="text-gray-500">Proxy Setting</span>
                  </>
                )}
              </a>
            </div>
          </div>

          {/* Protection Dropdown */}
          <button
            type="button"
            className={`flex items-center gap-3 w-full ${isActive('/protections')} rounded-md p-4 ease-in duration-100`}
            onClick={toggleDropdownProtection}
          >
            <div className="flex items-center gap-3">
              <LiaToolsSolid />
              <span>Protections</span>
            </div>
            <div>
              {isProtectionOpenDropdown ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowForward />
              )}
            </div>
          </button>

          <a
            href="#"
            className={`flex items-center gap-3 w-full ${isActive('/system')} rounded-md p-4 ease-in duration-100`}
            onClick={toggleSystemModal} // Trigger modal
          >
            <IoSettingsOutline />
            <span>System</span>
          </a>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 mb-4 flex flex-col gap-1 w-inherit">
          <span className="bg-white ml-4 rounded-full px-2 courier-prime-regular cursor-default">Version 5.0.0</span>
          <div className="flex flex-col mt-1 gap-1">
            <a
              href="#"
              className={`flex items-center gap-3 w-full ${isActive('/homepage')} rounded-md px-4 py-2 ease-in duration-100`}
              onClick={toogleOtherComponents}
            >
              <GiBrokenShield />
              <span>Homepage</span>
            </a>

            <a
              href="#"
              className={`flex items-center gap-3 w-full ${isActive('/documentation')} rounded-md px-4 py-2 ease-in duration-100`}
              onClick={toogleOtherComponents}
            >
              <CgNotes />
              <span>Documentation</span>
            </a>
          </div>
        </div>
      </div>

      {/* PopUp Window */}
      {isSystemModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75">
          <div className="bg-white rounded-md p-6 w-3/4 shadow-lg max-w-4xl relative">
            <div className="relative">
              <div className="flex justify-between items-start border-b-2 pb-4">
                <div>
                  <span className="bg-yellow-400 text-white rounded-md p-1 px-3 inline-block mb-2 mr-1">
                    XSS
                  </span>
                  <span className="text-md">
                    https://demo.waf.chaitin.com/tomcat-docs/appdev/sample/web/hello.jsp?test=&lt;script&gt;alert(12345)&lt;/script&gt;
                  </span>
                  <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
                    <div className="flex flex-col gap-4">
                      {/* Attack IP */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-semibold">Attack IP</span>
                        <div>
                          <span className="text-black font-medium">123.254.107.235</span>
                          <button className="text-sea-green-p text-xs ml-2">Whitelist</button>
                        </div>
                      </div>
                      {/* Result */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-semibold">Result</span>
                        <span className="text-black font-medium">Blocked</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="absolute top-0 right-0 text-gray-500" onClick={toggleSystemModal}>
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
