import { useState } from "react";
import DeliveryLayout from "@/components/delivery/DeliveryLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MapPin, 
  Phone, 
  Clock, 
  DollarSign, 
  Navigation, 
  Package,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Timer,
  Star,
  Route,
  Eye,
  MessageSquare
} from "lucide-react";

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupAddress: string;
  deliveryAddress: string;
  coordinates: { lat: number; lng: number };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  deliveryFee: number;
  status: "ready" | "assigned" | "picked_up" | "en_route" | "delivered";
  priority: "normal" | "urgent" | "express";
  estimatedTime: string;
  distance: string;
  paymentMethod: "cash" | "mobile" | "card";
  paymentStatus: "pending" | "paid";
  preparationTime: string;
  notes?: string;
  restaurant: string;
}

export default function DeliveryOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "DEL-001",
      orderId: "ORD-001",
      customerName: "Jean Mukendi",
      customerPhone: "+243 123 456 789",
      customerEmail: "jean.mukendi@email.com",
      pickupAddress: "Congo Food - Restaurant Principal, Av. Lumumba",
      deliveryAddress: "Av. Lumumba 123, Kinshasa, Commune de Gombe",
      coordinates: { lat: -4.3217, lng: 15.3014 },
      items: [
        { name: "Moambé au Poulet", quantity: 1, price: 15.99 },
        { name: "Fufu na Ndakala", quantity: 1, price: 12.99 }
      ],
      total: 28.98,
      deliveryFee: 2.50,
      status: "ready",
      priority: "normal",
      estimatedTime: "25 min",
      distance: "3.2 km",
      paymentMethod: "cash",
      paymentStatus: "pending",
      preparationTime: "Prêt maintenant",
      notes: "Sonner 3 fois. Appartement 4B",
      restaurant: "Congo Food Central"
    },
    {
      id: "DEL-002",
      orderId: "ORD-004",
      customerName: "Marie Kabila",
      customerPhone: "+243 987 654 321",
      customerEmail: "marie.kabila@email.com",
      pickupAddress: "Congo Food - Restaurant Principal, Av. Lumumba",
      deliveryAddress: "Avenue des Nations Unies 45, Kinshasa",
      coordinates: { lat: -4.3115, lng: 15.2994 },
      items: [
        { name: "Saka-Saka aux Crevettes", quantity: 2, price: 16.99 }
      ],
      total: 33.98,
      deliveryFee: 0,
      status: "assigned",
      priority: "urgent",
      estimatedTime: "15 min",
      distance: "1.8 km",
      paymentMethod: "mobile",
      paymentStatus: "paid",
      preparationTime: "Prêt dans 5 min",
      restaurant: "Congo Food Central"
    },
    {
      id: "DEL-003",
      orderId: "ORD-007",
      customerName: "Pierre Mbuyi",
      customerPhone: "+243 555 123 456",
      customerEmail: "pierre.mbuyi@email.com",
      pickupAddress: "Congo Food - Succursale Gombe, Av. du Port",
      deliveryAddress: "Av. des Poids Lourds 78, Kinshasa",
      coordinates: { lat: -4.3398, lng: 15.3235 },
      items: [
        { name: "Liboke de Porc", quantity: 1, price: 19.99 },
        { name: "Bili na Madesu", quantity: 1, price: 10.99 }
      ],
      total: 30.98,
      deliveryFee: 2.50,
      status: "en_route",
      priority: "express",
      estimatedTime: "10 min",
      distance: "2.1 km",
      paymentMethod: "card",
      paymentStatus: "paid",
      preparationTime: "En livraison",
      restaurant: "Congo Food Gombe"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statusColors = {
    ready: "bg-blue-100 text-blue-800",
    assigned: "bg-yellow-100 text-yellow-800",
    picked_up: "bg-purple-100 text-purple-800",
    en_route: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800"
  };

  const statusLabels = {
    ready: "Prêt à récupérer",
    assigned: "Assigné",
    picked_up: "Récupéré",
    en_route: "En route",
    delivered: "Livré"
  };

  const priorityColors = {
    normal: "bg-gray-100 text-gray-800",
    urgent: "bg-yellow-100 text-yellow-800",
    express: "bg-red-100 text-red-800"
  };

  const priorityLabels = {
    normal: "Normal",
    urgent: "🔥 Urgent",
    express: "⚡ Express"
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const openGoogleMaps = (address: string, coordinates: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const callCustomer = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <DeliveryLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Commandes à Livrer</h1>
              <p className="text-blue-100">
                {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''} en attente de livraison
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-white animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="shadow-lg border-blue-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher commande, client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes priorités</SelectItem>
                  {Object.entries(priorityLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <Card key={order.id} className="shadow-lg border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300 animate-in fade-in-50" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {order.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{order.customerName}</h3>
                        <p className="text-sm text-gray-600">Commande #{order.orderId}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={statusColors[order.status]}>
                            {statusLabels[order.status]}
                          </Badge>
                          <Badge className={priorityColors[order.priority]} variant="outline">
                            {priorityLabels[order.priority]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">${order.total}</div>
                      <div className="text-sm text-gray-600">{order.paymentMethod}</div>
                      <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"} className="mt-1">
                        {order.paymentStatus === "paid" ? "Payé" : "À payer"}
                      </Badge>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                          Récupération
                        </h4>
                        <div className="text-sm text-gray-600 pl-6">
                          {order.pickupAddress}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-green-600" />
                          Livraison
                        </h4>
                        <div className="text-sm text-gray-600 pl-6">
                          {order.deliveryAddress}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Package className="w-4 h-4 mr-2 text-purple-600" />
                          Articles
                        </h4>
                        <div className="space-y-1 pl-6">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.quantity}x {item.name}</span>
                              <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <div className="flex items-center space-x-2 mb-1">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">Temps estimé</span>
                          </div>
                          <div className="text-lg font-bold text-blue-700">{order.estimatedTime}</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <div className="flex items-center space-x-2 mb-1">
                            <Route className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Distance</span>
                          </div>
                          <div className="text-lg font-bold text-green-700">{order.distance}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-indigo-600" />
                          Contact Client
                        </h4>
                        <div className="space-y-1 pl-6 text-sm">
                          <div className="text-gray-800">{order.customerPhone}</div>
                          <div className="text-gray-600">{order.customerEmail}</div>
                        </div>
                      </div>

                      {order.notes && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <MessageSquare className="w-4 h-4 mr-2 text-orange-600" />
                            Instructions
                          </h4>
                          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200 text-sm text-orange-800 pl-6">
                            {order.notes}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-2">État de Préparation</h4>
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                          <div className="flex items-center space-x-2">
                            <Timer className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-800">{order.preparationTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <Button 
                      onClick={() => openGoogleMaps(order.deliveryAddress, order.coordinates)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Naviguer
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => callCustomer(order.customerPhone)}
                      className="border-green-200 text-green-600 hover:bg-green-50"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler Client
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Détails de la Commande {order.orderId}</DialogTitle>
                          <DialogDescription>
                            Informations complètes sur cette livraison
                          </DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-4">
                            {/* Embedded Map Placeholder */}
                            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-8 text-center border border-blue-200">
                              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                              <h3 className="text-lg font-semibold text-blue-800 mb-2">Carte Interactive</h3>
                              <p className="text-blue-600 mb-4">
                                Position: {selectedOrder.coordinates.lat.toFixed(4)}, {selectedOrder.coordinates.lng.toFixed(4)}
                              </p>
                              <Button 
                                onClick={() => openGoogleMaps(selectedOrder.deliveryAddress, selectedOrder.coordinates)}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Ouvrir dans Google Maps
                              </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Informations Client</h4>
                                <div className="space-y-1 text-sm">
                                  <div>{selectedOrder.customerName}</div>
                                  <div>{selectedOrder.customerPhone}</div>
                                  <div>{selectedOrder.customerEmail}</div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Informations Livraison</h4>
                                <div className="space-y-1 text-sm">
                                  <div>Distance: {selectedOrder.distance}</div>
                                  <div>Temps estimé: {selectedOrder.estimatedTime}</div>
                                  <div>Frais: ${selectedOrder.deliveryFee}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {/* Status Actions */}
                    <div className="flex space-x-2 ml-auto">
                      {order.status === "ready" && (
                        <Button 
                          onClick={() => updateOrderStatus(order.id, "picked_up")}
                          variant="outline"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          Marquer Récupéré
                        </Button>
                      )}
                      {order.status === "picked_up" && (
                        <Button 
                          onClick={() => updateOrderStatus(order.id, "en_route")}
                          variant="outline"
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          En Route
                        </Button>
                      )}
                      {order.status === "en_route" && (
                        <Button 
                          onClick={() => updateOrderStatus(order.id, "delivered")}
                          variant="outline"
                          className="border-green-200 text-green-600 hover:bg-green-50"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Livré
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucune commande trouvée
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
                    ? "Aucune commande ne correspond à vos critères de recherche."
                    : "Aucune commande en attente de livraison pour le moment."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DeliveryLayout>
  );
}
