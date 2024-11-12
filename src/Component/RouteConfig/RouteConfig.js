import React from 'react'
import './RouteConfig.css'

const RouteConfig = () => {
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
              <input type="text" className="form-control" id="driverName" placeholder="Enter Route name" />
            </div>
          </div>


          {/* Bus Name */}
          <div className="form-group row">
            <label htmlFor="driverName" className="col-sm-2 col-form-label">
            Bus Number <span className="text-danger">*</span>
            </label>
            <div className="col-sm-10">
            <select className="form-control"  name="cars" id="cars">
                  <option value="volvo">Select an Option</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
          </select>
            </div>
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
              <input type="text" disabled className="form-control" id="driverName" />
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


      </form>
    </div>
  )
}

export default RouteConfig