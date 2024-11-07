// BusForm.js
import React, { useState } from "react";
import { saveOrUpdateBus, fetchBusMasterData, deleteBus } from '../Services/api';
import './BusForm.css';
import successImg from '../../Images/check.png'
import deleteImg from '../../Images/delete.png'

function BusForm() {
  const [showModal, setShowModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [busId, setBusId] = useState(null);
  const [errors, setErrors] = useState({}); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete confirmation modal
  const [busIdToDelete, setBusIdToDelete] = useState(null); // New state to hold the bus ID to delete




  const [busDetails, setBusDetails] = useState({
    registration_no: "",
    registration_year: "",
    engine_no: "",
    chesis_no: "",
    battery_no: "",
    manufacturer: "",
    model: "",
    In_use: "False",
    last_use_date: "",
    puc_no: "",
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate registration_no
    if (!busDetails.registration_no.trim()) {
      formErrors.registration_no = "Registration number is required.";
      isValid = false;
    }

    // Validate registration_year
    if (!busDetails.registration_year.trim()) {
      formErrors.registration_year = "Registration year is required.";
      isValid = false;
    } else if (!/^\d{4}$/.test(busDetails.registration_year)) {
      formErrors.registration_year = "Registration year must be a 4-digit number.";
      isValid = false;
    }

    setErrors(formErrors); // Update the errors state
    return isValid; // Return the validation result
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; 
    }

    // Prepare the data to be sent
    const payload = {
      bus_registration_id: isEditMode ? busId : "", // Use existing ID if updating
      school_id: 770,
      registration_no: busDetails.registration_no,
      registration_year: busDetails.registration_year,
      engine_no: busDetails.engine_no,
      chesis_no: busDetails.chesis_no,
      battery_no: busDetails.battery_no,
      manufacturer: busDetails.manufacturer,
      model: busDetails.model,
      last_use_date: busDetails.last_use_date,
      puc_no: busDetails.puc_no,
      insert_by: 607,
      In_use: "False",
    };


    console.log("Payload Data : ", payload)
    try {
      const savedData = await saveOrUpdateBus(payload); 

      console.log(payload)
      console.log('API response:', savedData); 


      if (isEditMode) {
        setEditModal(true); 
      }
      else {
        setShowModal(true); 
      }

       // After saving, if the server returns a new bus_registration_id, retain it
    const updatedBusDetails = {
      ...busDetails,
      bus_registration_id: savedData.bus_registration_id || busDetails.bus_registration_id,
      registration_no: "",
      registration_year: "",
      engine_no: "",
      chesis_no: "",
      battery_no: "",
      manufacturer: "",
      model: "",
      In_use: "false",
      last_use_date: "",
      puc_no: "",
    };

    setBusDetails(updatedBusDetails); // Update with new ID if returned from the API
    setIsEditMode(false); // Reset to save mode
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'saving'} bus details:`, error);
      alert(`Failed to ${isEditMode ? 'update' : 'save'} bus details. Please try again.`);
    }
  };

  const handleSearchClick = async () => {
    setShowSearchModal(true);
    setLoading(true);
    setError(null);
    try {
      const response = await fetchBusMasterData({
        "school_id": 770
      });
      //console.log(response.bus_data)
      setBusData(response.bus_data);
    } catch (err) {
      setError('Error fetching bus data');
      //console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRowSelect = (bus) => {
    //console.log(bus, "bus")
    setBusDetails({
      registration_no: bus.registration_no || "",
      registration_year: bus.registration_year || "",
      engine_no: bus.engine_no || "",
      chesis_no: bus.chesis_no || "",
      battery_no: bus.battery_no || "",
      manufacturer: bus.manufacturer || "",
      model: bus.model || "",
      In_use: bus.In_use || "False",
      last_use_date: bus.last_use_date || "",
      puc_no: bus.puc_no || "",
    });
    setShowSearchModal(false);
    setIsEditMode(true);
    setBusId(bus.id); // Set the ID for updating
  };
  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to close the modal
  const handleCloseEditModal = () => {
    setEditModal(false);
  };



  // New function to handle the delete confirmation modal
  const confirmDelete = async () => {
    if (!busIdToDelete) return;

    try {
      await deleteBus(busIdToDelete);
      alert("Bus deleted successfully!");
      setIsEditMode(false); // Set to save mode

      setBusData((prevData) => prevData.filter((bus) => bus.id !== busIdToDelete));
      setBusDetails({
        registration_no: "",
        registration_year: "",
        engine_no: "",
        chesis_no: "",
        battery_no: "",
        manufacturer: "",
        model: "",
        In_use: "False",
        last_use_date: "",
        puc_no: "",
      });
      setShowDeleteModal(false);
    
    } catch (error) {
      console.error("Error deleting bus:", error);
      alert("Failed to delete bus. Please try again.");
    }
  };

  const handleRowDelete = (busId) => {
    setBusIdToDelete(busId);
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setBusIdToDelete(null);
  };



  const hangleNewClick =() =>{

    setIsEditMode(false); // Set to save mode

    setBusDetails({

      registration_no: "",
      registration_year: "",
      engine_no: "",
      chesis_no: "",
      battery_no: "",
      manufacturer: "",
      model: "",
      In_use: "False",
      last_use_date: "",
      puc_no: "",

    });
setError(''); // Clear validation error message
    
  }


  return (
    <div className="bus-form">
      {/* <div className="headingRow d-flex justify-content-between flex-wrap">
        <div className="form-heading">Bus Master</div>
        <div className="form-actions button-group">
          <button type="button" class="newBtn" onClick={hangleNewClick}><i class="fa-solid fa-pen"></i> New</button>
          <button type="submit" className="saveBtn" onClick={handleSubmit}><i className="fa-solid fa-plus"></i> {isEditMode ? "Update" : "Save"}</button>
            <button 
              type="button" 
              className={`danger ${!isEditMode ? 'disabled' : ''}`}  // Apply a 'disabled' class if not in edit mode
              onClick={() => isEditMode ? handleRowDelete(busId) : alert("No bus selected for deletion")}
              disabled={!isEditMode} // Disable button if not in edit mode
            >
              <i className="fa-solid fa-trash"></i> Delete
            </button>
 {/* Delete Confirmation Modal */}
      {/*showDeleteModal && (
        <div className="modal show " tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content p-3 deleteModal">
              <div className="modal-body text-center">
                  <img src={deleteImg} alt="delete" className="delImage" />
                  <h2 className="delHeading">Are you sure ? </h2>
                <p className="delPara"> You will not be able to revert this!</p>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={confirmDelete}>Yes, Delete it!</button> &nbsp;
                <button type="button" className="btn btn-danger" onClick={handleCloseDeleteModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

          <button type="button" className="searchBtn" onClick={handleSearchClick}><i class="fa-solid fa-magnifying-glass"></i> Search</button>
        </div>
      </div> */}





<div className="headingRow d-flex justify-content-between flex-wrap align-items-center">
  <div className="form-heading">Bus Master</div>

  <div className="form-actions button-group">
    {/* New Button */}
    <button type="button" className="newBtn" onClick={hangleNewClick}>
      <i className="fa-solid fa-pen"></i> New
    </button>

    {/* Save/Update Button */}
    <button
      type="submit"
      className="saveBtn"
      onClick={handleSubmit}
     
    >
      <i className="fa-solid fa-plus"></i> {isEditMode ? "Update" : "Save"}
    </button>

    {/* Delete Button with conditional disabling */}
    <button
      type="button"
      className={`danger ${!isEditMode ? "disabled" : ""}`}
      onClick={() => (isEditMode ? handleRowDelete(busId) : alert("No bus selected for deletion"))}
      disabled={!isEditMode}
    >
      <i className="fa-solid fa-trash"></i> Delete
    </button>

    {/* Search Button */}
    <button type="button" className="searchBtn" onClick={handleSearchClick}>
      <i className="fa-solid fa-magnifying-glass"></i> Search
    </button>

    {/* Delete Confirmation Modal */}
    {showDeleteModal && (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content p-3 deleteModal">
            <div className="modal-body text-center">
              <img src={deleteImg} alt="delete confirmation" className="delImage" />
              <h2 className="delHeading">Are you sure?</h2>
              <p className="delPara">You will not be able to revert this!</p>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-primary" onClick={confirmDelete}>
                Yes, Delete it!
              </button>
              <button type="button" className="btn btn-danger" onClick={handleCloseDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>















      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Registration No <span className="mandate">*</span></label>
          <input
            type="text"
            name="registration_no"
            value={busDetails.registration_no}
            onChange={handleChange}
            placeholder="Registration no"
            className="registrationNoInput"
          />


          <label className="labelYear">Year <span className="mandate">*</span></label>
          <input
            type="text"
            name="registration_year"
            value={busDetails.registration_year}
            onChange={handleChange}
            placeholder="Year"
          />

        </div>

        <div className="errorClass  d-flex justify-content-center ">
          <div className="w-50 ps-5 text-center ps-2">{errors.registration_no && <span className="error">{errors.registration_no}</span>} {/* Error message */}</div>
          <div className="w-50  text-start ps-2">{errors.registration_year && <span className="error">{errors.registration_year}</span>} {/* Error message */}</div>
        </div>

        <div className="form-row engineDiv">
          <label>Engine No</label>
          <input
            type="text"
            name="engine_no"
            value={busDetails.engine_no}
            onChange={handleChange}
            placeholder="Engine no"
          />
        </div>

        <div className="form-row chasisDiv">
          <label>Chesis No</label>
          <input
            type="text"
            name="chesis_no"
            value={busDetails.chesis_no}
            onChange={handleChange}
            placeholder="Chesis no"
          />
        </div>

        <div className="form-row batteryDiv">
          <label>Battery No</label>
          <input
            type="text"
            name="battery_no"
            value={busDetails.battery_no}
            onChange={handleChange}
            placeholder="Battery no"
          />
        </div>

        <div className="form-row ManufacturerDiv">
          <label>Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            value={busDetails.manufacturer}
            onChange={handleChange}
            placeholder="Manufacturer"
          />
        </div>

        <div className="form-row modelDiv">
          <label>Model</label>
          <input
            type="text"
            name="model"
            value={busDetails.model}
            onChange={handleChange}
            placeholder="Model"
          />
        </div>

        <div className="form-row inUseDiv">
          <label>In Use</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="In_use"
                value="yes"
                checked={busDetails.In_use === "yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            &nbsp;
            <label className="radio-option">
              <input
                type="radio"
                name="In_use"
                value="no"
                checked={busDetails.In_use === "no"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <div className="form-row dateDiv">
          <label>Last Use Date</label>
          <input
            type="date"
            name="last_use_date"
            value={busDetails.last_use_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-row pucDiv">
          <label>PUC No</label>
          <input
            type="text"
            name="puc_no"
            value={busDetails.puc_no}
            onChange={handleChange}
            placeholder="PUC no"
          />
        </div>


    <hr />
        <footer>
          <div className="left">Copyright © 2023 - 2024</div>
          <div className="right">For Any Technical Issue Contact us on <i class="fa-solid fa-phone"></i> (+919346730371 <i class="fa-solid fa-envelope"></i> support@vidyamate.in)</div>
        </footer>
      </form>


      {/* Modal for Success Message */}
      {showModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content successModal p-3">

              <div className="modal-body text-center">
                <img src={successImg} alt="check" />
                <p className="mt-4">Bus registered successfully!</p>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={handleCloseModal}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Modal for Edit Success Message */}
      {EditModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content successModal p-3">

              <div className="modal-body text-center">
                <img src={successImg} alt="check" />
                <p className="mt-4">Bus Updated Successfully!</p>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={handleCloseEditModal}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Modified Search Modal */}
      {showSearchModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
             
              <div className="modal-body p-0">
                {loading && <div>Loading...</div>}
                {error && <div className="error">{error}</div>}
                {!loading && !error && (
                  <div className="table-responsive searchTable table-bordered table-sm table-striped">
                    <table className="table table-striped table-hover">
                      <thead className="table-dark">
                        <tr className="text-center text-nowrap">
                          <th className="searchThHeading">Registration No</th>
                          <th className="searchThHeading">Year</th>
                          <th className="searchThHeading">Engine No.</th>
                          <th className="searchThHeading">Chesis No</th>
                          <th className="searchThHeading">Battery No</th>
                          <th className="searchThHeading">Manufacturer</th>
                          <th className="searchThHeading">Model</th>
                          <th className="searchThHeading">PUC No</th>
                          {/* <th>Action</th> */}
                        </tr>
                      </thead>
                      <tbody >
                        {busData.filter(bus =>
                          bus.registration_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bus.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bus.model.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((bus, index) => (
                          <tr className="searchRow text-center" key={index} onClick={() => handleRowSelect(bus)}>
                            <td >{bus.registration_no}</td>
                            <td>{bus.registration_year}</td>
                            <td>{bus.engine_no}</td>
                            <td>{bus.chesis_no}</td>
                            <td>{bus.battery_no}</td>
                            <td>{bus.manufacturer}</td>
                            <td>{bus.model}</td>
                            <td>{bus.puc_no}</td>
                          
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowSearchModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BusForm;
