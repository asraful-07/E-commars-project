import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;

// import axios from "axios";
// import { useEffect } from "react";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true,
// });

// const useAxiosSecure = () => {
//   const navigate = useNavigate();
//   const { handleLogout } = UseAuth();
//   useEffect(() => {
//     axiosSecure.interceptors.response.use(
//       (res) => {
//         return res;
//       },
//       async (error) => {
//         console.log("Error caught from axios interceptor-->", error.response);
//         if (error.response.status === 401 || error.response.status === 403) {
//           // logout
//           handleLogout();
//           // navigate to login
//           navigate("/login");
//           console.log("hello");
//         }
//         return Promise.reject(error);
//       }
//     );
//   }, [handleLogout, navigate]);
//   return axiosSecure;
// };

// export default useAxiosSecure;
