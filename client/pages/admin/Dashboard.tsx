import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Truck,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Activity,
  Zap,
  Crown,
  Sparkles,
  BarChart3,
  MapPin,
  Phone
} from "lucide-react";

export default function Dashboard() {
  // Mock data - in real app this would come from API
  const stats = {
    totalOrders: 156,
    activeDeliveries: 12,
    totalCustomers: 1234,
    revenue: 15420.50,
    ordersToday: 23,
    completedToday: 18,
    pendingOrders: 8,
    availableDrivers: 6
  };

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Jean Mukendi",
      items: ["Moambé au Poulet", "Fufu na Ndakala"],
      total: 28.98,
      status: "en_cours",
      time: "14:30",
      address: "Av. Lumumba, Kinshasa"
    },
    {
      id: "ORD-002", 
      customer: "Marie Kabila",
      items: ["Saka-Saka aux Crevettes"],
      total: 16.99,
      status: "pret",
      time: "14:25",
      address: "Commune de Gombe"
    },
    {
      id: "ORD-003",
      customer: "Pierre Mbuyi",
      items: ["Liboke de Porc", "Bili na Madesu"],
      total: 30.98,
      status: "livre",
      time: "13:45",
      address: "Av. des Poids Lourds"
    }
  ];

  const activeDeliveries = [
    {
      id: "LIV-001",
      driver: "Jacques Tshisekedi",
      order: "ORD-001",
      customer: "Jean Mukendi",
      status: "en_route",
      estimatedTime: "15 min",
      phone: "+243 123 456 789"
    },
    {
      id: "LIV-002",
      driver: "Serge Kabongo",
      order: "ORD-004",
      customer: "Fatou Konate",
      status: "collecte",
      estimatedTime: "5 min",
      phone: "+243 987 654 321"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "en_cours":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En Cours</Badge>;
      case "pret":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Prêt</Badge>;
      case "livre":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Livré</Badge>;
      case "en_route":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">En Route</Badge>;
      case "collecte":
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Collecte</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 rounded-3xl p-8 overflow-hidden animate-in fade-in duration-1000">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900">Dashboard Administrateur</h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-green-500 text-white border-0 px-4 py-1 animate-pulse">
                      <Activity className="w-3 h-3 mr-2" />
                      Système Actif
                    </Badge>
                    <p className="text-gray-600 font-medium">
                      {new Date().toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                asChild
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 px-6 py-3 font-semibold"
              >
                <Link to="/admin/orders">
                  <Eye className="w-5 h-5 mr-2" />
                  Voir Commandes
                </Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to="/admin/dishes">
                  <Plus className="w-5 h-5 mr-2" />
                  Nouveau Plat
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Commandes Totales",
              value: stats.totalOrders,
              change: `+${stats.ordersToday} aujourd'hui`,
              icon: ShoppingBag,
              color: "from-blue-500 to-indigo-500",
              bgColor: "from-blue-50 to-indigo-50",
              textColor: "text-blue-600"
            },
            {
              title: "Livraisons Actives",
              value: stats.activeDeliveries,
              change: `${stats.availableDrivers} livreurs disponibles`,
              icon: Truck,
              color: "from-emerald-500 to-green-500",
              bgColor: "from-emerald-50 to-green-50",
              textColor: "text-emerald-600"
            },
            {
              title: "Clients Total",
              value: stats.totalCustomers.toLocaleString(),
              change: "+12% ce mois",
              icon: Users,
              color: "from-purple-500 to-pink-500",
              bgColor: "from-purple-50 to-pink-50",
              textColor: "text-purple-600"
            },
            {
              title: "Chiffre d'Affaires",
              value: `$${stats.revenue.toFixed(2)}`,
              change: "+8.2% ce mois",
              icon: DollarSign,
              color: "from-orange-500 to-red-500",
              bgColor: "from-orange-50 to-red-50",
              textColor: "text-orange-600"
            }
          ].map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden bg-white animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                <div className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 mb-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600 mb-1">{stat.title}</div>
                      <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 ${stat.textColor} font-semibold`}>
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Commandes en Attente",
              value: stats.pendingOrders,
              subtitle: "À traiter immédiatement",
              icon: Clock,
              color: "from-yellow-500 to-orange-500",
              bgColor: "from-yellow-50 to-orange-50",
              urgent: true
            },
            {
              title: "Complétées Aujourd'hui",
              value: stats.completedToday,
              subtitle: `Sur ${stats.ordersToday} commandes`,
              icon: CheckCircle,
              color: "from-green-500 to-emerald-500",
              bgColor: "from-green-50 to-emerald-50",
              urgent: false
            },
            {
              title: "Alertes Système",
              value: 2,
              subtitle: "Retards de livraison",
              icon: AlertCircle,
              color: "from-red-500 to-pink-500",
              bgColor: "from-red-50 to-pink-50",
              urgent: true
            }
          ].map((stat, index) => (
            <Card
              key={index}
              className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white animate-in slide-in-from-bottom duration-1000 ${stat.urgent ? 'ring-2 ring-red-200 animate-pulse' : ''}`}
              style={{ animationDelay: `${index * 200 + 600}ms` }}
            >
              <CardContent className="p-8">
                <div className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 relative overflow-hidden`}>
                  {stat.urgent && (
                    <div className="absolute top-2 right-2">
                      <Zap className="w-5 h-5 text-red-500 animate-pulse" />
                    </div>
                  )}

                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{stat.title}</h3>
                      <p className="text-sm text-gray-600">{stat.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-5xl font-black text-gray-900 mb-2">{stat.value}</div>
                    {stat.urgent && (
                      <Badge className="bg-red-500 text-white animate-bounce">
                        Action Requise
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Commandes Récentes</CardTitle>
              <CardDescription>
                Les dernières commandes passées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.address}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items.join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total}</p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/admin/orders">Voir Toutes les Commandes</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Active Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle>Livraisons en Cours</CardTitle>
              <CardDescription>
                Suivi des livraisons actives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{delivery.driver}</span>
                        {getStatusBadge(delivery.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{delivery.customer}</p>
                      <p className="text-xs text-muted-foreground">Commande: {delivery.order}</p>
                      <p className="text-xs text-muted-foreground">{delivery.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{delivery.estimatedTime}</p>
                      <p className="text-xs text-muted-foreground">ETA</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/admin/deliveries">Gérer les Livraisons</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
