import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Phone, 
  MapPin, 
  Truck, 
  Star, 
  Clock,
  User,
  Search,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle
} from "lucide-react";

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  vehicleType: "moto" | "vélo" | "voiture";
  vehicleNumber: string;
  status: "available" | "busy" | "offline" | "suspended";
  rating: number;
  totalDeliveries: number;
  completedToday: number;
  averageTime: number;
  earnings: number;
  joinDate: string;
  currentLocation?: string;
  active: boolean;
  zone: string;
}

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: "DRV-001",
      firstName: "Jacques",
      lastName: "Tshisekedi",
      phone: "+243 111 222 333",
      email: "jacques.t@congofood.com",
      vehicleType: "moto",
      vehicleNumber: "KIN-1234",
      status: "busy",
      rating: 4.8,
      totalDeliveries: 156,
      completedToday: 8,
      averageTime: 22,
      earnings: 2840.50,
      joinDate: "2024-01-10",
      currentLocation: "Av. des Cliniques",
      active: true,
      zone: "Gombe"
    },
    {
      id: "DRV-002",
      firstName: "Serge",
      lastName: "Kabongo",
      phone: "+243 444 555 666",
      email: "serge.k@congofood.com",
      vehicleType: "vélo",
      vehicleNumber: "VEL-0089",
      status: "available",
      rating: 4.6,
      totalDeliveries: 89,
      completedToday: 5,
      averageTime: 28,
      earnings: 1650.75,
      joinDate: "2024-01-12",
      active: true,
      zone: "Kinshasa"
    },
    {
      id: "DRV-003",
      firstName: "Marie",
      lastName: "Ndongo",
      phone: "+243 777 888 999",
      email: "marie.n@congofood.com",
      vehicleType: "moto",
      vehicleNumber: "KIN-5678",
      status: "offline",
      rating: 4.9,
      totalDeliveries: 203,
      completedToday: 0,
      averageTime: 19,
      earnings: 3420.25,
      joinDate: "2024-01-08",
      active: true,
      zone: "Bandalungwa"
    },
    {
      id: "DRV-004",
      firstName: "Paul",
      lastName: "Mwamba",
      phone: "+243 999 111 222",
      email: "paul.m@congofood.com",
      vehicleType: "voiture",
      vehicleNumber: "KIN-9999",
      status: "suspended",
      rating: 3.2,
      totalDeliveries: 45,
      completedToday: 0,
      averageTime: 35,
      earnings: 820.00,
      joinDate: "2024-01-15",
      active: false,
      zone: "Limete"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    vehicleType: "moto" as const,
    vehicleNumber: "",
    zone: ""
  });

  const statusColors = {
    available: "bg-green-100 text-green-800",
    busy: "bg-orange-100 text-orange-800",
    offline: "bg-gray-100 text-gray-800",
    suspended: "bg-red-100 text-red-800"
  };

  const statusLabels = {
    available: "Disponible",
    busy: "Occupé",
    offline: "Hors ligne",
    suspended: "Suspendu"
  };

  const vehicleIcons = {
    moto: "🏍️",
    vélo: "🚲",
    voiture: "🚗"
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.phone.includes(searchQuery) ||
                         driver.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = () => {
    if (editingDriver) {
      // Update existing driver
      setDrivers(drivers.map(driver => 
        driver.id === editingDriver.id 
          ? { ...driver, ...formData }
          : driver
      ));
    } else {
      // Add new driver
      const newDriver: Driver = {
        id: `DRV-${String(drivers.length + 1).padStart(3, '0')}`,
        ...formData,
        status: "offline",
        rating: 4.0,
        totalDeliveries: 0,
        completedToday: 0,
        averageTime: 0,
        earnings: 0,
        joinDate: new Date().toISOString().split('T')[0],
        active: true
      };
      setDrivers([...drivers, newDriver]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      vehicleType: "moto",
      vehicleNumber: "",
      zone: ""
    });
    setEditingDriver(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (driver: Driver) => {
    setFormData({
      firstName: driver.firstName,
      lastName: driver.lastName,
      phone: driver.phone,
      email: driver.email,
      vehicleType: driver.vehicleType,
      vehicleNumber: driver.vehicleNumber,
      zone: driver.zone
    });
    setEditingDriver(driver);
    setIsAddDialogOpen(true);
  };

  const toggleDriverStatus = (driverId: string) => {
    setDrivers(drivers.map(driver => {
      if (driver.id === driverId) {
        if (driver.status === "suspended") {
          return { ...driver, status: "offline", active: true };
        } else {
          return { ...driver, status: "suspended", active: false };
        }
      }
      return driver;
    }));
  };

  const changeDriverStatus = (driverId: string, newStatus: Driver['status']) => {
    setDrivers(drivers.map(driver =>
      driver.id === driverId ? { ...driver, status: newStatus } : driver
    ));
  };

  const getAvailableDrivers = () => drivers.filter(d => d.status === "available").length;
  const getBusyDrivers = () => drivers.filter(d => d.status === "busy").length;
  const getTotalDeliveriesToday = () => drivers.reduce((sum, d) => sum + d.completedToday, 0);
  const getAverageRating = () => {
    const total = drivers.reduce((sum, d) => sum + d.rating, 0);
    return (total / drivers.length).toFixed(1);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Livreurs</h1>
            <p className="text-muted-foreground">
              Gérez votre équipe de livraison et suivez leurs performances
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Livreur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingDriver ? "Modifier le Livreur" : "Nouveau Livreur"}
                </DialogTitle>
                <DialogDescription>
                  {editingDriver 
                    ? "Modifiez les informations de ce livreur"
                    : "Ajoutez un nouveau livreur à votre équipe"
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Jacques"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Tshisekedi"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      placeholder="+243 123 456 789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jacques@congofood.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Type de véhicule</Label>
                    <select
                      id="vehicleType"
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value as any })}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      <option value="moto">Moto</option>
                      <option value="vélo">Vélo</option>
                      <option value="voiture">Voiture</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber">Numéro du véhicule</Label>
                    <Input
                      id="vehicleNumber"
                      placeholder="KIN-1234"
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zone">Zone d'attribution</Label>
                  <Input
                    id="zone"
                    placeholder="Gombe"
                    value={formData.zone}
                    onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.firstName.trim() || !formData.lastName.trim() || !formData.phone.trim()}
                >
                  {editingDriver ? "Modifier" : "Créer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{getAvailableDrivers()}</div>
                <div className="text-xs text-muted-foreground">Disponibles</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{getBusyDrivers()}</div>
                <div className="text-xs text-muted-foreground">En Livraison</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{getTotalDeliveriesToday()}</div>
                <div className="text-xs text-muted-foreground">Livraisons Aujourd'hui</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{getAverageRating()}★</div>
                <div className="text-xs text-muted-foreground">Note Moyenne</div>
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
                  placeholder="Rechercher un livreur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-48 p-2 border border-input rounded-md bg-background"
              >
                <option value="all">Tous les statuts</option>
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => (
            <Card key={driver.id} className={`${!driver.active ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {driver.firstName.charAt(0)}{driver.lastName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {driver.firstName} {driver.lastName}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={statusColors[driver.status]}>
                          {statusLabels[driver.status]}
                        </Badge>
                        <span className="text-sm">{vehicleIcons[driver.vehicleType]} {driver.vehicleNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Zone:</span>
                    <span className="font-medium">{driver.zone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Note:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{driver.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Livraisons totales:</span>
                    <span className="font-medium">{driver.totalDeliveries}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Aujourd'hui:</span>
                    <span className="font-medium">{driver.completedToday}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Temps moyen:</span>
                    <span className="font-medium">{driver.averageTime} min</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Gains:</span>
                    <span className="font-medium text-primary">${driver.earnings}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span>{driver.phone}</span>
                  </div>
                  {driver.currentLocation && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-primary">{driver.currentLocation}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span>Depuis le {new Date(driver.joinDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(driver)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleDriverStatus(driver.id)}
                      className={driver.status === "suspended" ? "text-green-600" : "text-red-600"}
                    >
                      {driver.status === "suspended" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  
                  {driver.status !== "suspended" && (
                    <div className="flex space-x-1">
                      {driver.status !== "available" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => changeDriverStatus(driver.id, "available")}
                          className="text-xs"
                        >
                          Disponible
                        </Button>
                      )}
                      {driver.status !== "offline" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => changeDriverStatus(driver.id, "offline")}
                          className="text-xs"
                        >
                          Hors ligne
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrivers.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucun livreur trouvé
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery || statusFilter !== "all"
                    ? "Aucun livreur ne correspond à vos critères de recherche."
                    : "Commencez par ajouter des livreurs à votre équipe."
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
