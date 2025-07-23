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
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white/90 backdrop-blur-xl border-r border-blue-200 shadow-xl transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Congo Food</h1>
                  <p className="text-blue-100 text-sm">Interface Livreur</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Driver Status */}
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(driverData.status)} animate-pulse`} />
                  <span className="text-sm font-medium">{getStatusLabel(driverData.status)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{driverData.rating}</span>
                </div>
              </div>
              <div className="text-xs text-blue-100">
                📍 {driverData.currentLocation}
              </div>
            </div>
          </div>

          {/* Driver Info */}
          <div className="p-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-lg">
                  {driverData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{driverData.name}</p>
                <p className="text-xs text-gray-600">Livreur Congo Food</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-2 shadow-sm border border-blue-100">
                <div className="text-xs text-gray-500">Aujourd'hui</div>
                <div className="font-bold text-blue-600">{driverData.completedToday}</div>
              </div>
              <div className="bg-white rounded-lg p-2 shadow-sm border border-blue-100">
                <div className="text-xs text-gray-500">Gains</div>
                <div className="font-bold text-green-600">${driverData.earnings}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`
                      flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs animate-bounce ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'}`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-blue-100 space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>En ligne: {driverData.onlineTime}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button asChild variant="outline" size="sm" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Site Client
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <a href="tel:+243123456789">
                  <Phone className="w-4 h-4" />
                </a>
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
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
