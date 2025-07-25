import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Calendar, Heart } from "lucide-react";

interface SignUpFormProps {
  onSignUp: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    dateOfBirth: string;
    gender: string;
    preferences: string;
    emergencyContact: string;
    emergencyPhone: string;
  }) => Promise<void>;
  onSwitchToSignIn: () => void;
  loading?: boolean;
}

export default function SignUpForm({ onSignUp, onSwitchToSignIn, loading = false }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    preferences: "",
    emergencyContact: "",
    emergencyPhone: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Prénom requis";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Nom de famille requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Numéro de téléphone requis";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Veuillez entrer un numéro valide";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Adresse requise";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date de naissance requise";
    }

    if (!formData.gender) {
      newErrors.gender = "Genre requis";
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Contact d'urgence requis";
    }

    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = "Téléphone d'urgence requis";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mot de passe minimum 6 caractères";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    if (!acceptTerms) {
      newErrors.terms = "Vous devez accepter les conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSignUp({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        preferences: formData.preferences,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone
      });
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : "Inscription échouée" });
    }
  };

  return (
    <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
      <CardHeader className="text-center flex-shrink-0">
        <CardTitle className="text-2xl">Créer un Compte</CardTitle>
        <CardDescription>
          Rejoignez Congo Food pour commander plus rapidement
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <CardContent className="space-y-4 overflow-y-auto flex-1 px-6">
          {errors.general && (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          {/* Section 1: Informations personnelles */}
          <div className="bg-emerald-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-emerald-800 mb-4">Informations Personnelles</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="firstName"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={`pl-10 ${errors.firstName ? 'border-destructive' : ''}`}
                    disabled={loading}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom de famille *</Label>
                <Input
                  id="lastName"
                  placeholder="Votre nom de famille"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={errors.lastName ? 'border-destructive' : ''}
                  disabled={loading}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date de naissance *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className={`pl-10 ${errors.dateOfBirth ? 'border-destructive' : ''}`}
                    disabled={loading}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Genre *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className={errors.gender ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Sélectionnez votre genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homme">Homme</SelectItem>
                    <SelectItem value="femme">Femme</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Contact */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Informations de Contact</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="phone"
                    placeholder="+243 123 456 789"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                    disabled={loading}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse complète *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                  <Textarea
                    id="address"
                    placeholder="Votre adresse complète de livraison"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={`pl-10 ${errors.address ? 'border-destructive' : ''} min-h-[80px]`}
                    disabled={loading}
                  />
                </div>
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Contact d'urgence */}
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-orange-800 mb-4">Contact d'Urgence</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Nom du contact d'urgence *</Label>
                <Input
                  id="emergencyContact"
                  placeholder="Nom de votre contact d'urgence"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  className={errors.emergencyContact ? 'border-destructive' : ''}
                  disabled={loading}
                />
                {errors.emergencyContact && (
                  <p className="text-sm text-destructive">{errors.emergencyContact}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Téléphone d'urgence *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="emergencyPhone"
                    placeholder="+243 987 654 321"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    className={`pl-10 ${errors.emergencyPhone ? 'border-destructive' : ''}`}
                    disabled={loading}
                  />
                </div>
                {errors.emergencyPhone && (
                  <p className="text-sm text-destructive">{errors.emergencyPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Préférences */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Préférences Alimentaires</h3>

            <div className="space-y-2">
              <Label htmlFor="preferences">Préférences alimentaires, allergies (optionnel)</Label>
              <div className="relative">
                <Heart className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                <Textarea
                  id="preferences"
                  placeholder="Ex: Végétarien, allergique aux noix, préfère épicé, etc."
                  value={formData.preferences}
                  onChange={(e) => handleInputChange("preferences", e.target.value)}
                  className="pl-10 min-h-[80px]"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Section 5: Sécurité */}
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Sécurité du Compte</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Créer un mot de passe"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmer votre mot de passe"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(!!checked)}
              disabled={loading}
            />
            <Label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I agree to the{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Terms & Conditions
              </Button>{" "}
              and{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Privacy Policy
              </Button>
            </Label>
          </div>
          {errors.terms && (
            <p className="text-sm text-destructive">{errors.terms}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto"
              onClick={onSwitchToSignIn}
              disabled={loading}
            >
              Sign in
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
