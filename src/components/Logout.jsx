import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = () => {
  dispatch(logout());
  navigate("/login", { replace: true }); 
};
