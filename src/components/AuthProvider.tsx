import { UserType } from "@/types/userType";
import { createContext, useState } from "react";
import { useContext } from "react";

interface Auth {
  auth: UserType | null;
  setAuth: React.Dispatch<React.SetStateAction<UserType | null>>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<Auth>({
  auth: null,
  setAuth: () => {},
});

function getLocaluser() {
  const auth = localStorage.getItem("threads_userdata");
  const token = localStorage.getItem("token");
  if (auth && token) {
    return JSON.parse(auth);
  }
  // return (window.location.href = "/login");
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState(getLocaluser());

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};
