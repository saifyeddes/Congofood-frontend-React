import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "client" | "admin" | "driver";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction = 
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SIGN_IN_SUCCESS"; payload: User }
  | { type: "SIGN_OUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> };

const AuthContext = createContext<{
  state: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  signOut: () => void;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    
    case "SIGN_OUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("foodie_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: "SIGN_IN_SUCCESS", payload: user });
      } catch (error) {
        localStorage.removeItem("foodie_user");
      }
    }
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      if (email === "admin@admin.com" && password === "admin@admin.com") {
        const user: User = {
          id: "admin",
          firstName: "Admin",
          lastName: "Congo Food",
          email: "admin@admin.com",
          phone: "+243 (0) 123-456-789",
          role: "admin"
        };

        localStorage.setItem("foodie_user", JSON.stringify(user));
        dispatch({ type: "SIGN_IN_SUCCESS", payload: user });
      } else if (email === "driver" && password === "driver") {
        const user: User = {
          id: "driver1",
          firstName: "Jacques",
          lastName: "Tshisekedi",
          email: "jacques.tshisekedi@congofood.com",
          phone: "+243 (0) 111-222-333",
          role: "driver"
        };

        localStorage.setItem("foodie_user", JSON.stringify(user));
        dispatch({ type: "SIGN_IN_SUCCESS", payload: user });
      } else if (email === "demo@congofood.com" && password === "password") {
        const user: User = {
          id: "1",
          firstName: "Demo",
          lastName: "User",
          email: "demo@congofood.com",
          phone: "+243 (0) 123-456-789",
          role: "client"
        };
        
        localStorage.setItem("foodie_user", JSON.stringify(user));
        dispatch({ type: "SIGN_IN_SUCCESS", payload: user });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  const signUp = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user creation - in real app, this would be an API call
      const user: User = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        role: "client"
      };
      
      localStorage.setItem("foodie_user", JSON.stringify(user));
      dispatch({ type: "SIGN_IN_SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  const signOut = (): void => {
    localStorage.removeItem("foodie_user");
    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <AuthContext.Provider value={{ state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
