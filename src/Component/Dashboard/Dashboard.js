import React, { useState, useEffect, useRef } from "react";
import BusForm from "./BusForm";
import { fetchBusMasterData } from "../Services/api";
import { useNavigate } from "react-router-dom"; 
import logo from '../../Images/logo.svg'

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [busData, setBusData] = useState([]);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Bus Master"); 

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fetch bus data on component mount
  useEffect(() => {
    const loadBusData = async () => {
      try {
        const response = await fetchBusMasterData({ school_id: 770 });
        setBusData(response.bus_data || []);
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

    const filtered = busData.filter((bus) =>
      bus.registration_no.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      setError("No results found for the given registration number.");
    }

    setFilteredBuses(filtered);
    setShowSearchModal(true);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setMenuOpen(true); // Automatically open the sidebar on wider screens
    } else {
      setMenuOpen(false); // Close it on smaller screens
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state based on current window size

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsMenuOpen(false); // Close the menu after logout
    navigate("/"); // Adjust to your login route
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to set the active menu item on click
  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };



  
  return (
    <div className="app-container">
      <aside className={`sidebar ${menuOpen ? "" : "closed"}`}>
        {window.innerWidth <= 768 && (
          <button className="close-button" onClick={() => setMenuOpen(false)}>
            ✖
          </button>
        )}
        <div className="logo d-flex"> <img src={logo} alt="vidyamate"/> VidyaMate</div>
        <nav>
          <ul>
            <li
              onClick={() => handleMenuClick("Bus Master")}
              className={activeMenuItem === "Bus Master" ? "active-menu" : ""}
            >
              Bus Master
            </li>
            <li
              onClick={() => handleMenuClick("Driver Master")}
              className={activeMenuItem === "Driver Master" ? "active-menu" : ""}
            >
              Driver Master
            </li>
            <li
              onClick={() => handleMenuClick("Route Configuration")}
              className={activeMenuItem === "Route Configuration" ? "active-menu" : ""}
            >
              Route Configuration
            </li>
            <li
              onClick={() => handleMenuClick("Student Pickup Point Mapping")}
              className={activeMenuItem === "Student Pickup Point Mapping" ? "active-menu" : ""}
            >
              Student Pickup Point Mapping
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <div className="hamburger-content">
        {window.innerWidth <= 768 && (
          <button className="hamburger text-white" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        )}
        </div>
        <header>
          
          <div className="session d-flex">
          <label className="mt-2">Session </label>  &nbsp;
            <select className="form-select">
              
              <option value="23-24">FY2023-24</option>
            
            </select>
          </div>
          <div className="school-name">TIRPUDE JUNIOR COLLEGE</div>

          <div className="search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Registration No"
              className="form-control search-input"
            />
            <button className="search-button" onClick={handleSearch}>
              <i className="fa-solid searchIcon fa-magnifying-glass"></i>
            </button>
            <div className="dashboard">
              <div className="userIcon dropdown" ref={dropdownRef} onClick={toggleMenu}>
                S
                <div
                  className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}
                  aria-labelledby="dropdownMenuButton"
                >
                  <button className="dropdown-item" onClick={() => alert("Profile Clicked")}>
                    Profile
                  </button>
                  <button className="dropdown-item" onClick={() => alert("Change Password Clicked")}>
                    Change Password
                  </button>
                  <button className="dropdown-item" onClick={() => alert("Help Clicked")}>
                    Need Help?
                  </button>
                  <hr />
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="d-flex justify-content-end">
          {error && <div className="error-message">{error}</div>}
        </div>
        <hr />
        
       

        <BusForm />
        {showSearchModal && (
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
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
                          <th>Chasis No</th>
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
                              <td>{bus.chasis_no}</td>
                              <td>{bus.battery_no}</td>
                              <td>{bus.manufacturer}</td>
                              <td>{bus.model}</td>
                              <td>{bus.puc_no}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              {error || "No results found."}
                            </td>
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
