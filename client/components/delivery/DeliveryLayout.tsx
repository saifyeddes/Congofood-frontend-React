import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Package,
  MapPin,
  History,
  User,
  Settings,
  Menu,
  X,
  LogOut,
  Home,
  Truck,
  Navigation,
  Clock,
  Phone,
  Star,
  Activity,
  Zap
} from "lucide-react";

interface DeliveryLayoutProps {
  children: ReactNode;
}

export default function DeliveryLayout({ children }: DeliveryLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Mock driver data - in real app this would come from auth context
  const driverData = {
    name: "Jacques Tshisekedi",
    rating: 4.8,
    completedToday: 12,
    onlineTime: "6h 30min",
    earnings: 125.50,
    status: "available", // available, busy, offline
    currentLocation: "Av. Lumumba, Gombe"
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/delivery",
      badge: null
    },
    {
      icon: Package,
      label: "Commandes à Livrer",
      href: "/delivery/orders",
      badge: "3"
    },
    {
      icon: MapPin,
      label: "Carte & Navigation",
      href: "/delivery/map",
      badge: null
    },
    {
      icon: History,
      label: "Historique",
      href: "/delivery/history",
      badge: null
    },
    {
      icon: User,
      label: "Mon Profil",
      href: "/delivery/profile",
      badge: null
    },
    {
      icon: Settings,
      label: "Paramètres",
      href: "/delivery/settings",
      badge: null
    }
  ];

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "busy": return "bg-orange-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available": return "Disponible";
      case "busy": return "En Livraison";
      case "offline": return "Hors Ligne";
      default: return "Inconnu";
    }
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
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-all duration-500 ease-out lg:shadow-xl border-r border-gray-200/50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full blur-3xl"></div>
          </div>

          {/* Header Section */}
          <div className="relative z-10 p-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-black">Congo Food</h1>
                  <p className="text-blue-200 text-sm font-medium">Interface Livreur</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:bg-white/20 rounded-xl p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Status Badge */}
            <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(driverData.status)} animate-pulse shadow-lg`} />
                  <span className="text-white font-bold">{getStatusLabel(driverData.status)}</span>
                </div>
                <div className="flex items-center space-x-2 bg-yellow-400/20 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  <span className="text-yellow-100 font-bold text-sm">{driverData.rating}</span>
                </div>
              </div>
              <div className="text-blue-100 text-sm flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{driverData.currentLocation}</span>
              </div>
            </div>
          </div>

          {/* Driver Profile Section */}
          <div className="relative z-10 px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200/50 flex-shrink-0">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">
                  {driverData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{driverData.name}</h3>
                <p className="text-blue-600 text-sm font-medium">Livreur Professionnel</p>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
                <div className="text-xs text-gray-500 font-medium">Livraisons</div>
                <div className="text-2xl font-black text-blue-600">{driverData.completedToday}</div>
                <div className="text-xs text-green-600">+2 depuis hier</div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100">
                <div className="text-xs text-gray-500 font-medium">Gains</div>
                <div className="text-2xl font-black text-green-600">${driverData.earnings}</div>
                <div className="text-xs text-blue-600">Aujourd'hui</div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-4">Navigation</h4>
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`
                      group flex items-center justify-between w-full px-4 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 animate-in slide-in-from-left
                      ${isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-white/20'
                          : 'bg-gray-100 group-hover:bg-blue-100'
                      }`}>
                        <item.icon className={`w-5 h-5 ${
                          isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                        }`} />
                      </div>
                      <span className="font-bold">{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        className={`text-xs font-bold animate-pulse min-w-[24px] h-6 ${
                          isActive
                            ? 'bg-white/25 text-white border-white/30'
                            : 'bg-red-500 text-white border-0'
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="relative z-10 px-6 py-4 bg-gray-50 border-t border-gray-200/50 flex-shrink-0">
            <div className="space-y-4">
              {/* Online Time */}
              <div className="flex items-center justify-center space-x-3 bg-green-50 rounded-xl p-3 border border-green-200">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-sm font-bold text-green-700">En ligne: {driverData.onlineTime}</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl"
                >
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Site
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-xl"
                >
                  <a href="tel:+243123456789">
                    <Phone className="w-4 h-4 mr-2" />
                    Support
                  </a>
                </Button>
              </div>

              {/* Logout Button */}
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50 font-bold rounded-xl py-3"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion Sécurisée
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-blue-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-blue-600 hover:bg-blue-50"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="hidden lg:block">
                <h2 className="text-xl font-semibold text-gray-800">
                  {menuItems.find(item => item.href === location.pathname)?.label || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-600">
                  Gérez vos livraisons efficacement
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 bg-blue-50 rounded-full px-4 py-2">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Prêt pour livraison
                </span>
              </div>
              
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Changer Status
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="animate-in fade-in-50 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
