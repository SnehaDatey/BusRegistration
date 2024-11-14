import React from 'react'

const StudentMapping = () => {
  return (
    <div className='StdMapping-form'>
      <div className="headingRow d-flex justify-content-between flex-wrap align-items-center">
         <div className="form-heading">Student Pickup Point Mapping</div>
      </div>

      <form>
          {/* Route Name */}
          <div className="form-group row border d-flex">
            <label>Class</label>
            <select className='form-control'>
              <option>Class 10th - A</option>
            </select>
          </div>
      </form>
    </div>
  )
}

export default StudentMapping