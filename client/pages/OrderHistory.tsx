import { useState } from "react";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Eye,
  Star,
  Truck,
  CheckCircle,
  XCircle,
  RefreshCw,
  Package,
  MapPin,
  Phone,
  Receipt,
  Download,
  Heart,
  ShoppingBag,
  CreditCard,
  RotateCcw,
  AlertCircle,
  Award,
  TrendingUp,
} from "lucide-react";

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Mock data for order history
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      time: "14:30",
      restaurant: "Chez Mama Congo",
      items: [
        { name: "Moambé au Poulet", quantity: 2, price: 15.99 },
        { name: "Fufu na Ndakala", quantity: 1, price: 8.99 },
        { name: "Saka-Saka aux Crevettes", quantity: 1, price: 12.99 },
      ],
      total: 53.96,
      status: "delivered",
      deliveryAddress: "Av. Lumumba, Kinshasa",
      deliveryTime: "35 min",
      paymentMethod: "Mobile Money",
      rating: 5,
      driverName: "Jacques Tshisekedi",
      driverPhone: "+243 123 456 789",
      trackingId: "TRK-789123",
      orderNote: "Très bonne qualité, livraison rapide!",
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-12",
      time: "19:45",
      restaurant: "Le Jardin Tropical",
      items: [
        { name: "Salade Fusion", quantity: 1, price: 14.5 },
        { name: "Grillades Mixtes", quantity: 1, price: 22.99 },
      ],
      total: 37.49,
      status: "delivered",
      deliveryAddress: "Commune de Gombe",
      deliveryTime: "42 min",
      paymentMethod: "Carte de crédit",
      rating: 4,
      driverName: "Marie Kabongo",
      driverPhone: "+243 987 654 321",
      trackingId: "TRK-456789",
      orderNote: "Plats délicieux, mais un peu lent",
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-10",
      time: "12:15",
      restaurant: "Saveurs d'Afrique",
      items: [
        { name: "Thieboudienne", quantity: 2, price: 16.99 },
        { name: "Attiéké", quantity: 1, price: 9.99 },
      ],
      total: 43.97,
      status: "cancelled",
      deliveryAddress: "Av. des Poids Lourds",
      deliveryTime: "N/A",
      paymentMethod: "Espèces",
      rating: null,
      driverName: null,
      driverPhone: null,
      trackingId: "TRK-123456",
      orderNote: "Commande annulée par le restaurant",
    },
    {
      id: "ORD-2024-004",
      date: "2024-01-08",
      time: "20:30",
      restaurant: "Fast Congo",
      items: [
        { name: "Burger Congo", quantity: 3, price: 8.99 },
        { name: "Frites Maison", quantity: 2, price: 4.5 },
        { name: "Coca-Cola", quantity: 3, price: 2.5 },
      ],
      total: 43.47,
      status: "delivered",
      deliveryAddress: "Centre Commercial",
      deliveryTime: "25 min",
      paymentMethod: "Mobile Money",
      rating: 3,
      driverName: "Pierre Mukendi",
      driverPhone: "+243 555 123 456",
      trackingId: "TRK-987654",
      orderNote: "Correct mais pourrait être amélioré",
    },
    {
      id: "ORD-2024-005",
      date: "2024-01-05",
      time: "18:00",
      restaurant: "Chez Mama Congo",
      items: [
        { name: "Liboke de Poisson", quantity: 1, price: 18.99 },
        { name: "Bili na Madesu", quantity: 1, price: 10.99 },
      ],
      total: 29.98,
      status: "delivered",
      deliveryAddress: "Av. Lumumba, Kinshasa",
      deliveryTime: "30 min",
      paymentMethod: "Espèces",
      rating: 5,
      driverName: "Fatou Konate",
      driverPhone: "+243 777 888 999",
      trackingId: "TRK-654321",
      orderNote: "Excellent comme toujours!",
    },
  ];

  const statusOptions = [
    { value: "all", label: "Tous les statuts" },
    { value: "delivered", label: "Livrées" },
    { value: "cancelled", label: "Annulées" },
    { value: "processing", label: "En cours" },
    { value: "pending", label: "En attente" },
  ];

  const dateOptions = [
    { value: "all", label: "Toutes les dates" },
    { value: "today", label: "Aujourd'hui" },
    { value: "week", label: "Cette semaine" },
    { value: "month", label: "Ce mois" },
    { value: "quarter", label: "Ce trimestre" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Livrée
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500 text-white">
            <XCircle className="w-3 h-3 mr-1" />
            Annulée
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-500 text-white">
            <Package className="w-3 h-3 mr-1" />
            En cours
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        );
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  const getRatingStars = (rating: number | null) => {
    if (!rating)
      return <span className="text-gray-400 text-sm">Non évalué</span>;

    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating}/5)</span>
      </div>
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    // Simple date filtering (in real app, would be more sophisticated)
    const matchesDate = dateFilter === "all" || true; // Simplified for demo

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalSpent = orders
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + order.total, 0);

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered",
  ).length;

  const OrderCard = ({ order }: { order: any }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden bg-white">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
              <p className="text-sm text-gray-600">
                {order.date} à {order.time}
              </p>
            </div>
            {getStatusBadge(order.status)}
          </div>

          {/* Restaurant */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-semibold text-gray-900 mb-1">
              {order.restaurant}
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-3 h-3" />
              <span>{order.deliveryAddress}</span>
            </div>
          </div>

          {/* Items */}
          <div>
            <h5 className="font-medium text-gray-900 mb-2">
              Articles commandés:
            </h5>
            <div className="space-y-1">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Total */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {order.paymentMethod}
              </span>
            </div>
            <span className="text-xl font-black text-emerald-600">
              ${order.total.toFixed(2)}
            </span>
          </div>

          {/* Rating */}
          {order.status === "delivered" && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Votre évaluation:
              </span>
              {getRatingStars(order.rating)}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-3 border-t border-gray-200">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedOrder(order)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Détails
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Détails de la commande {order.id}</DialogTitle>
                </DialogHeader>
                {selectedOrder && (
                  <div className="space-y-6 pt-4">
                    {/* Order Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Informations générales
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>Restaurant:</strong>{" "}
                            {selectedOrder.restaurant}
                          </div>
                          <div>
                            <strong>Date:</strong> {selectedOrder.date} à{" "}
                            {selectedOrder.time}
                          </div>
                          <div>
                            <strong>Statut:</strong>{" "}
                            {getStatusBadge(selectedOrder.status)}
                          </div>
                          <div>
                            <strong>ID de suivi:</strong>{" "}
                            {selectedOrder.trackingId}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Livraison
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>Adresse:</strong>{" "}
                            {selectedOrder.deliveryAddress}
                          </div>
                          <div>
                            <strong>Temps de livraison:</strong>{" "}
                            {selectedOrder.deliveryTime}
                          </div>
                          {selectedOrder.driverName && (
                            <>
                              <div>
                                <strong>Livreur:</strong>{" "}
                                {selectedOrder.driverName}
                              </div>
                              <div>
                                <strong>Téléphone:</strong>{" "}
                                {selectedOrder.driverPhone}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Items Detail */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Articles commandés
                      </h4>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item: any, index: number) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <span className="font-medium">{item.name}</span>
                              <span className="text-gray-600 ml-2">
                                x{item.quantity}
                              </span>
                            </div>
                            <span className="font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                          <span className="font-bold text-emerald-800">
                            Total
                          </span>
                          <span className="text-xl font-black text-emerald-600">
                            ${selectedOrder.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Note */}
                    {selectedOrder.orderNote && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Note de commande
                        </h4>
                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                          {selectedOrder.orderNote}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4 border-t">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger facture
                      </Button>
                      {selectedOrder.status === "delivered" && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Recommander
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {order.status === "delivered" && (
              <Button size="sm" variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Recommander
              </Button>
            )}

            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Facture
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
            <div className="container mx-auto px-6">
              <div className="text-center mb-8">
                <h1 className="text-5xl font-black mb-4">
                  Historique des Commandes
                </h1>
                <p className="text-xl text-emerald-100">
                  Retrouvez toutes vos commandes passées et suivez vos
                  préférences
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-black mb-1">{totalOrders}</div>
                  <div className="text-emerald-100">Commandes totales</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-black mb-1">
                    {deliveredOrders}
                  </div>
                  <div className="text-emerald-100">Commandes livrées</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-black mb-1">
                    ${totalSpent.toFixed(0)}
                  </div>
                  <div className="text-emerald-100">Total dépensé</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Rechercher par numéro de commande, restaurant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateOptions.map((date) => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredOrders.length} commande
                {filteredOrders.length > 1 ? "s" : ""} trouvée
                {filteredOrders.length > 1 ? "s" : ""}
              </h2>
              {searchTerm && (
                <p className="text-gray-600 mt-1">
                  Résultats pour "{searchTerm}"
                </p>
              )}
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrders.map((order, index) => (
                <div
                  key={order.id}
                  className="animate-in slide-in-from-bottom duration-1000"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <OrderCard order={order} />
                </div>
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Receipt className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Aucune commande trouvée
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setDateFilter("all");
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}
