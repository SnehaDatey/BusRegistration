import React, { useState, useEffect } from "react";
import BusForm from "./BusForm";
import { fetchBusMasterData } from '../Services/api'; // Adjust the path as needed

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [busData, setBusData] = useState([]); // State to hold all bus data
  const [error, setError] = useState(""); // State for error message

  // Fetch bus data on component mount
  useEffect(() => {
    const loadBusData = async () => {
      try {
        const response = await fetchBusMasterData({ school_id: 770 });
        setBusData(response.bus_data || []); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    };

    loadBusData();
  }, []);

  const handleSearch = () => {
    setError(""); // Reset error message

    if (!searchTerm.trim()) {
      setError("Please enter a registration number to search.");
      return; // Stop execution if the search term is empty
    }

    const filtered = busData.filter(bus =>
      bus.registration_no.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      setError("No results found for the given registration number.");
    }

    setFilteredBuses(filtered);
    setShowSearchModal(true);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">VidyaMate</div>
        <nav>
          <ul>
            <li>Bus Master</li>
            <li>Driver Master</li>
            <li>Route Configuration</li>
            <li>Student Pickup Point Mapping</li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <header>
          <div className="session">Session: FY2023-24</div>
          <div className="school-name">TRIPUDE JUNIOR COLLEGE</div>
          <div className="search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Registration No"
            />
            <button className="search-button" onClick={handleSearch}>🔍</button>
          </div>
        
        </header>
        <div className="d-flex justify-content-end">{error && <div className="error-message">{error}</div>} {/* Display error message */}</div>
        <BusForm />

        {/* Search Results Modal */}
        {showSearchModal && (
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Search Results</h5>
                  <button type="button" className="close" onClick={() => setShowSearchModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Registration No</th>
                          <th>Year</th>
                          <th>Engine No.</th>
                          <th>Chesis No</th>
                          <th>Battery No</th>
                          <th>Manufacturer</th>
                          <th>Model</th>
                          <th>PUC No</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBuses.length > 0 ? (
                          filteredBuses.map((bus, index) => (
                            <tr key={index}>
                              <td>{bus.registration_no}</td>
                              <td>{bus.registration_year}</td>
                              <td>{bus.engine_no}</td>
                              <td>{bus.chesis_no}</td>
                              <td>{bus.battery_no}</td>
                              <td>{bus.manufacturer}</td>
                              <td>{bus.model}</td>
                              <td>{bus.puc_no}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">{error || "No results found."}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowSearchModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;

























// import React from "react";
// import BusForm from "./BusForm";

// function Dashboard() {
 
//   return (
//     <div className="app-container">
//       <aside className="sidebar">
//         <div className="logo">VidyaMate</div>
//         <nav>
//           <ul>
//             <li>Bus Master</li>
//             <li>Driver Master</li>
//             <li>Route Configuration</li>
//             <li>Student Pickup Point Mapping</li>
//           </ul>
//         </nav>
//       </aside>
//       <main className="content">
//         <header>
//           <div className="session">Session: FY2023-24</div>
//           <div className="school-name">TRIPUDE JUNIOR COLLEGE</div>
//           <div className="search">
//             <input type="text" 
          
//            placeholder="Search by Registration No"
           
//             />
//             <button className="search-button">🔍</button>
//           </div>
//         </header>
//         <BusForm />
        
//       </main>
//     </div>
//   );
// }

// export default Dashboard;