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

        {/* Enhanced Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Recent Orders */}
          <Card className="border-0 shadow-2xl bg-white overflow-hidden animate-in slide-in-from-left duration-1000 delay-1000">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Commandes Récentes</CardTitle>
                  <CardDescription className="text-blue-100 font-medium">
                    Suivi en temps réel des dernières commandes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {recentOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom duration-1000"
                    style={{ animationDelay: `${index * 200 + 1200}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {order.id.slice(-2)}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900">{order.id}</span>
                          <p className="text-sm text-gray-600">{order.time}</p>
                        </div>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-gray-900">{order.customer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">{order.address}</span>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <p className="text-sm text-gray-700 font-medium">
                          {order.items.join(" • ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <span className="text-2xl font-black text-emerald-600">${order.total}</span>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        Détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className="w-full mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl"
              >
                <Link to="/admin/orders">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Voir Toutes les Commandes
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Active Deliveries */}
          <Card className="border-0 shadow-2xl bg-white overflow-hidden animate-in slide-in-from-right duration-1000 delay-1200">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Livraisons en Cours</CardTitle>
                  <CardDescription className="text-emerald-100 font-medium">
                    Suivi en temps réel des livraisons actives
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {activeDeliveries.map((delivery, index) => (
                  <div
                    key={delivery.id}
                    className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom duration-1000"
                    style={{ animationDelay: `${index * 200 + 1400}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900">{delivery.driver}</span>
                          <p className="text-sm text-gray-600">Livreur</p>
                        </div>
                      </div>
                      {getStatusBadge(delivery.status)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-emerald-500" />
                        <span className="font-semibold text-gray-900">{delivery.customer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">{delivery.phone}</span>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <p className="text-sm text-gray-700 font-medium">
                          Commande: {delivery.order}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <span className="text-lg font-bold text-orange-600">{delivery.estimatedTime}</span>
                      </div>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <MapPin className="w-4 h-4 mr-2" />
                        Localiser
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl"
              >
                <Link to="/admin/deliveries">
                  <Activity className="w-5 h-5 mr-2" />
                  Gérer les Livraisons
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
