import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  Eye,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  UtensilsCrossed,
  ChefHat,
  Timer,
  Star,
  Activity,
  Target,
  Utensils,
  BarChart3,
} from "lucide-react";

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = {
    totalReservations: 45,
    pendingReservations: 8,
    totalOrders: 156,
    pendingOrders: 12,
    revenue: 8540.5,
    avgRating: 4.8,
    menuItems: 48,
    tablesOccupied: 18,
  };

  const reservations = [
    {
      id: "RES-001",
      customerName: "Jean Mukendi",
      phone: "+243 123 456 789",
      table: "Table 5",
      date: "2024-01-15",
      time: "19:30",
      guests: 4,
      status: "confirmed",
      notes: "Anniversaire - Demande gâteau",
    },
    {
      id: "RES-002",
      customerName: "Marie Kabila",
      phone: "+243 987 654 321",
      table: "Table 12",
      date: "2024-01-15",
      time: "20:00",
      guests: 2,
      status: "pending",
      notes: "Dîner romantique",
    },
    {
      id: "RES-003",
      customerName: "Pierre Mbuyi",
      phone: "+243 555 123 456",
      table: "Table 8",
      date: "2024-01-16",
      time: "18:45",
      guests: 6,
      status: "pending",
      notes: "Réunion d'affaires",
    },
  ];

  const orders = [
    {
      id: "ORD-001",
      customerName: "Fatou Konate",
      items: ["Moambé au Poulet", "Fufu na Ndakala"],
      total: 28.98,
      status: "preparing",
      time: "14:30",
      table: "Table 3",
    },
    {
      id: "ORD-002",
      customerName: "Samuel Tshisekedi",
      items: ["Saka-Saka aux Crevettes", "Liboke de Porc"],
      total: 35.5,
      status: "ready",
      time: "14:25",
      table: "Table 7",
    },
    {
      id: "ORD-003",
      customerName: "Grace Mukongo",
      items: ["Bili na Madesu"],
      total: 18.99,
      status: "served",
      time: "13:45",
      table: "Table 15",
    },
  ];

  const menuItems = [
    {
      id: "MENU-001",
      name: "Moambé au Poulet",
      category: "Plats Principaux",
      price: 15.99,
      status: "available",
      rating: 4.9,
      orders: 24,
    },
    {
      id: "MENU-002",
      name: "Saka-Saka aux Crevettes",
      category: "Plats Principaux",
      price: 18.99,
      status: "available",
      rating: 4.7,
      orders: 18,
    },
    {
      id: "MENU-003",
      name: "Fufu na Ndakala",
      category: "Accompagnements",
      price: 8.99,
      status: "unavailable",
      rating: 4.6,
      orders: 15,
    },
  ];

  const getReservationStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmé
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            En Attente
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500 text-white">
            <XCircle className="w-3 h-3 mr-1" />
            Annulé
          </Badge>
        );
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "preparing":
        return (
          <Badge className="bg-orange-500 text-white animate-pulse">
            <Timer className="w-3 h-3 mr-1" />
            En Préparation
          </Badge>
        );
      case "ready":
        return (
          <Badge className="bg-blue-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Prêt
          </Badge>
        );
      case "served":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Servi
          </Badge>
        );
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Réservations",
            value: stats.totalReservations,
            change: `+${stats.pendingReservations} en attente`,
            icon: Calendar,
            color: "from-blue-500 to-indigo-500",
            bgColor: "from-blue-50 to-indigo-50",
          },
          {
            title: "Commandes",
            value: stats.totalOrders,
            change: `${stats.pendingOrders} en cours`,
            icon: ShoppingBag,
            color: "from-orange-500 to-amber-500",
            bgColor: "from-orange-50 to-amber-50",
          },
          {
            title: "Chiffre d'Affaires",
            value: `$${stats.revenue.toFixed(2)}`,
            change: "+12% ce mois",
            icon: DollarSign,
            color: "from-green-500 to-emerald-500",
            bgColor: "from-green-50 to-emerald-50",
          },
          {
            title: "Note Moyenne",
            value: stats.avgRating,
            change: `${stats.menuItems} plats au menu`,
            icon: Star,
            color: "from-purple-500 to-pink-500",
            bgColor: "from-purple-50 to-pink-50",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <CardContent className="p-6">
              <div
                className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-4 mb-4`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-green-600 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Nouvelle Réservation",
            icon: Plus,
            color: "bg-blue-500",
            action: "reservations",
          },
          {
            title: "Voir Commandes",
            icon: Eye,
            color: "bg-orange-500",
            action: "orders",
          },
          {
            title: "Gérer Menu",
            icon: UtensilsCrossed,
            color: "bg-green-500",
            action: "menu",
          },
          {
            title: "Localiser Client",
            icon: MapPin,
            color: "bg-purple-500",
            action: "tracking",
          },
        ].map((action, index) => (
          <Button
            key={index}
            onClick={() => setActiveTab(action.action)}
            className={`${action.color} hover:opacity-90 text-white p-6 h-auto flex-col space-y-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <action.icon className="w-8 h-8" />
            <span className="font-semibold">{action.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );

  const renderReservations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Gestion des Réservations
        </h2>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Réservation
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Rechercher une réservation..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtrer
        </Button>
      </div>

      <div className="grid gap-6">
        {reservations.map((reservation) => (
          <Card
            key={reservation.id}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {reservation.id.slice(-2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {reservation.customerName}
                    </h3>
                    <p className="text-sm text-gray-600">{reservation.id}</p>
                  </div>
                </div>
                {getReservationStatusBadge(reservation.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">
                    {reservation.date} à {reservation.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-sm">
                    {reservation.guests} personnes
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Utensils className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{reservation.table}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">{reservation.phone}</span>
                </div>
              </div>

              {reservation.notes && (
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="text-sm text-gray-700">{reservation.notes}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Valider
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Gestion des Commandes
        </h2>
        <div className="flex space-x-2">
          <Badge className="bg-orange-500 text-white">
            {orders.filter((o) => o.status === "preparing").length} En
            Préparation
          </Badge>
          <Badge className="bg-blue-500 text-white">
            {orders.filter((o) => o.status === "ready").length} Prêtes
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {order.id.slice(-2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {order.customerName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {order.table} • {order.time}
                    </p>
                  </div>
                </div>
                {getOrderStatusBadge(order.status)}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Articles commandés:
                </h4>
                <p className="text-sm text-gray-700">
                  {order.items.join(" • ")}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-green-600">
                  ${order.total}
                </span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Valider
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Suivre
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMenu = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestion du Menu</h2>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Plat
        </Button>
      </div>

      <div className="grid gap-6">
        {menuItems.map((item) => (
          <Card
            key={item.id}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                </div>
                <Badge
                  className={
                    item.status === "available"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }
                >
                  {item.status === "available" ? "Disponible" : "Indisponible"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-lg font-bold">${item.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{item.rating} étoiles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{item.orders} commandes</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Détails
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTracking = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Localisation Clients</h2>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                Carte Interactive
              </h3>
              <p className="text-gray-500">
                Visualisez la localisation de vos clients en temps réel
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Statistiques Détaillées
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <span>Statistiques Commandes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Commandes aujourd'hui</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Commandes cette semaine</span>
                <span className="font-bold">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Temps moyen de préparation</span>
                <span className="font-bold">18 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>Statistiques Réservations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Réservations aujourd'hui</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Taux d'occupation</span>
                <span className="font-bold">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tables disponibles</span>
                <span className="font-bold">6</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", content: renderOverview },
    { id: "reservations", label: "Réservations", content: renderReservations },
    { id: "orders", label: "Commandes", content: renderOrders },
    { id: "menu", label: "Menu", content: renderMenu },
    { id: "tracking", label: "Localisation", content: renderTracking },
    { id: "analytics", label: "Statistiques", content: renderAnalytics },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>{tabs.find((tab) => tab.id === activeTab)?.content()}</div>
    </div>
  );
}
