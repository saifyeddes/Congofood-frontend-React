import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChefHat,
  Calendar,
  ShoppingBag,
  BarChart3,
  Menu as MenuIcon,
  MapPin,
  Settings,
  X,
  Clock,
  CheckCircle,
  Activity,
  Users,
  UtensilsCrossed,
  BookOpen,
  TrendingUp,
  Target,
  Home,
} from "lucide-react";

export default function RestaurantLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/resto",
      icon: Home,
      description: "Vue d'ensemble et statistiques",
      badge: null,
    },
    {
      title: "Réservations",
      href: "/resto/reservations",
      icon: Calendar,
      description: "Gérer les réservations de tables",
      badge: "3 en attente",
    },
    {
      title: "Commandes",
      href: "/resto/orders",
      icon: ShoppingBag,
      description: "Suivi et gestion des commandes",
      badge: "5 actives",
    },
    {
      title: "Menu & Catalogue",
      href: "/resto/menu",
      icon: UtensilsCrossed,
      description: "Gérer le menu et catalogue",
      badge: null,
    },
    {
      title: "Localisation Client",
      href: "/resto/tracking",
      icon: MapPin,
      description: "Localiser les clients",
      badge: null,
    },
    {
      title: "Statistiques",
      href: "/resto/analytics",
      icon: BarChart3,
      description: "Analytics détaillées",
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-orange-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="h-20 bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-between px-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Congo Food</h1>
              <p className="text-orange-100 text-sm font-medium">
                Interface Restaurant
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation Header */}
        <div className="p-6 border-b border-orange-100">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">
              Gestion Restaurant
            </h2>
            <p className="text-sm text-gray-600">
              Gérez vos réservations, commandes et menu
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "block w-full p-4 rounded-2xl transition-all duration-300 group hover:scale-105 transform",
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                    : "hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 text-gray-700 hover:text-orange-700",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      className={cn(
                        "text-xs font-bold",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-orange-500 text-white",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <p
                  className={cn(
                    "text-sm ml-13",
                    isActive ? "text-orange-100" : "text-gray-500",
                  )}
                >
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-orange-100">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Service Premium</h3>
            <p className="text-sm text-gray-600 mb-3">
              Optimisez vos opérations restaurant
            </p>
            <Button
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Top Bar */}
        <div className="h-20 bg-white/95 backdrop-blur-xl border-b border-orange-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-orange-600 hover:bg-orange-100"
            >
              <MenuIcon className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Restaurant Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500 text-white animate-pulse">
                <Activity className="w-3 h-3 mr-1" />
                Restaurant Ouvert
              </Badge>
              <Badge className="bg-blue-500 text-white">
                <Clock className="w-3 h-3 mr-1" />
                8h - 22h
              </Badge>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
