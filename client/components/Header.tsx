import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ShoppingCart, Menu, X, Phone, User, LogOut, Settings } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./auth/AuthModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { state } = useCart();
  const { state: authState, signOut } = useAuth();

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
              <p className="text-sm text-gray-600 font-medium">Saveurs Authentiques • Livraison Express</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/menu" className="text-foreground hover:text-primary transition-colors">
              Menu
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground">
              <Phone className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Call Now</span>
            </Button>
            {authState.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden lg:inline">{authState.user?.firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleSignInClick}>
                <User className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Sign In</span>
              </Button>
            )}
            <Button asChild variant="outline" size="sm" className="relative">
              <Link to="/cart">
                <ShoppingCart className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">Panier</span>
                {state.totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs p-0"
                  >
                    {state.totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button asChild variant="outline" size="sm" className="relative">
              <Link to="/cart">
                <ShoppingCart className="w-4 h-4" />
                {state.totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-xs p-0"
                  >
                    {state.totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full justify-start mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                {authState.isAuthenticated ? (
                  <>
                    <Button variant="ghost" size="sm" className="w-full justify-start mb-2">
                      <User className="w-4 h-4 mr-2" />
                      {authState.user?.firstName} {authState.user?.lastName}
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="w-full justify-start mb-2" onClick={handleSignInClick}>
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleSignUpClick}>
                      Sign Up
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
