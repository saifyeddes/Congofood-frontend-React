import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

interface SignInFormProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSwitchToSignUp: () => void;
  loading?: boolean;
}

export default function SignInForm({ onSignIn, onSwitchToSignUp, loading = false }: SignInFormProps) {
  const [email, setEmail] = useState("client@client.com");
  const [password, setPassword] = useState("client@client.com");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSignIn(email, password);
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : "Sign in failed" });
    }
  };

  return (
    <Card className="w-full max-w-md max-h-[90vh] flex flex-col">
      <CardHeader className="text-center flex-shrink-0">
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>
          Connectez-vous à votre compte Congo Food
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <CardContent className="space-y-6 overflow-y-auto flex-1 px-6">
          {errors.general && (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          {/* Section Connexion */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Informations de Connexion</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de Passe *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="text-right">
                <Button variant="link" className="text-sm p-0 h-auto text-blue-600 hover:text-blue-700">
                  Mot de passe oublié ?
                </Button>
              </div>
            </div>
          </div>

          {/* Section Aide */}
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">Besoin d'aide ?</h4>
            <p className="text-sm text-emerald-700 mb-3">
              Si vous n'avez pas encore de compte, vous pouvez en créer un gratuitement.
            </p>
            <div className="space-y-2 text-xs text-emerald-600">
              <p>• Accès à toutes vos commandes et réservations</p>
              <p>• Programme de fidélité et points bonus</p>
              <p>• Suivi en temps réel de vos livraisons</p>
              <p>• Adresses de livraison sauvegardées</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 flex-shrink-0 border-t bg-gray-50/50">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3 text-lg"
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se Connecter"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Vous n'avez pas de compte ?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-emerald-600 hover:text-emerald-700"
              onClick={onSwitchToSignUp}
              disabled={loading}
            >
              Créer un compte
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
