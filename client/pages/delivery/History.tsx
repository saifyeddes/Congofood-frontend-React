import { useState } from "react";
import DeliveryLayout from "@/components/delivery/DeliveryLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Search, 
  Calendar as CalendarIcon, 
  Download, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Star,
  Package,
  CheckCircle,
  Target,
  Award,
  BarChart3,
  Filter,
  MapPin,
  Timer
} from "lucide-react";

export default function DeliveryHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("week");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Mock historical data
  const historyData = {
    totalDeliveries: 156,
    totalEarnings: 2340.75,
    averageRating: 4.8,
    averageTime: 22,
    successRate: 98.5,
    totalDistance: 423.6,
    totalTips: 245.50
  };

  const weeklyStats = [
    { day: "Lun", deliveries: 18, earnings: 245.50 },
    { day: "Mar", deliveries: 22, earnings: 320.75 },
    { day: "Mer", deliveries: 25, earnings: 385.25 },
    { day: "Jeu", deliveries: 20, earnings: 295.00 },
    { day: "Ven", deliveries: 28, earnings: 425.75 },
    { day: "Sam", deliveries: 35, earnings: 542.50 },
    { day: "Dim", deliveries: 8, earnings: 126.00 }
  ];

  const deliveryHistory = [
    {
      id: "LIV-156",
      orderId: "ORD-156",
      date: "2024-01-20",
      time: "18:45",
      customerName: "Sylvie Monga",
      address: "Av. Tombalbaye, Kinshasa",
      distance: "4.2 km",
      duration: "28 min",
      amount: 42.50,
      tip: 8.00,
      rating: 5,
      paymentMethod: "mobile",
      restaurant: "Congo Food Central"
    },
    {
      id: "LIV-155",
      orderId: "ORD-155",
      date: "2024-01-20",
      time: "17:30",
      customerName: "Robert Nsimba",
      address: "Av. de l'Université, Kinshasa",
      distance: "2.8 km",
      duration: "19 min",
      amount: 28.75,
      tip: 5.00,
      rating: 5,
      paymentMethod: "cash",
      restaurant: "Congo Food Gombe"
    },
    {
      id: "LIV-154",
      orderId: "ORD-154",
      date: "2024-01-20",
      time: "16:15",
      customerName: "Grace Kimuntu",
      address: "Av. des Cliniques, Kinshasa",
      distance: "3.5 km",
      duration: "25 min",
      amount: 35.25,
      tip: 3.50,
      rating: 4,
      paymentMethod: "card",
      restaurant: "Congo Food Central"
    },
    {
      id: "LIV-153",
      orderId: "ORD-153",
      date: "2024-01-20",
      time: "15:00",
      customerName: "Michel Kabila",
      address: "Av. Kalemie, Kinshasa",
      distance: "5.1 km",
      duration: "32 min",
      amount: 48.90,
      tip: 7.50,
      rating: 5,
      paymentMethod: "mobile",
      restaurant: "Congo Food Central"
    },
    {
      id: "LIV-152",
      orderId: "ORD-152",
      date: "2024-01-20",
      time: "13:45",
      customerName: "Jeanne Tshonga",
      address: "Av. Mama Yemo, Kinshasa",
      distance: "1.9 km",
      duration: "15 min",
      amount: 22.40,
      tip: 2.50,
      rating: 4,
      paymentMethod: "cash",
      restaurant: "Congo Food Gombe"
    }
  ];

  const filteredHistory = deliveryHistory.filter(delivery => {
    const matchesSearch = delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         delivery.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "cash": return "💵";
      case "mobile": return "📱";
      case "card": return "💳";
      default: return "💰";
    }
  };

  const exportData = () => {
    // Simulate CSV export
    alert("Export des données en cours... (Fonctionnalité simulée)");
  };

  return (
    <DeliveryLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Historique & Statistiques</h1>
              <p className="text-green-100">
                Analysez vos performances et suivez votre progression
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Livraisons</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{historyData.totalDeliveries}</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Gains Totaux</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">${historyData.totalEarnings}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <span>+${historyData.totalTips} en pourboires</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Note Moyenne</CardTitle>
              <Star className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{historyData.averageRating}★</div>
              <p className="text-xs text-purple-600 flex items-center mt-1">
                <Award className="w-3 h-3 mr-1" />
                Excellent service
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Taux de Succès</CardTitle>
              <Target className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{historyData.successRate}%</div>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <CheckCircle className="w-3 h-3 mr-1" />
                Performance excellente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Performance Chart */}
        <Card className="shadow-lg border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-800">
              <BarChart3 className="w-5 h-5 mr-2" />
              Performance de la Semaine
            </CardTitle>
            <CardDescription>
              Livraisons et gains des 7 derniers jours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 h-48">
              {weeklyStats.map((stat, index) => (
                <div key={stat.day} className="flex flex-col items-center space-y-2">
                  <div className="text-xs font-medium text-gray-600">{stat.day}</div>
                  <div className="flex-1 flex flex-col justify-end">
                    <div 
                      className="bg-gradient-to-t from-indigo-500 to-blue-400 rounded-t-md transition-all duration-500 hover:from-indigo-600 hover:to-blue-500 flex items-end justify-center pb-1"
                      style={{ 
                        height: `${(stat.deliveries / Math.max(...weeklyStats.map(s => s.deliveries))) * 100}%`,
                        minHeight: '20px',
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <span className="text-white text-xs font-bold">{stat.deliveries}</span>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-green-600">${stat.earnings}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="shadow-lg border-blue-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher dans l'historique..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="all">Tout l'historique</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? selectedDate.toLocaleDateString() : "Choisir une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Button onClick={exportData} variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                <Download className="w-4 h-4 mr-2" />
                Exporter CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        <Card className="shadow-lg border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-700" />
              Historique des Livraisons
            </CardTitle>
            <CardDescription>
              {filteredHistory.length} livraison{filteredHistory.length > 1 ? 's' : ''} trouvée{filteredHistory.length > 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredHistory.map((delivery, index) => (
                <div 
                  key={delivery.id} 
                  className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-200 animate-in fade-in-50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left: Customer Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">{delivery.customerName}</h4>
                        <Badge variant="outline" className="text-xs">
                          #{delivery.orderId}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="truncate">{delivery.address}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        📍 {delivery.restaurant}
                      </div>
                    </div>

                    {/* Middle: Performance Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-2 border border-blue-100">
                        <div className="text-xs text-gray-500">Distance</div>
                        <div className="font-semibold text-blue-600">{delivery.distance}</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-purple-100">
                        <div className="text-xs text-gray-500">Durée</div>
                        <div className="font-semibold text-purple-600 flex items-center">
                          <Timer className="w-3 h-3 mr-1" />
                          {delivery.duration}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-yellow-100">
                        <div className="text-xs text-gray-500">Note</div>
                        <div className="font-semibold text-yellow-600 flex items-center">
                          {Array.from({ length: delivery.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-gray-100">
                        <div className="text-xs text-gray-500">Paiement</div>
                        <div className="font-semibold text-gray-600">
                          {getPaymentMethodIcon(delivery.paymentMethod)}
                        </div>
                      </div>
                    </div>

                    {/* Right: Earnings & Time */}
                    <div className="space-y-2">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{delivery.date} à {delivery.time}</div>
                        <div className="text-lg font-bold text-green-600">${delivery.amount}</div>
                        {delivery.tip > 0 && (
                          <div className="text-sm text-green-500 flex items-center justify-end">
                            +${delivery.tip} pourboire
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Terminé
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHistory.length === 0 && (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucune livraison trouvée
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? "Aucune livraison ne correspond à votre recherche."
                    : "Aucune livraison dans l'historique pour cette période."
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <Award className="w-5 h-5 mr-2" />
                Réalisations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-purple-800">Top Performer</div>
                    <div className="text-xs text-purple-600">Note moyenne 4.8+ maintenue</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-800">Reliability Master</div>
                    <div className="text-xs text-green-600">98.5% de livraisons réussies</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-blue-800">Speed Demon</div>
                    <div className="text-xs text-blue-600">Temps moyen de 22 min</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-indigo-800">
                <TrendingUp className="w-5 h-5 mr-2" />
                Tendances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-indigo-700">Livraisons par jour</span>
                    <span className="font-semibold text-indigo-800">+15%</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-green-700">Gains moyens</span>
                    <span className="font-semibold text-green-800">+8%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-purple-700">Satisfaction client</span>
                    <span className="font-semibold text-purple-800">+5%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DeliveryLayout>
  );
}
