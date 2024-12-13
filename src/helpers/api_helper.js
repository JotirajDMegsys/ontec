import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_BASE_URL} from './enum';

// axios.defaults.baseURL = process.env.APP_URL;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const setAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    // console.log('accessToken----', accessToken)
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    } else {
      // Handle the case when there is no access token
      console.warn('No access token found');
    }
  } catch (error) {
    console.error('Error retrieving access token from AsyncStorage:', error);
  }
};

class APIClient {
  //*get
  get = async (endPoints, params) => {
    //    console.log("hii")
    await setAccessToken();
    return axios.get(endPoints);
  };

  //*post
  // create = async (endPoints, data) => {
  //     await setAccessToken();
  //      return axios.post(endPoints, data);
  // };

  create = async (endPoints, data) => {
    await setAccessToken();
    try {
      const response = await axios.post(endPoints, data);
      return response;
    } catch (error) {
      console.log('Error in create function:', error);
      throw error; // Throw the error to be caught by the caller
    }
  };

  //*update
  update = async (endPoints, data) => {
    await setAccessToken();
    return axios.patch(endPoints, data);
  };

  //*put
  put = async (endPoints, data) => {
    await setAccessToken();
    return axios.put(endPoints, data);
  };

  //* Delete
  delete = async (endPoints, config) => {
    await setAccessToken();
    return axios.delete(endPoints, {...config});
  };
}

axios.interceptors.response.use(
  response => {
    // console.log("11111111111");
    return response.data;
  },
  function (error) {
    // console.log("22222222222", error);
    if (error.AxiosError) {
      return Promise.reject('Server not responding! Please try later.');
    } else if (error.response.status === 400) {
      console.log('33333333333', error.response.data);
      // router.push('/login')
      return Promise.reject(error.response.data);
    } else if (error.response.status === 500) {
      return Promise.reject('Server not respoinding');
    } else if (error.response.status === 401) {
      return Promise.reject('You are not authorized');
    }
    console.log('444444444');
    return Promise.reject(error);
  },
);

// Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // console.log('response.data----', response.data)
//     return response.data;
// }, function (error) {
//     console.log('error----', error)
//     console.log('error----111', error.response.data)
//     // console.log("error in api helper");
//     // const responseData = error.response.data;
//     return Promise.reject(error.response.data);
// }
// );

export {APIClient};

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { API_BASE_URL } from './enum';

// axios.defaults.baseURL = API_BASE_URL;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// // Function to set the access token in axios headers
// const setAccessToken = async () => {
//     try {
//         const accessToken = await AsyncStorage.getItem('accessToken');
//         if (accessToken) {
//             axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
//         } else {
//             console.warn('No access token found');
//         }
//     } catch (error) {
//         console.error('Error retrieving access token from AsyncStorage:', error);
//     }
// };

// class APIClient {
//     //* GET request
//     get = async (endPoints, params) => {
//         await setAccessToken();
//         return axios.get(endPoints, { params });
//     };

//     //* POST request
//     create = async (endPoints, data) => {
//         console.log('Requesting POST:', endPoints, data);
//         await setAccessToken();
//         try {
//             const response = await axios.post(endPoints, data);
//             return response;
//         } catch (error) {
//             console.log('Error in create function:', error);
//             if (error.response) {
//                 console.error('Response data:', error.response.data);
//             }
//             throw error; // Rethrow the error for further handling
//         }
//     };

//     //* PATCH request
//     update = async (endPoints, data) => {
//         await setAccessToken();
//         return axios.patch(endPoints, data);
//     };

//     //* PUT request
//     put = async (endPoints, data) => {
//         await setAccessToken();
//         return axios.put(endPoints, data);
//     };

//     //* DELETE request
//     delete = async (endPoints, config) => {
//         await setAccessToken();
//         return axios.delete(endPoints, { ...config });
//     };
// }

// // Axios response interceptor for error handling
// axios.interceptors.response.use(
//     response => response.data,
//     function (error) {
//         if (!error.response) {
//             console.warn("Network error or server not responding");
//             return Promise.reject("Server not responding! Please try later.");
//         }

//         switch (error.response.status) {
//             case 400:
//                 console.log("Bad request:", error.response.data);
//                 return Promise.reject(error.response.data);
//             case 401:
//                 console.warn("Unauthorized access");
//                 return Promise.reject("You are not authorized");
//             case 500:
//                 console.error("Server error:", error.response.data);
//                 return Promise.reject("Server not responding");
//             default:
//                 return Promise.reject(error);
//         }
//     }
// );

// export { APIClient };
