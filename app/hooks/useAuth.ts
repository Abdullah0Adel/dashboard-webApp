// hooks/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { logout } from "../store/features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => dispatch(logout());

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token,
    logout: handleLogout,
  };
};