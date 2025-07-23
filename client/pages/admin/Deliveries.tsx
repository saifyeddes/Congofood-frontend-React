import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Truck,
  Navigation,
  CheckCircle,
  AlertTriangle,
  User,
  Package
} from "lucide-react";

interface Delivery {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  driverName: string;
  driverPhone: string;
  status: "assigned" | "picked_up" | "in_transit" | "delivered" | "failed";
  priority: "normal" | "urgent" | "express";
  estimatedTime: string;
  actualStartTime?: string;
  actualDeliveryTime?: string;
  distance: string;
  progress: number;
  currentLocation?: string;
  notes?: string;
  deliveryFee: number;
  orderValue: number;
  route: Array<{
    step: string;
    time: string;
    completed: boolean;
  }>;
}

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "LIV-001",
      orderId: "ORD-001",
      customerName: "Jean Mukendi",
      customerPhone: "+243 123 456 789",
      pickupAddress: "Congo Food - Restaurant Principal",
      deliveryAddress: "Av. Lumumba, Kinshasa, Commune de Gombe",
      driverName: "Jacques Tshisekedi",
      driverPhone: "+243 111 222 333",
      status: "in_transit",
      priority: "normal",
      estimatedTime: "25 min",
      actualStartTime: "14:45",
      distance: "8.5 km",
      progress: 60,
      currentLocation: "Av. des Cliniques",
      orderValue: 34.38,
      deliveryFee: 2.50,
      route: [
        { step: "Commande récupérée", time: "14:45", completed: true },
        { step: "En route vers le client", time: "14:50", completed: true },
        { step: "À 5 min du client", time: "15:05", completed: false },
        { step: "Livraison effectuée", time: "15:10", completed: false }
      ]
    },
    {
      id: "LIV-002",
      orderId: "ORD-004",
      customerName: "Fatou Konate",
      customerPhone: "+243 987 654 321",
      pickupAddress: "Congo Food - Restaurant Principal",
      deliveryAddress: "Av. Batetela, Kinshasa",
      driverName: "Serge Kabongo",
      driverPhone: "+243 444 555 666",
      status: "assigned",
      priority: "urgent",
      estimatedTime: "20 min",
      distance: "6.2 km",
      progress: 10,
      orderValue: 45.60,
      deliveryFee: 2.50,
      notes: "Client demande de sonner 3 fois",
      route: [
        { step: "Commande récupérée", time: "15:00", completed: false },
        { step: "En route vers le client", time: "15:05", completed: false },
        { step: "À 5 min du client", time: "15:15", completed: false },
        { step: "Livraison effectuée", time: "15:20", completed: false }
      ]
    },
    {
      id: "LIV-003",
      orderId: "ORD-003",
      customerName: "Pierre Mbuyi",
      customerPhone: "+243 555 123 456",
      pickupAddress: "Congo Food - Restaurant Principal",
      deliveryAddress: "Av. des Poids Lourds, Kinshasa",
      driverName: "Marie Ndongo",
      driverPhone: "+243 777 888 999",
      status: "delivered",
      priority: "normal",
      estimatedTime: "30 min",
      actualStartTime: "13:50",
      actualDeliveryTime: "14:18",
      distance: "11.3 km",
      progress: 100,
      orderValue: 36.58,
      deliveryFee: 2.50,
      route: [
        { step: "Commande récupérée", time: "13:50", completed: true },
        { step: "En route vers le client", time: "13:55", completed: true },
        { step: "À 5 min du client", time: "14:12", completed: true },
        { step: "Livraison effectuée", time: "14:18", completed: true }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);

  const statusColors = {
    assigned: "bg-blue-100 text-blue-800",
    picked_up: "bg-purple-100 text-purple-800",
    in_transit: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800"
  };

  const statusLabels = {
    assigned: "Assignée",
    picked_up: "Récupérée",
    in_transit: "En Transit",
    delivered: "Livrée",
    failed: "Échec"
  };

  const priorityColors = {
    normal: "bg-gray-100 text-gray-800",
    urgent: "bg-yellow-100 text-yellow-800",
    express: "bg-red-100 text-red-800"
  };

  const priorityLabels = {
    normal: "Normal",
    urgent: "Urgent",
    express: "Express"
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         delivery.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateDeliveryStatus = (deliveryId: string, newStatus: Delivery['status']) => {
    setDeliveries(deliveries.map(delivery => {
      if (delivery.id === deliveryId) {
        const updatedDelivery = { ...delivery, status: newStatus };
        
        // Update progress based on status
        switch (newStatus) {
          case "assigned":
            updatedDelivery.progress = 10;
            break;
          case "picked_up":
            updatedDelivery.progress = 25;
            break;
          case "in_transit":
            updatedDelivery.progress = 60;
            break;
          case "delivered":
            updatedDelivery.progress = 100;
            updatedDelivery.actualDeliveryTime = new Date().toLocaleTimeString('fr-FR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            });
            break;
          case "failed":
            updatedDelivery.progress = 0;
            break;
        }
        
        return updatedDelivery;
      }
      return delivery;
    }));
  };

  const getActiveDeliveries = () => {
    return deliveries.filter(d => ["assigned", "picked_up", "in_transit"].includes(d.status));
  };

  const getCompletedToday = () => {
    return deliveries.filter(d => d.status === "delivered").length;
  };

  const getAverageDeliveryTime = () => {
    const completed = deliveries.filter(d => d.actualStartTime && d.actualDeliveryTime);
    if (completed.length === 0) return "N/A";
    
    const totalMinutes = completed.reduce((sum, delivery) => {
      const start = new Date(`2024-01-01 ${delivery.actualStartTime}`);
      const end = new Date(`2024-01-01 ${delivery.actualDeliveryTime}`);
      return sum + (end.getTime() - start.getTime()) / (1000 * 60);
    }, 0);
    
    return Math.round(totalMinutes / completed.length) + " min";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Livraisons</h1>
            <p className="text-muted-foreground">
              Suivez en temps réel toutes les livraisons de Congo Food
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              Carte des Livraisons
            </Button>
            <Button variant="outline">
              Rapport Journalier
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{getActiveDeliveries().length}</div>
                <div className="text-xs text-muted-foreground">Livraisons Actives</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{getCompletedToday()}</div>
                <div className="text-xs text-muted-foreground">Livrées Aujourd'hui</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{getAverageDeliveryTime()}</div>
                <div className="text-xs text-muted-foreground">Temps Moyen</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {deliveries.filter(d => d.status === "failed").length}
                </div>
                <div className="text-xs text-muted-foreground">Échecs</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher par ID, commande, client ou livreur..."
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

        {/* Deliveries List */}
        <div className="space-y-4">
          {filteredDeliveries.map((delivery) => (
            <Card key={delivery.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold">{delivery.id}</h3>
                      <Badge variant="outline">Commande: {delivery.orderId}</Badge>
                      <Badge className={statusColors[delivery.status]}>
                        {statusLabels[delivery.status]}
                      </Badge>
                      <Badge className={priorityColors[delivery.priority]}>
                        {priorityLabels[delivery.priority]}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">${delivery.orderValue}</div>
                      <div className="text-sm text-muted-foreground">
                        Frais: ${delivery.deliveryFee}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression de la livraison</span>
                      <span>{delivery.progress}%</span>
                    </div>
                    <Progress value={delivery.progress} className="h-2" />
                  </div>

                  {/* Main Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Client
                        </h4>
                        <div className="space-y-1 text-sm pl-6">
                          <div>{delivery.customerName}</div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-3 h-3" />
                            <span>{delivery.customerPhone}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Truck className="w-4 h-4 mr-2" />
                          Livreur
                        </h4>
                        <div className="space-y-1 text-sm pl-6">
                          <div>{delivery.driverName}</div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-3 h-3" />
                            <span>{delivery.driverPhone}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Adresses
                        </h4>
                        <div className="space-y-2 text-sm pl-6">
                          <div>
                            <span className="text-muted-foreground">Récupération: </span>
                            <span>{delivery.pickupAddress}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Livraison: </span>
                            <span>{delivery.deliveryAddress}</span>
                          </div>
                          {delivery.currentLocation && (
                            <div>
                              <span className="text-muted-foreground">Position actuelle: </span>
                              <span className="font-medium text-primary">{delivery.currentLocation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Timing
                        </h4>
                        <div className="space-y-1 text-sm pl-6">
                          <div>
                            <span className="text-muted-foreground">Temps estimé: </span>
                            <span>{delivery.estimatedTime}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Distance: </span>
                            <span>{delivery.distance}</span>
                          </div>
                          {delivery.actualStartTime && (
                            <div>
                              <span className="text-muted-foreground">Départ: </span>
                              <span>{delivery.actualStartTime}</span>
                            </div>
                          )}
                          {delivery.actualDeliveryTime && (
                            <div>
                              <span className="text-muted-foreground">Livré à: </span>
                              <span className="font-medium text-green-600">{delivery.actualDeliveryTime}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Étapes de Livraison</h4>
                        <div className="space-y-2 pl-6">
                          {delivery.route.map((step, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              {step.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <div className="w-4 h-4 border-2 border-muted rounded-full" />
                              )}
                              <span className={step.completed ? "text-green-600" : "text-muted-foreground"}>
                                {step.step}
                              </span>
                              <span className="text-xs text-muted-foreground">({step.time})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {delivery.notes && (
                        <div>
                          <h4 className="font-semibold mb-2">Notes</h4>
                          <div className="text-sm pl-6 text-muted-foreground">
                            {delivery.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Navigation className="w-4 h-4 mr-2" />
                            Suivre
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Suivi en Temps Réel - {delivery.id}</DialogTitle>
                            <DialogDescription>
                              Position et progression de la livraison
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-muted p-4 rounded-lg">
                              <p className="text-center text-muted-foreground">
                                🗺️ Carte de suivi en temps réel
                              </p>
                              <p className="text-center text-sm mt-2">
                                Position actuelle: {delivery.currentLocation || "En attente..."}
                              </p>
                            </div>
                            <Progress value={delivery.progress} className="h-3" />
                            <div className="text-center">
                              <p className="font-semibold">{delivery.progress}% terminé</p>
                              <p className="text-sm text-muted-foreground">
                                ETA: {delivery.estimatedTime}
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Contacter Livreur
                      </Button>
                    </div>

                    <div className="flex space-x-2">
                      {delivery.status === "assigned" && (
                        <Button 
                          size="sm"
                          onClick={() => updateDeliveryStatus(delivery.id, "picked_up")}
                        >
                          Marquer Récupérée
                        </Button>
                      )}
                      {delivery.status === "picked_up" && (
                        <Button 
                          size="sm"
                          onClick={() => updateDeliveryStatus(delivery.id, "in_transit")}
                        >
                          En Transit
                        </Button>
                      )}
                      {delivery.status === "in_transit" && (
                        <Button 
                          size="sm"
                          onClick={() => updateDeliveryStatus(delivery.id, "delivered")}
                        >
                          Marquer Livrée
                        </Button>
                      )}
                      {["assigned", "picked_up", "in_transit"].includes(delivery.status) && (
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => updateDeliveryStatus(delivery.id, "failed")}
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Signaler Problème
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDeliveries.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucune livraison trouvée
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery || statusFilter !== "all"
                    ? "Aucune livraison ne correspond à vos critères de recherche."
                    : "Aucune livraison programmée pour le moment."
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
