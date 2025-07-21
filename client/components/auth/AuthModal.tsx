import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup";
}

export default function AuthModal({ isOpen, onClose, defaultMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const { signIn, signUp, state } = useAuth();

  const handleSignIn = async (email: string, password: string) => {
    await signIn(email, password);
    onClose();
  };

  const handleSignUp = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    await signUp(userData);
    onClose();
  };

  const handleClose = () => {
    if (!state.isLoading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </DialogTitle>
        </DialogHeader>
        
        {mode === "signin" ? (
          <SignInForm
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setMode("signup")}
            loading={state.isLoading}
          />
        ) : (
          <SignUpForm
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setMode("signin")}
            loading={state.isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
