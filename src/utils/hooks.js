import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    //const navigate = useNavigate();
    const logout = () => {
        window.location.href = '/'
    }
    return logout;
}