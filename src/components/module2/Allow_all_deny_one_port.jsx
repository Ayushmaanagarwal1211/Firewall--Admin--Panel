import React from 'react'

export default function Allow_all_deny_one_port() {
    const [deniedPorts, setDeniedPorts] = useState([]);
    const [allowedPorts, setAllowedPorts] = useState([]);
    const [portToDeny, setPortToDeny] = useState("");
    const [portToAllow, setPortToAllow] = useState(""); // New state for port to allow
    const [message, setMessage] = useState("");
  
    // Fetch denied ports from Flask API
    useEffect(() => {
      axios.get("http://127.0.0.1:5000/list-deny-ports")
        .then((response) => {
          setDeniedPorts(response.data.denied_ports || []);
        })
        .catch((error) => {
          console.error("Error fetching denied ports:", error);
          setDeniedPorts(['8080', '3306', '5432']); // Simulated data in case of error
        });
    }, []);
  
    // Allow a specific port
    const handleAllowPort = () => {
      axios.post("http://127.0.0.1:5000/allow-port", { port: portToAllow })
        .then((response) => {
          setMessage(response.data.message || "Port allowed successfully.");
        })
        .catch((error) => {
          console.error("Error allowing port:", error);
          setMessage("Error allowing port.");
        });
    };
  
    // Deny a specific port
    const handleDenyPort = () => {
      axios.post("http://127.0.0.1:5000/deny-port", { port: portToDeny })
        .then((response) => {
          setMessage(response.data.message || "Port denied successfully (dummy data).");
        })
        .catch((error) => {
          console.error("Error denying port:", error);
          setMessage("Error denying port. (Using fallback response)");
        });
    };
  
    // Allow all denied ports
    const handleAllowAllPorts = () => {
      axios.post("http://127.0.0.1:5000/allow-all-ports")
        .then((response) => {
          setAllowedPorts(response.data.allowed_ports || []);
          setMessage("All denied ports have been allowed successfully.");
        })
        .catch((error) => {
          console.error("Error allowing all ports:", error);
          setMessage("Error allowing all ports. (Using fallback data)");
        });
    };
  
    // Manage ports by allowing all and then denying a specific one
    const handleManagePorts = () => {
      axios.post("http://127.0.0.1:5000/manage-ports", { port: portToDeny })
        .then((response) => {
          setAllowedPorts(response.data.allowed_ports || []);
          setMessage(response.data.message || "Port management completed (dummy).");
        })
        .catch((error) => {
          console.error("Error managing ports:", error);
          setMessage("Error managing ports. (Using fallback response)");
        });
    };
  
    return (
      <div className="App">
        <h1>Firewall Management</h1>
  
        <div>
          <h2>Denied Ports</h2>
          <table className="ports-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Port</th>
              </tr>
            </thead>
            <tbody>
              {deniedPorts.length > 0 ? (
                deniedPorts.map((port, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{port}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No denied ports found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
  
        <div className="form-container">
          {/* Deny Port Input and Button */}
          <input
            type="text"
            placeholder="Enter Port to Deny"
            value={portToDeny}
            onChange={(e) => setPortToDeny(e.target.value)}
          />
          <button onClick={handleDenyPort}>Deny Port</button>
  
          {/* Allow Port Input and Button */}
          <input
            type="text"
            placeholder="Enter Port to Allow"
            value={portToAllow}
            onChange={(e) => setPortToAllow(e.target.value)}
          />
          <button onClick={handleAllowPort}>Allow Port</button>
  
          {/* Allow All Ports Button */}
          <button onClick={handleAllowAllPorts}>Allow All Ports</button>
          <button onClick={handleManagePorts}>Manage Ports</button>
        </div>
  
        {message && (
          <div className={`message ${message.includes("successfully") ? "success" : "error"}`}>
            {message}
          </div>
        )}
  
        <div>
          <h2>Allowed Ports</h2>
          <table className="ports-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Port</th>
              </tr>
            </thead>
            <tbody>
              {allowedPorts.length > 0 ? (
                allowedPorts.map((port, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{port}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No allowed ports found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
}
