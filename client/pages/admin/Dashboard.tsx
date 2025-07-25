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
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Vue d'ensemble de Congo Food - {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button asChild variant="outline">
              <Link to="/admin/orders">
                <Eye className="w-4 h-4 mr-2" />
                Voir Commandes
              </Link>
            </Button>
            <Button asChild>
              <Link to="/admin/dishes">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Plat
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes Totales</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                +{stats.ordersToday} aujourd'hui
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Livraisons Actives</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDeliveries}</div>
              <p className="text-xs text-muted-foreground">
                {stats.availableDrivers} livreurs disponibles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                +12% ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +8.2% ce mois
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Commandes en Attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</div>
              <p className="text-sm text-muted-foreground">À traiter immédiatement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Complétées Aujourd'hui
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.completedToday}</div>
              <p className="text-sm text-muted-foreground">Sur {stats.ordersToday} commandes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Alertes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">2</div>
              <p className="text-sm text-muted-foreground">Retards de livraison</p>
            </CardContent>
          </Card>
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
