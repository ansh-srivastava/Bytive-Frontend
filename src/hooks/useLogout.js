import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");
    setTimeout(() => {
      navigate("/");
    }, 1500);

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
