import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, User, ShieldAlert } from "lucide-react";
import AuthModal from "./auth/AuthModal";
import { useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  fallback,
  redirectTo 
}: ProtectedRouteProps) {
  const { state } = useAuth();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!state.isAuthenticated) {
    if (redirectTo) {
      return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    if (fallback) {
      return <>{fallback}</>;
    }

    // Default fallback component
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-t-lg">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Connexion Requise</CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <ShieldAlert className="w-12 h-12 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Accès Protégé
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Cette fonctionnalité nécessite une connexion à votre compte Congo Food.
                Connectez-vous pour accéder à vos commandes, réservations et bien plus.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3 text-lg"
              >
                <User className="w-5 h-5 mr-2" />
                Se Connecter
              </Button>

              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
              >
                Retour
              </Button>
            </div>
          </CardContent>
        </Card>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="signin"
        />
      </div>
    );
  }

  return <>{children}</>;
}
