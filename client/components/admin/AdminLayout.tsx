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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="text-center space-y-8 max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-black text-gray-900">Accès Refusé</h1>
            <p className="text-gray-600 leading-relaxed">
              Vous n'avez pas les permissions administrateur nécessaires pour accéder à cette zone sécurisée.
            </p>
          </div>
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Button>
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
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl transform transition-all duration-500 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full blur-3xl"></div>
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">C</span>
              </div>
              <div>
                <h1 className="text-xl font-black text-white">Congo Food</h1>
                <div className="flex items-center space-x-2">
                  <Crown className="w-3 h-3 text-yellow-400" />
                  <p className="text-xs text-gray-300 font-medium">Administration</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="relative z-10 p-6 border-b border-white/10">
            <div className="flex items-center space-x-4 bg-white/5 rounded-2xl p-4 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">
                  {state.user?.firstName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-white font-bold">
                  {state.user?.firstName} {state.user?.lastName}
                </p>
                <div className="flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <p className="text-xs text-gray-300">Super Administrateur</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="relative z-10 flex-1 p-6">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`
                      group flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 animate-in slide-in-from-left
                      ${isActive
                        ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-300 hover:text-white hover:bg-white/10 hover:transform hover:scale-105'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform duration-300'}`} />
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge className="bg-red-500 text-white border-0 animate-pulse">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Quick Actions */}
          <div className="relative z-10 p-6 border-t border-white/10 space-y-3">
            <Button
              asChild
              variant="outline"
              className="w-full justify-start bg-white/5 border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-3" />
                Voir le Site Web
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-300"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Déconnexion Sécurisée
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden bg-white/50 hover:bg-white/80 border border-gray-200/50"
              >
                <Menu className="w-5 h-5" />
              </Button>

              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600">
                  Tableau de bord administrateur actif
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 px-3 py-1">
                <Activity className="w-3 h-3 mr-1" />
                En ligne
              </Badge>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30">
          <div className="animate-in fade-in duration-1000">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
