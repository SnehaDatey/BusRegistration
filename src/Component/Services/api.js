
import axios from 'axios';

const API_BASE_URL = 'http://3.109.124.47:8000/'; 

//const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
  },
});

// Login function
export const login = async (email, password, firebase_token = "", access_url = "localhost") => {
  try {
    const response = await apiClient.post('/user_login/', {
      email,
      password,
      firebase_token,
      access_url,
    });
    return response.data; // Return response data
  } catch (error) {
    throw error; // Let the component handle the error
  }
};


// Function to save or update bus data
export const saveOrUpdateBus = async (busDetails) => {
  try {
    const response = await apiClient.post('/Bus_data_saveUpdate_api/', busDetails);
    return response.data; // Return response data
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('API error response:', error.response.data);
      console.error('Status code:', error.response.status);
    } else {
      // Network error or something else
      console.error('Error message:', error.message);
    }
    throw error; // Let the component handle the error
  
  }
};

// New function to fetch bus master data
export const fetchBusMasterData = async () => {
  try {
    const response = await apiClient.post('/get_Busmaster_data/', {
      "school_id": 770
     });
    return response.data; // Return response data
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('API error response:', error.response.data);
      console.error('Status code:', error.response.status);
    } else {
      // Network error or something else
      console.error('Error message:', error.message);
    }
    throw error; // Let the component handle the error
  }
};


// Delete bus data
export const deleteBus = async (busId) => {
 
  const url =  await apiClient.post("/delete_BusMaster_data/" ,{
    "bus_registration_id": busId
   });
  const response = await axios.post(url);
  return response.data;
};

export default apiClient;
