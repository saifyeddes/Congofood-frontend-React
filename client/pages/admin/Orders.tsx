import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Eye, 
  Phone, 
  MapPin, 
  Clock, 
  DollarSign,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered" | "cancelled";
  paymentMethod: "cash" | "mobile" | "card";
  paymentStatus: "pending" | "paid" | "failed";
  orderDate: string;
  orderTime: string;
  estimatedDelivery: string;
  assignedDriver?: string;
  notes?: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Jean Mukendi",
      customerPhone: "+243 123 456 789",
      customerEmail: "jean.mukendi@email.com",
      address: "Av. Lumumba, Kinshasa, Commune de Gombe",
      items: [
        { name: "Moambé au Poulet", quantity: 1, price: 15.99 },
        { name: "Fufu na Ndakala", quantity: 1, price: 12.99 }
      ],
      subtotal: 28.98,
      deliveryFee: 2.50,
      tax: 2.90,
      total: 34.38,
      status: "preparing",
      paymentMethod: "cash",
      paymentStatus: "pending",
      orderDate: "2024-01-20",
      orderTime: "14:30",
      estimatedDelivery: "15:15",
      notes: "Livrer avant 16h svp"
    },
    {
      id: "ORD-002",
      customerName: "Marie Kabila",
      customerPhone: "+243 987 654 321",
      customerEmail: "marie.kabila@email.com",
      address: "Avenue des Nations Unies, Kinshasa",
      items: [
        { name: "Saka-Saka aux Crevettes", quantity: 2, price: 16.99 }
      ],
      subtotal: 33.98,
      deliveryFee: 0,
      tax: 3.40,
      total: 37.38,
      status: "out_for_delivery",
      paymentMethod: "mobile",
      paymentStatus: "paid",
      orderDate: "2024-01-20",
      orderTime: "14:25",
      estimatedDelivery: "15:25",
      assignedDriver: "Jacques Tshisekedi"
    },
    {
      id: "ORD-003",
      customerName: "Pierre Mbuyi",
      customerPhone: "+243 555 123 456",
      customerEmail: "pierre.mbuyi@email.com",
      address: "Av. des Poids Lourds, Kinshasa",
      items: [
        { name: "Liboke de Porc", quantity: 1, price: 19.99 },
        { name: "Bili na Madesu", quantity: 1, price: 10.99 }
      ],
      subtotal: 30.98,
      deliveryFee: 2.50,
      tax: 3.10,
      total: 36.58,
      status: "delivered",
      paymentMethod: "card",
      paymentStatus: "paid",
      orderDate: "2024-01-20",
      orderTime: "13:45",
      estimatedDelivery: "14:30",
      assignedDriver: "Serge Kabongo"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statusColors = {
    pending: "bg-gray-100 text-gray-800",
    confirmed: "bg-blue-100 text-blue-800",
    preparing: "bg-yellow-100 text-yellow-800",
    ready: "bg-purple-100 text-purple-800",
    out_for_delivery: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800"
  };

  const statusLabels = {
    pending: "En Attente",
    confirmed: "Confirmée",
    preparing: "En Préparation",
    ready: "Prête",
    out_for_delivery: "En Livraison",
    delivered: "Livrée",
    cancelled: "Annulée"
  };

  const paymentStatusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800"
  };

  const paymentStatusLabels = {
    pending: "En Attente",
    paid: "Payé",
    failed: "Échec"
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerPhone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const assignDriver = (orderId: string, driver: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, assignedDriver: driver } : order
    ));
  };

  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    const statusFlow = {
      pending: "confirmed",
      confirmed: "preparing", 
      preparing: "ready",
      ready: "out_for_delivery",
      out_for_delivery: "delivered"
    };
    return statusFlow[currentStatus as keyof typeof statusFlow] as Order['status'] || null;
  };

  const getNextStatusLabel = (currentStatus: Order['status']): string => {
    const nextStatus = getNextStatus(currentStatus);
    return nextStatus ? statusLabels[nextStatus] : "";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Commandes</h1>
            <p className="text-muted-foreground">
              Suivez et gérez toutes les commandes de Congo Food
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              Exporter CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher par ID, nom ou téléphone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{orders.length}</div>
                <div className="text-xs text-muted-foreground">Total Commandes</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => ["pending", "confirmed", "preparing"].includes(o.status)).length}
                </div>
                <div className="text-xs text-muted-foreground">En Cours</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {orders.filter(o => o.status === "out_for_delivery").length}
                </div>
                <div className="text-xs text-muted-foreground">En Livraison</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === "delivered").length}
                </div>
                <div className="text-xs text-muted-foreground">Livrées</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold">{order.id}</h3>
                        <Badge className={statusColors[order.status]}>
                          {statusLabels[order.status]}
                        </Badge>
                        <Badge className={paymentStatusColors[order.paymentStatus]}>
                          {paymentStatusLabels[order.paymentStatus]}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">${order.total}</div>
                        <div className="text-sm text-muted-foreground">{order.paymentMethod}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{order.customerName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{order.customerPhone}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <span className="text-sm">{order.address}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Commandé à {order.orderTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Livraison estimée: {order.estimatedDelivery}</span>
                        </div>
                        {order.assignedDriver && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Livreur: </span>
                            <span className="font-medium">{order.assignedDriver}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="text-sm text-muted-foreground mb-2">Articles commandés:</div>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, index) => (
                          <Badge key={index} variant="outline">
                            {item.quantity}x {item.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {order.notes && (
                      <div className="border-t pt-3">
                        <div className="text-sm text-muted-foreground mb-1">Notes:</div>
                        <div className="text-sm">{order.notes}</div>
                      </div>
                    )}
                  </div>

                  <div className="ml-6 flex flex-col space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Détails de la Commande {order.id}</DialogTitle>
                          <DialogDescription>
                            Informations complètes sur cette commande
                          </DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Client</h4>
                                <div className="space-y-1 text-sm">
                                  <div>{selectedOrder.customerName}</div>
                                  <div>{selectedOrder.customerEmail}</div>
                                  <div>{selectedOrder.customerPhone}</div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Livraison</h4>
                                <div className="space-y-1 text-sm">
                                  <div>{selectedOrder.address}</div>
                                  <div>Commande: {selectedOrder.orderTime}</div>
                                  <div>Estimation: {selectedOrder.estimatedDelivery}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Articles</h4>
                              <div className="space-y-2">
                                {selectedOrder.items.map((item, index) => (
                                  <div key={index} className="flex justify-between">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t pt-2 mt-2 space-y-1">
                                <div className="flex justify-between">
                                  <span>Sous-total:</span>
                                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Livraison:</span>
                                  <span>${selectedOrder.deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Taxes:</span>
                                  <span>${selectedOrder.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold">
                                  <span>Total:</span>
                                  <span>${selectedOrder.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {getNextStatus(order.status) && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, getNextStatus(order.status)!)}
                        className="whitespace-nowrap"
                      >
                        {getNextStatusLabel(order.status)}
                      </Button>
                    )}

                    {order.status === "ready" && !order.assignedDriver && (
                      <Select onValueChange={(driver) => assignDriver(order.id, driver)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Assigner livreur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Jacques Tshisekedi">Jacques Tshisekedi</SelectItem>
                          <SelectItem value="Serge Kabongo">Serge Kabongo</SelectItem>
                          <SelectItem value="Marie Ndongo">Marie Ndongo</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    {["pending", "confirmed"].includes(order.status) && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucune commande trouvée
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery || statusFilter !== "all"
                    ? "Aucune commande ne correspond à vos critères de recherche."
                    : "Aucune commande n'a été passée pour le moment."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
