import React, { useState, useEffect } from 'react'
import './Drivermaster.css'
import Footer from '../Footer/Footer'
import { saveOrUpdateDriver, fetchAllottedDrivers, deleteDriver } from '../Services/DriverMasterAPI'; // Import the API function
import { fetchBusMasterData} from '../Services/api';
import deleteImg from '../../Images/delete.png'
import successImg from '../../Images/check.png'

const Drivermaster = () => {
    const schoolUser = JSON.parse(localStorage.getItem('school_user'));
    const schoolId = schoolUser ? schoolUser.fk_school_id : null;
    const schoolEmpId = schoolUser ? schoolUser.school_emp_id : null;
   
  // State to manage form data and validation errors
    // Initial state for form data
    const initialState = {
      school_id: schoolId,
      bus_id: '',
      driver_master_id: '',
      driver_attendant_name: '',
      bus: '',
      emp_type: '',
      emergency_contact_no: '',
      phone_no: '',
      dob: '',
      joining_date: '',
      license_issue_date: '',
      license_expiry_date: '',
      address: '',
      driver_app_login: 'False',
      license_no: '',
      releaving_date: '',
      insert_by: schoolEmpId,
    };
  
    // State to manage form data and validation errors
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [busList, setBusList] = useState([]); 
   // const [driversList, setDriversList] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const [allottedDrivers, setAllottedDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [buttonLabel, setButtonLabel] = useState("Save");
//Delete States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [driverToDelete, setDriverToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

   
    

   // Fetch bus data when the component mounts
  useEffect(() => {
    const getBusData = async () => {
      try {
        const response = await fetchBusMasterData({
          school_id: schoolId,
        });
        setBusList(response.bus_data); 
      } catch (err) {
        console.error('Error fetching bus data:', err);
      }
    };

    getBusData(); // Call the function to fetch bus data
  }, [schoolId]);

  // Handle clearing of form (reset to initial state)
  const handleNew = () => {
    setFormData(initialState); // Reset form to initial state
    setErrors({}); // Clear any validation errors
    setButtonLabel("Save");  // Reset to "Save" for new entry
    setSelectedDriver(null); // Reset selectedDriver to null
  };


  const handleChange = (e) => {
    
    const { name, value, type, checked } = e.target;
   
    // Handle bus selection
    if (name === 'bus') {
      if (value && busList.length > 0) {
        const selectedBus = busList.find(bus => bus.id.toString() === value);
         alert(JSON.stringify(selectedBus.id))
        if (selectedBus) {
          setFormData({
            ...formData,
            bus: selectedBus.registration_no,  // Store registration number or name
            bus_id: JSON.stringify(selectedBus.id),  // Store the bus_id for form submission
          });
        } else {
          setFormData({
            ...formData,
            bus: '',
            bus_id: '',
          });
        }
      } else {
        setFormData({
          ...formData,
          bus: '',
          bus_id: '',
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  console.log(formData)
    setErrors({ ...errors, [name]: '' });
  };

  
  
  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.driver_attendant_name) newErrors.driver_attendant_name = 'Driver/Attendant Name is required';
    if (!formData.bus) newErrors.bus = 'Please select a bus';
    if (!formData.emp_type) newErrors.emp_type = 'Please select a type';
    if (!formData.emergency_contact_no) newErrors.emergency_contact_no = 'Emergency Contact No is required';
    else if (!/^\d{10}$/.test(formData.emergency_contact_no)) newErrors.emergency_contact_no = 'Invalid contact number';
    if (!formData.phone_no) newErrors.phone_no = 'Contact No is required';
    else if (!/^\d{10}$/.test(formData.phone_no)) newErrors.phone_no = 'Invalid contact number';
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // Function to fetch allotted drivers

  const handleSearchClick = async () => {
   
    try {
      const data = await fetchAllottedDrivers(schoolId);  // Fetch allotted drivers data
     
      setAllottedDrivers(data.driver_master_data);  // Store the fetched data in the state
      // Show the modal
    } catch (error) {
      console.error('Error fetching allotted drivers:', error);
    } finally {
      
    }
  };

  useEffect(()=>{
    handleSearchClick()
  },[])




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Run validation first
    if (!validate()) {
      // If validation fails, prevent form submission
      //alert("Please fix the errors before submitting.");
      return; // Exit early if validation fails
    }
  
    // Proceed with saving or updating driver data if validation is successful
    try {
      if (selectedDriver) {
        // Update existing driver
        await saveOrUpdateDriver(formData, selectedDriver.driver_master_id);
        alert('Driver data updated successfully!');

         // Update the drivers list to reflect the changes (e.g., re-fetch or update state)
       setAllottedDrivers(prevDrivers => 
        prevDrivers.map(driver => 
          driver.id === selectedDriver.id ? { ...driver, ...formData } : driver
        )
      );


      } else {
        // Save new driver
        await saveOrUpdateDriver(formData);
       // alert('Driver data saved successfully!');
        setShowSuccessModal(true); 
          // Optionally, add the new driver to the list
          setAllottedDrivers(prevDrivers => [...prevDrivers, formData]);
      }
  
      // Reset form after successful submission
      setFormData(initialState);
      setErrors({}); // Clear any errors
      setSelectedDriver(null); // Reset selected driver
    } catch (error) {
      alert('Error saving or updating driver data.');
    } finally {
      setLoading(false);
    }
  };

const handleSelectDriver = (driver) => {
  setSelectedDriver(driver);
 // console.log("Handle Selected Driver : " , driver)
  setDriverToDelete(driver.id);  // Set this here if needed
  //const selectedBus = busList.find((bus) => bus.id === driver.fk_busMaster_id);
 // console.log("Bus id : ", selectedBus)

  setFormData({
    driver_master_id: driver.id,
    school_id : schoolId,
    driver_attendant_name: driver.driver_attendant_name,
    emp_type: driver.emp_type,
    // bus: selectedBus ? selectedBus.registration_no : '',
    bus_id: driver.fk_busMaster_id,
    phone_no: driver.phone_no,
    emergency_contact_no: driver.emergency_contact_no,
    dob: driver.dob,
    license_no: driver.license_no,
    license_issue_date: driver.license_issue_date,
    license_expiry_date: driver.license_expiry_date,
    joining_date: driver.joining_date,
    releaving_date: driver.releaving_date,
    driver_app_login: "False",
    insert_by : schoolEmpId,
    address: driver.address,

  });
  
  setButtonLabel("Update");  // Set to "Update" when editing a driver
  setShowModal(false);
};


const confirmDelete = async () => {
 // console.log("Driver ID to delete:", driverToDelete);  // Check if the ID is correct

  try {

    // Call your API delete function here
    await deleteDriver(driverToDelete);
   // alert("Driver deleted successfully!");
   setShowDeleteModal(true); 
    setDriverToDelete(null);
    setIsModalOpen(false);
    handleNew(); // Clear the form and reset to New mode
  } catch (error) {
    console.error("Error deleting driver:", error);
  }
};


  // Function to close the modal
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowDeleteModal(false);
  };


  return (
    <div className='driver-form'>
      <div className="headingRow d-flex justify-content-between flex-wrap align-items-center">
      <div className="form-heading">Driver Master</div>


      {/** Code for Button Group */}

      <div className="form-actions button-group">
          {/* New Button */}
          <button type="button" className="newBtn"  onClick={handleNew}>
            <i className="fa-solid fa-pen"></i> New
          </button>

          {/* Save/Update Button */}
          <button type="submit" className="saveBtn" onClick={handleSubmit} disabled={loading}>
            <i className="fa-solid fa-plus"></i> {buttonLabel}
          </button>

           {/* Delete Button with conditional disabling */}
           <button
    type="button"
    className={`danger ${!selectedDriver ? "disabled" : ""}`}
    onClick={() => {
        if (selectedDriver) {
            setDriverToDelete(selectedDriver.id);
            setIsModalOpen(true);
        }
    }}
>
                <i className="fa-solid fa-trash"></i> Delete
          </button>

            {/* Delete Confirmation Modal */}
            {isModalOpen && (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content p-3 deleteModal">
                  <div className="modal-body text-center">
                    <img src={deleteImg} alt="delete confirmation" className="delImage" />
                    <h2 className="delHeading">Are you sure?</h2>
                    <p className="delPara">You will not be able to revert this!</p>
                  </div>
                  <div className="text-center ">
                    <button type="button" className="btn btn-primary" onClick={confirmDelete}>
                      Yes, Delete it!
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
           )}


          {/* Search Button */}
          <button type="button" className="searchBtn"onClick={()=> setShowModal(true) }>
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
         
        </div>


      </div>

      <form>
        <div className='driveForm-container'>
        {/* Driver/Attendant Name */}
        <div className="form-group row">
          <label htmlFor="driverName" className="col-sm-2 col-form-label">
            Driver/Attendant Name <span className="text-danger">*</span>
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="driver_attendant_name"
              value={formData.driver_attendant_name}
              onChange={handleChange}
            placeholder="Driver/Attendant name" />
            {errors.driver_attendant_name && <small className="text-danger">{errors.driver_attendant_name}</small>}
          </div>
        </div>

        {/* Bus and Type Fields */}
        <div className="form-group row">
          <label htmlFor="bus" className="col-sm-2 col-form-label">Bus <span className="text-danger">*</span></label>
          <div className="col-sm-4">
          <select className="form-control" name="bus" id="bus" value={formData.bus_id} 
            onChange={handleChange}>
                <option value="">Select an Option</option>
                      {busList.length > 0 ? (
                        busList.map((bus, index) => (
                          <option key={index} value={bus.id}>
                            {bus.registration_no}  {/* Display registration number or bus name */}
                          </option>
                        ))
                      ) : (
                        <option value="">No buses available</option>
                      )}
          </select>
          {errors.bus && <small className="text-danger">{errors.bus}</small>}

          </div>


          
          <label htmlFor="emp_type" className="col-sm-2 col-form-label">Type <span className="text-danger">*</span></label>
          <div className="col-sm-4">
          <select 
              className="form-control" 
              name="emp_type" 
              id="emp_type"
              value={formData.emp_type}
              onChange={handleChange}
            >
              <option value="">Select an Employee Type</option>
              <option value="Driver">Driver</option>
              <option value="Attendant">Attendant</option>
           </select>

          {errors.type && <small className="text-danger">{errors.type}</small>}
          </div>
        </div>


        {/* DOB and Joining Date */}
        <div className="form-group row">
          <label htmlFor="dob" className="col-sm-2 col-form-label">DOB</label>
          <div className="col-sm-4">
            <input type="date" 
            className="form-control" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange}
            />
          </div>
          <label htmlFor="type" className="col-sm-2 col-form-label">Joining Date </label>
          <div className="col-sm-4">
            <input type="date" className="form-control" name="joining_date"
             value={formData.joining_date} 
             onChange={handleChange}
            />
          </div>
        </div>


         {/* Licence Issue and Expirey Date */}
         <div className="form-group row">
          <label htmlFor="bus" className="col-sm-2 col-form-label">Licence Issue Date </label>
          <div className="col-sm-4">
            <input type="date" className="form-control" name="license_issue_date" 
             value={formData.license_issue_date} 
             onChange={handleChange}
            />
          </div>
          <label htmlFor="type" className="col-sm-2 col-form-label">Licence Expiry Date</label>
          <div className="col-sm-4">
            <input type="date" className="form-control" name="license_expiry_date" 
             value={formData.license_expiry_date} 
             onChange={handleChange}
            />
          </div>
        </div>


         {/* Emergency Contact No and Contact No */}
         <div className="form-group row">
          <label htmlFor="bus" className="col-sm-2 col-form-label">Emergency Contact No <span className="text-danger">*</span> </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" name="emergency_contact_no"
             value={formData.emergency_contact_no}
             onChange={handleChange}
            placeholder="Emergency Contact No" />
            {errors.emergency_contact_no && <small className="text-danger">{errors.emergency_contact_no}</small>}
          </div>
          <label htmlFor="type" className="col-sm-2 col-form-label">Contact No <span className="text-danger">*</span> </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" name="phone_no"
             value={formData.phone_no}
             onChange={handleChange}
            placeholder="Contact No" />
            {errors.phone_no && <small className="text-danger">{errors.phone_no}</small>}
          </div>
        </div>

          {/* Address */}
          <div className="form-group row">
                <label htmlFor="driverName" className="col-sm-2 col-form-label">
                    Address
                </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="address"
                 value={formData.address}
                 onChange={handleChange}
                placeholder="Address" />
              </div>
          </div>


             {/* Driver App Login */}
             <div className="form-group row">
                <label htmlFor="driverName" className="col-sm-2 col-form-label">
                    Driver App Login
                </label>
              <div className=" form-check form-switch col-sm-10">            
                 <input class="form-check-input" type="checkbox" role="switch" name="driver_app_login" id="flexSwitchCheckDefault" />
              </div>
          </div>


           {/* Driving Licence No and Relieving Date */}
         <div className="form-group row">
          <label htmlFor="bus" className="col-sm-2 col-form-label">Driving Licence No   </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" name="license_no"
            value={formData.license_no}
            onChange={handleChange}
            placeholder="Driving Licence No" />
          </div>


          <label htmlFor="type" className="col-sm-2 col-form-label">Relieving Date</label>
          <div className="col-sm-4">
            <input type="date" className="form-control" name="releaving_date"
            value={formData.releaving_date}
            onChange={handleChange}
            />
          </div>
        </div>
        </div>  {/*DriveForm-container ends here */}
      </form>

 {/* Modal for Success Message */}
 {showSuccessModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content successModal p-3">

              <div className="modal-body text-center">
                <img src={successImg} alt="check" />
                <p className="mt-4">Driver master added successfully.!</p>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={handleCloseModal}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}

       {/* Modal for Success Message */}
 {showDeleteModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content successModal p-3">

              <div className="modal-body text-center">
                <img src={successImg} alt="check" />
                <p className="mt-4">Driver deleted successfully.!</p>
              </div>
              <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={handleCloseModal}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}



 {/* Modal to display allotted drivers */}
{showModal && (
  <div className="modal">
    <div className="modal-content driverMasterSearch">
      <div className="modal-header">
        <h5>Allotted Drivers</h5>
        <button onClick={() => setShowModal(false)}>&times;</button>
      </div>
      <div className="modal-body driverMasterSearchModal">
        {allottedDrivers.length > 0 ? (
           <table className="table table-striped table-hover">
            <thead className="table-dark">
            <tr className="text-center text-nowrap">
                <th>DRIVER NAME</th>
                <th>TYPE</th>
                <th>DOB</th>
                <th>PHONE No</th>
                <th>EMGCONTACT No</th>
                <th>ADDRESS</th>
                <th>DRIVER LICENCE</th>
                <th>LCNISSDATE</th>	
                <th>LCNSEXPDATE</th>
                <th>JOIN DATE</th>	
                <th>RELIEVING DATE</th>
              </tr>
            </thead>
            <tbody>
              {allottedDrivers.map((driver, index) => (
                //onClick={() => handleRowClick(driver)}
                <tr key={index} className='searchDriverRow'  onClick={() => handleSelectDriver(driver)}>
                  <td>{driver.driver_attendant_name}</td>
                  <td>{driver.emp_type}</td>
                  <td>{driver.dob}</td>
                  <td>{driver.phone_no}</td>
                  <td>{driver.emergency_contact_no}</td>
                  <td>{driver.address}</td> {/* Assuming this data is available */}
                  <td>{driver.license_no}</td>
                  <td>{driver.license_issue_date}</td>
                  <td>{driver.license_expiry_date}</td>
                  <td>{driver.joining_date}</td>
                  <td>{driver.releaving_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No allotted drivers found for this school.</p>
        )}
      </div>
      <div className="modal-footer">
        <button className='btn-primary p-2 border-0 rounded' onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  </div>
)}


      <hr />
      <Footer />
    </div>
  )
}

export default Drivermaster



