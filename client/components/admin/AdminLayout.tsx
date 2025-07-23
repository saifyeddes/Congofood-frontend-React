import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Truck,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Home,
  UserPlus,
  ChefHat,
  MapPin,
  Shield,
  Crown,
  Activity
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est admin
  if (state.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Accès Refusé</h1>
          <p className="text-muted-foreground">Vous n'avez pas les permissions pour accéder à cette page.</p>
          <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/admin",
      badge: null
    },
    {
      icon: Package,
      label: "Catégories",
      href: "/admin/categories",
      badge: null
    },
    {
      icon: ChefHat,
      label: "Plats",
      href: "/admin/dishes",
      badge: null
    },
    {
      icon: ShoppingBag,
      label: "Commandes",
      href: "/admin/orders",
      badge: "12"
    },
    {
      icon: Truck,
      label: "Livraisons",
      href: "/admin/deliveries",
      badge: "5"
    },
    {
      icon: MapPin,
      label: "Livreurs",
      href: "/admin/drivers",
      badge: null
    },
    {
      icon: Users,
      label: "Clients",
      href: "/admin/customers",
      badge: null
    },
    {
      icon: UserPlus,
      label: "Administrateurs",
      href: "/admin/admins",
      badge: null
    },
    {
      icon: Settings,
      label: "Paramètres",
      href: "/admin/settings",
      badge: null
    }
  ];

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Congo Food</h1>
                <p className="text-xs text-muted-foreground">Administration</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {state.user?.firstName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {state.user?.firstName} {state.user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground">Administrateur</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`
                      flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Voir le Site
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Connecté en tant qu'administrateur
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
