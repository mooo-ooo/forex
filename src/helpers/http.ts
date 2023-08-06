import axios from "axios";
console.log(process.env)
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
// axios.interceptors.request.use(function (config) {
//   const user = localStorage.getItem('user');
//   if (user) {
//     config.headers.Authorization = `Bearer ${JSON.parse(user).accessToken}`;
//   }
  
   
//   return config;
// });
export default axios