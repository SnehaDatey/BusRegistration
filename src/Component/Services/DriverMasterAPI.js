import apiClient from '../Services/api'; // Import the axios instance from apiClient.js

// Function to save or update driver data
export const saveOrUpdateDriver = async (driverData) => {
  try {
    const response = await apiClient.post('/save_update_Drivermaster/', driverData);
    console.log("ResponseData = " , response.data);
    return response.data; // Return the response data for further handling if needed
  } catch (error) {
    console.error('Error saving or updating driver data:', error);
    throw error; // Throw the error so it can be handled in Drivermaster.js
  }
};


// Function to fetch allotted drivers by school ID
export const fetchAllottedDrivers = async (schoolId) => {
    try {
      const response = await apiClient.post('/get_Drivermasterdata/',{
        "school_id": schoolId
       });
      return response.data; // Assuming your API response contains the data you need
      //console.log(response.data)
    } catch (error) {
      console.error('Error fetching allotted drivers:', error);
      throw error; // Rethrow the error to be handled in the calling component
    }
  };


  // Delete Driver  data
export const deleteDriver = async (driverId) => {
    console.log(driverId)
    try {
      const response = await apiClient.post("/delete_Drivermaster/", {
        "driver_master_id": driverId
      });
      return response.data;
      //console.log(response.data)
    } catch (error) {
      throw error;
    }
  };


