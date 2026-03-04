import { useDispatch } from "react-redux";
import { clearToken } from "../server/auth.actions"
import { logoutAction, setAuthInfo } from "../store/auth.slice";
import { useRouter } from "next/navigation";

export default function useLogout(){
    const dispatch = useDispatch();
    const router = useRouter();

    const logout = async ()=> {
        await clearToken();

        // dispatch(setAuthInfo({ isAuthenticated: false , userInfo: null}));
        dispatch(logoutAction());

        router.push("/login");
        router.refresh();
    };

    return{logout}
}