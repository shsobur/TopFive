import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          logOut()
            .then(() => {
              navigate("/");

              Swal.fire({
                icon: "error",
                title: "Warning",
                text: "Something went wrong!. You are trying to unauthorize access",
                footer:
                  '<a href="https://www.brightsec.com/blog/unauthorized-access-risks-examples-and-6-defensive-measures/" target="main"><u>Why do I have this issue?</u></a>',
              });
            })
            .catch(() => {
              // console.log(error);
            });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;