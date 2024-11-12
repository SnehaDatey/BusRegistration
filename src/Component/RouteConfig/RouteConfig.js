import React, {useState} from 'react'
import './RouteConfig.css'
import Footer from '../Footer/Footer'

const RouteConfig = () => {

  const [routeName, setRouteName] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    // Initialize error object
    const validationErrors = {};

    // Route Name validation
    if (!routeName.trim()) {
      validationErrors.routeName = 'Route Name is required';
    }

    // Bus Number validation
    if (!busNumber) {
      validationErrors.busNumber = 'Bus Number is required';
    }

    setErrors(validationErrors);

    // If no errors, proceed with form submission logic
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted');
      // Additional form submission logic here
    }
  };


  return (
   
    <div className='RouteConfig-form'>
      <div className="headingRow d-flex justify-content-between flex-wrap align-items-center">
         <div className="form-heading">Route Configuration</div>
      </div>
      <form>
          {/* Route Name */}
          <div className="form-group row">
            <label htmlFor="driverName" className="col-sm-2 col-form-label">
            Route Name <span className="text-danger">*</span>
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="RouteName"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder="Enter Route name" />

            </div>

            {errors.routeName && (
              <div className="text-danger routeErrClass">{errors.routeName}</div>
            )}


          </div>


          {/* Bus Name */}
          <div className="form-group row">
            <label htmlFor="driverName" className="col-sm-2 col-form-label">
            Bus Number <span className="text-danger">*</span>
            </label>
            <div className="col-sm-10">
            <select className="form-control"  name="busNumber" id="busNumber" value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}>
                  <option value="volvo">Select an Option</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
          </select>

            </div>

            
          {errors.busNumber && (
              <div className="text-danger routeErrClass">{errors.busNumber}</div>
            )}
          </div>



        {/* Start Time and End Time fields */}
          <div className="form-group row">
            <label htmlFor="bus" className="col-sm-2 col-form-label">Start Time</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="bus" placeholder="HH:MM:SS" />
            </div>
            <label htmlFor="type" className="col-sm-2 col-form-label">End Time </label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="type" placeholder="HH:MM:SS" />
            </div>
          </div>



         {/* Driver Field */}
         <div className="form-group row">
            <label htmlFor="driverName" className="col-sm-2 col-form-label">
            Driver 
            </label>
            <div className="col-sm-10">
              <input type="text" disabled className="form-control" id="driverName" />
            </div>
          </div>


           {/* Attendant Filed */}
           <div className="form-group row">
            <label htmlFor="driverName" className="col-sm-2 col-form-label">
            Attendant
            </label>
            <div className="col-sm-10">
              <input type="text" disabled className="form-control" id="attendantName" />
            </div>
          </div>


           {/* Checkbox Active/Not Filed */}
           <div className="form-group row">
            <label htmlFor="driverName" className="col-sm-2 col-form-label">
            Active 
            </label>
            <div className="col-sm-1">
            <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  
            </div>
            </div>
          </div>
            <button type="button" className='saveBtnRoute btn-primary' onClick={handleSave}> <i class="fa-solid fa-plus"></i> Save</button>
            <button type="button" class="btn btn-outline-danger"><i class="fa-solid fa-xmark"></i> Clear</button>
      </form>
<hr />
      <Footer />
    </div>
  )
}

export default RouteConfig