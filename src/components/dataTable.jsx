import React, { useState ,useEffect} from 'react';
import axios from "axios";
import { FaCheckCircle, FaLock, FaSyncAlt, FaEllipsisV, FaShieldAlt, FaPlusCircle } from 'react-icons/fa';

const Datatable = () => {
  const [deniedPorts, setDeniedPorts] = useState([]);
  const [portToDeny, setPortToDeny] = useState("");
  const [message, setMessage] = useState("");
  const [allowedPorts, setAllowedPorts] = useState([]);

  // Fetch denied ports from Flask API
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/list-deny-ports")
      .then((response) => {
        setDeniedPorts(response.data.denied_ports);
      })
      .catch((error) => {
        console.error("Error fetching denied ports:", error);
      });
  }, []);

  // Allow all denied ports
  const handleAllowAllPorts = () => {
    axios.post("http://127.0.0.1:5000/allow-all-ports")
      .then((response) => {
        setAllowedPorts(response.data.allowed_ports);
        setMessage("All denied ports have been allowed successfully.");
      })
      .catch((error) => {
        console.error("Error allowing all ports:", error);
        setMessage("Error allowing all ports.");
      });
  };

  // Deny a specific port
  const handleDenyPort = () => {
    axios.post("http://127.0.0.1:5000/deny-port", { port: portToDeny })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error denying port:", error);
        setMessage("Error denying port.");
      });
  };

  // Manage ports by allowing all and then denying a specific one
  const handleManagePorts = () => {
    axios.post("http://127.0.0.1:5000/manage-ports", { port: portToDeny })
      .then((response) => {
        setAllowedPorts(response.data.allowed_ports);
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error managing ports:", error);
        setMessage("Error managing ports.");
      });
  };

  return (
    <div className="App">
      <h1>Firewall Management</h1>

      <div>
        <h2>Denied Ports</h2>
        <ul>
          {deniedPorts.length > 0 ? (
            deniedPorts.map((port, index) => (
              <li key={index}>{port}</li>
            ))
          ) : (
            <p>No denied ports found.</p>
          )}
        </ul>
      </div>

      <div>
        <h2>Manage Ports</h2>
        <input
          type="text"
          placeholder="Enter Port to Deny"
          value={portToDeny}
          onChange={(e) => setPortToDeny(e.target.value)}
        />
        <button onClick={handleDenyPort}>Deny Port</button>
        <button onClick={handleAllowAllPorts}>Allow All Ports</button>
        <button onClick={handleManagePorts}>Manage Ports</button>
      </div>

      {message && <p>{message}</p>}

      <div>
        <h2>Allowed Ports</h2>
        <ul>
          {allowedPorts.length > 0 ? (
            allowedPorts.map((port, index) => (
              <li key={index}>{port}</li>
            ))
          ) : (
            <p>No allowed ports found.</p>
          )}
        </ul>
      </div>
    </div>
  );


  // const data = [
  //   {
  //     site: 'SafeLine Waf Community Edition',
  //     port: '8081',
  //     runMode: 'Defense',
  //     advanced: ['CAPTCHA', 'AUTH', 'DYNAMIC'],
  //     access: 7563,
  //     blocked: 7563,
  //   },
  //   {
  //     site: 'SafeLine Waf Community Edition',
  //     port: '8080/SSL',
  //     runMode: 'Defense',
  //     advanced: ['CAPTCHA', 'AUTH', 'DYNAMIC'],
  //     access: 22,
  //     blocked: 22,
  //   },
  //   {
  //     site: 'test',
  //     port: '8083/SSL',
  //     runMode: 'Defense',
  //     advanced: ['CAPTCHA', 'AUTH', 'DYNAMIC'],
  //     access: 8147,
  //     blocked: 8136,
  //   },
  //   {
  //     site: '✨ Demo',
  //     port: '443/SSL 80',
  //     runMode: 'Defense',
  //     advanced: ['CAPTCHA', 'AUTH', 'DYNAMIC'],
  //     access: 13036,
  //     blocked: 11692,
  //   },
  //   {
  //     site: 'SafeLine Waf Community Edition',
  //     port: '7888/SSL',
  //     runMode: 'Defense',
  //     advanced: ['CAPTCHA', 'AUTH', 'DYNAMIC'],
  //     access: 23454,
  //     blocked: 23166,
  //   },
  //   {
  //     site: 'Untitled',
  //     port: '8009/SSL',
  //     runMode: 'Offline',
  //     advanced: ['CAPTCHA', 'AUTH', 'DYNAMIC'],
  //     access: 24340,
  //     blocked: 24340,
  //   },
  // ];

  // return (
  //   <div className="p-5">
  //     {/* Add Site Button and Total Websites */}
  //     <div className="flex justify-between items-center mb-4">
  //       <span className="text-text-gray text-lg">{data.length} websites</span>
  //       <button className="flex items-center bg-sea-green-p text-white px-4 py-2 rounded">
  //         <FaPlusCircle className="mr-2" />
  //         Add Site
  //       </button>
  //     </div>

  //     <table className="w-full border-collapse">
  //       <thead>
  //         <tr className="bg-light-gray-neon-p">
  //           <th className="text-left p-3 text-sm text-text-gray">Site</th>
  //           <th className="text-left p-3 text-sm text-text-gray">Port</th>
  //           <th className="text-left p-3 text-sm text-text-gray">Run Mode</th>
  //           <th className="text-left p-3 text-sm text-text-gray">Advanced</th>
  //           <th className="text-left p-3 text-sm text-text-gray">Today</th>
  //           <th className="text-left p-3 text-sm text-text-gray">Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.map((item, index) => (
  //           <tr key={index} className="border-b border-light-gray-neon-p">
  //             <td className="p-3 text-gray-700">{item.site}</td>
  //             <td className="p-3 text-gray-700">{item.port}</td>
  //             <td className="p-3">
  //               <FaShieldAlt className="inline mr-2 text-sea-green-p" />
  //               <span
  //                 className={`py-1 px-3 rounded-md text-sm ${
  //                   item.runMode === 'Defense' ? 'bg-sea-green-p text-white' : 'bg-red-500 text-white'
  //                 }`}
  //               >
  //                 {item.runMode}
  //               </span>
  //             </td>
  //             <td className="p-3">
  //               <AdvancedButtons advanced={item.advanced} />
  //             </td>
  //             <td className="p-3">
  //               <span className="block">Access: {item.access}</span>
  //               <span className="block">Blocked: {item.blocked}</span>
  //             </td>
  //             {/* End icon */}
  //             <td className="p-3">
  //               <FaEllipsisV className="text-text-gray cursor-pointer" />
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

const AdvancedButtons = ({ advanced }) => {
  const [selected, setSelected] = useState({
    CAPTCHA: false,
    AUTH: false,
    DYNAMIC: false,
  });

  const toggleButton = (type) => {
    setSelected((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  return (
    <div className="flex space-x-4">
      {advanced.includes('CAPTCHA') && (
        <button
          onClick={() => toggleButton('CAPTCHA')}
          className={`flex items-center px-2 py-1 border rounded ${
            selected.CAPTCHA ? 'border-sea-green-p text-sea-green-p' : 'border-black text-black'
          }`}
        >
          <FaCheckCircle className={`mr-2 ${selected.CAPTCHA ? 'text-sea-green-p' : 'text-black'}`} />
          CAPTCHA
        </button>
      )}
      {advanced.includes('AUTH') && (
        <button
          onClick={() => toggleButton('AUTH')}
          className={`flex items-center px-2 py-1 border rounded ${
            selected.AUTH ? 'border-sea-green-p text-sea-green-p' : 'border-black text-black'
          }`}
        >
          <FaLock className={`mr-2 ${selected.AUTH ? 'text-sea-green-p' : 'text-black'}`} />
          AUTH
        </button>
      )}
      {advanced.includes('DYNAMIC') && (
        <button
          onClick={() => toggleButton('DYNAMIC')}
          className={`flex items-center px-2 py-1 border rounded ${
            selected.DYNAMIC ? 'border-sea-green-p text-sea-green-p' : 'border-black text-black'
          }`}
        >
          <FaSyncAlt className={`mr-2 ${selected.DYNAMIC ? 'text-sea-green-p' : 'text-black'}`} />
          DYNAMIC
        </button>
      )}
    </div>
  );
};

export default Datatable;
