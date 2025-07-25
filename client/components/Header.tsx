import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  Menu,
  X,
  Phone,
  User,
  LogOut,
  Settings,
  Search,
  Calendar,
  Clock,
  Receipt,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./auth/AuthModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { state } = useCart();
  const { state: authState, signOut } = useAuth();
  const location = useLocation();

  const handleSignInClick = () => {
    setAuthMode("signin");
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-black text-xl">C</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Congo Food
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Saveurs Authentiques • Livraison Express
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { to: "/", label: "Accueil" },
              { to: "/menu", label: "Menu" },
              { to: "/restaurants", label: "Restaurants" },
              { to: "/reservations", label: "Réserver" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  location.pathname === link.to
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300 rounded-xl px-4 py-2"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline font-medium">
                +243 123 456 789
              </span>
            </Button>
            {authState.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 rounded-xl px-4 py-2 transition-all duration-300"
                  >
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="hidden lg:inline font-medium text-gray-700">
                      {authState.user?.firstName}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 border-0 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl"
                >
                  <DropdownMenuItem
                    asChild
                    className="rounded-xl m-1 hover:bg-emerald-50"
                  >
                    <Link to="/profile">
                      <User className="w-4 h-4 mr-2" />
                      Mon Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="rounded-xl m-1 hover:bg-blue-50"
                  >
                    <Link to="/order-history">
                      <Receipt className="w-4 h-4 mr-2" />
                      Mes Commandes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="rounded-xl m-1 hover:bg-purple-50"
                  >
                    <Link to="/order-tracking">
                      <Clock className="w-4 h-4 mr-2" />
                      Suivi Commande
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl m-1 hover:bg-gray-50">
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="rounded-xl m-1 hover:bg-red-50 text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignInClick}
                className="bg-gradient-to-r from-emerald-50 to-blue-50 hover:from-emerald-100 hover:to-blue-100 border border-emerald-200/50 text-gray-700 rounded-xl px-4 py-2 transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline font-medium">Connexion</span>
              </Button>
            )}
            <Button
              asChild
              className="relative bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0 rounded-xl px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Link to="/cart">
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline font-medium">Panier</span>
                {state.totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-xs p-0 bg-red-500 text-white border-2 border-white rounded-full animate-pulse">
                    {state.totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Button
              asChild
              className="relative bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0 rounded-xl p-2 shadow-lg"
            >
              <Link to="/cart">
                <ShoppingCart className="w-5 h-5" />
                {state.totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs p-0 bg-red-500 text-white border-2 border-white rounded-full animate-pulse">
                    {state.totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-2 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-200/50 bg-gradient-to-b from-white to-gray-50/50 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-2 px-2">
              {[
                { to: "/", label: "Accueil" },
                { to: "/menu", label: "Menu" },
                { to: "/restaurants", label: "Restaurants" },
                { to: "/reservations", label: "Réserver" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    location.pathname === link.to
                      ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-200/50 space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-gray-700 rounded-xl py-3"
                >
                  <Phone className="w-4 h-4 mr-3" />
                  +243 123 456 789
                </Button>

                {authState.isAuthenticated ? (
                  <>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-700 rounded-xl py-3"
                    >
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <User className="w-4 h-4 mr-3" />
                        {authState.user?.firstName} {authState.user?.lastName}
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 text-gray-700 rounded-xl py-3"
                    >
                      <Link
                        to="/order-history"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Receipt className="w-4 h-4 mr-3" />
                        Mes Commandes
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-gray-700 rounded-xl py-3"
                    >
                      <Link
                        to="/order-tracking"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Clock className="w-4 h-4 mr-3" />
                        Suivi Commande
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-600 rounded-xl py-3"
                      onClick={signOut}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start bg-gradient-to-r from-emerald-50 to-blue-50 hover:from-emerald-100 hover:to-blue-100 text-gray-700 rounded-xl py-3"
                      onClick={handleSignInClick}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Connexion
                    </Button>
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-xl py-3 shadow-lg"
                      onClick={handleSignUpClick}
                    >
                      Créer un compte
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </header>
  );
}
