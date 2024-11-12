import React, { useState } from 'react'
import './Drivermaster.css'
import Footer from '../Footer/Footer'

const Drivermaster = () => {

  // State to manage form data and validation errors
  const [formData, setFormData] = useState({
    driverName: '',
    bus: '',
    type: '',
    emergencyContactNo: '',
    contactNo: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear errors on change
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.driverName) newErrors.driverName = 'Driver/Attendant Name is required';
    if (!formData.bus) newErrors.bus = 'Please select a bus';
    if (!formData.type) newErrors.type = 'Please select a type';
    if (!formData.emergencyContactNo) newErrors.emergencyContactNo = 'Emergency Contact No is required';
    else if (!/^\d{10}$/.test(formData.emergencyContactNo)) newErrors.emergencyContactNo = 'Invalid contact number';

    if (!formData.contactNo) newErrors.contactNo = 'Contact No is required';
    else if (!/^\d{10}$/.test(formData.contactNo)) newErrors.contactNo = 'Invalid contact number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted', formData);
      // Add code to handle form submission (e.g., API call)
    }
  };


  return (
    <div className='driver-form'>
      <div className="headingRow d-flex justify-content-between flex-wrap align-items-center">
      <div className="form-heading">Driver Master</div>


      {/** Code for Button Group */}

      <div className="form-actions button-group">
          {/* New Button */}
          <button type="button" className="newBtn">
            <i className="fa-solid fa-pen"></i> New
          </button>

          {/* Save/Update Button */}
          <button
            type="submit"
            className="saveBtn"
            onClick={handleSubmit}
          
          >
            <i className="fa-solid fa-plus"></i> Save
          </button>

          {/* Delete Button with conditional disabling */}
          <button
            type="button"
            className="danger"
           
          >
            <i className="fa-solid fa-trash"></i> Delete
          </button>

          {/* Search Button */}
          <button type="button" className="searchBtn">
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
         
        </div>


      </div>

      <form>
        {/* Driver/Attendant Name */}
        <div className="form-group row">
          <label htmlFor="driverName" className="col-sm-2 col-form-label">
            Driver/Attendant Name <span className="text-danger">*</span>
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="driverName"
              value={formData.driverName}
              onChange={handleChange}
            placeholder="Driver/Attendant name" />
            {errors.driverName && <small className="text-danger">{errors.driverName}</small>}
          </div>
        </div>

        {/* Bus and Type Fields */}
        <div className="form-group row">
          <label htmlFor="bus" className="col-sm-2 col-form-label">Bus <span className="text-danger">*</span></label>
          <div className="col-sm-4">
          <select className="form-control"  name="BusName" id="BusName" value={formData.bus}
              onChange={handleChange}>
                  <option value="0">Select an Option</option>
                  <option value="MH31ED2323">MH31ED2323</option>
                  <option value="MH34WE8923">MH34WE8923</option>
                
          </select>
          {errors.bus && <small className="text-danger">{errors.bus}</small>}

          </div>
          <label htmlFor="type" className="col-sm-2 col-form-label">Type <span className="text-danger">*</span></label>
          <div className="col-sm-4">
          <select className="form-control"  name="Type" id="Type" value={formData.type}
              onChange={handleChange}>
                  <option value="0">Select an Option</option>
                  <option value="Driver">Driver</option>
                  <option value="Attendant">Attendant</option>
                
          </select>

          {errors.type && <small className="text-danger">{errors.type}</small>}
          </div>
        </div>


        {/* DOB and Joining Date */}
        <div className="form-group row">
          <label htmlFor="bus" className="col-sm-2 col-form-label">DOB</label>
          <div className="col-sm-4">
            <input type="date" className="form-control" name="DOB" />
          </div>
          <label htmlFor="type" className="col-sm-2 col-form-label">Joining Date </label>
          <div className="col-sm-4">
            <input type="date" className="form-control" name="joiningDate"/>
          </div>
        </div>


         {/* Licence Issue and Expirey Date */}
         <div className="form-group row">
          <label htmlFor="bus" className="col-sm-2 col-form-label">Licence Issue Date </label>
          <div className="col-sm-4">
            <input type="date" className="form-control" name="licenceIssue" />
          </div>
          <label htmlFor="type" className="col-sm-2 col-form-label">Licence Expiry Date</label>
          <div className="col-sm-4">
            <input type="date" className="form-control" name="licenceExpiry" />
          </div>
        </div>


         {/* Emergency Contact No and Contact No */}
         <div className="form-group row">
          <label htmlFor="bus" className="col-sm-2 col-form-label">Emergency Contact No <span className="text-danger">*</span> </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" name="EmergencyContactNo"
             value={formData.emergencyContactNo}
             onChange={handleChange}
            placeholder="Emergency Contact No" />
            {errors.emergencyContactNo && <small className="text-danger">{errors.emergencyContactNo}</small>}
          </div>
          <label htmlFor="type" className="col-sm-2 col-form-label">Contact No <span className="text-danger">*</span> </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" name="ContactNo"
             value={formData.contactNo}
             onChange={handleChange}
            placeholder="Contact No" />
            {errors.contactNo && <small className="text-danger">{errors.contactNo}</small>}
          </div>
        </div>

          {/* Address */}
          <div className="form-group row">
                <label htmlFor="driverName" className="col-sm-2 col-form-label">
                    Address
                </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="Address" placeholder="Address" />
              </div>
          </div>


             {/* Driver App Login */}
             <div className="form-group row">
                <label htmlFor="driverName" className="col-sm-2 col-form-label">
                    Driver App Login<span className="text-danger">*</span>
                </label>
              <div className=" form-check form-switch col-sm-10">            
                 <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              </div>
          </div>


           {/* Driving Licence No and Relieving Date */}
         <div className="form-group row">
          <label htmlFor="bus" className="col-sm-2 col-form-label">Driving Licence No   <span className="text-danger">*</span></label>
          <div className="col-sm-4">
            <input type="text" className="form-control" name=">DrivingLicenceNo" placeholder="Driving Licence No" />
          </div>
          <label htmlFor="type" className="col-sm-2 col-form-label">Relieving Date</label>
          <div className="col-sm-4">
            <input type="date" className="form-control" name="RelievingDate"/>
          </div>
        </div>

      </form>

      <hr />
      <Footer />
    </div>
  )
}

export default Drivermaster



