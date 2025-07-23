import { useState } from "react";
import { Link } from "react-router-dom";
import DeliveryLayout from "@/components/delivery/DeliveryLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Star,
  Navigation,
  Phone,
  CheckCircle,
  Truck,
  Timer,
  Target,
  Award,
  ArrowRight,
  Activity,
  User,
  Settings
} from "lucide-react";

export default function DeliveryDashboard() {
  // Mock data - in real app this would come from API
  const stats = {
    todayDeliveries: 12,
    todayEarnings: 125.50,
    weeklyDeliveries: 67,
    monthlyEarnings: 2340.75,
    rating: 4.8,
    onlineTime: "6h 30min",
    avgDeliveryTime: 18,
    successRate: 98.5
  };

  const todayGoal = {
    target: 15,
    current: 12,
    percentage: (12 / 15) * 100
  };

  const activeDeliveries = [
    {
      id: "LIV-001",
      orderId: "ORD-001",
      customerName: "Jean Mukendi",
      customerPhone: "+243 123 456 789",
      address: "Av. Lumumba, Kinshasa, Commune de Gombe",
      items: ["Moambé au Poulet", "Fufu na Ndakala"],
      total: 28.98,
      estimatedTime: "15 min",
      distance: "2.3 km",
      status: "en_route",
      priority: "normal"
    },
    {
      id: "LIV-002",
      orderId: "ORD-004",
      customerName: "Marie Kabila",
      customerPhone: "+243 987 654 321",
      address: "Avenue des Nations Unies, Kinshasa",
      items: ["Saka-Saka aux Crevettes"],
      total: 16.99,
      estimatedTime: "8 min",
      distance: "1.1 km",
      status: "pickup_ready",
      priority: "urgent"
    }
  ];

  const recentDeliveries = [
    {
      id: "LIV-003",
      time: "14:30",
      customer: "Pierre Mbuyi",
      amount: 36.58,
      rating: 5,
      tip: 5.00
    },
    {
      id: "LIV-004",
      time: "13:45",
      customer: "Fatou Konate",
      amount: 22.50,
      rating: 4,
      tip: 2.50
    },
    {
      id: "LIV-005",
      time: "12:15",
      customer: "David Kasongo",
      amount: 31.25,
      rating: 5,
      tip: 4.00
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pickup_ready": return "bg-blue-500";
      case "en_route": return "bg-orange-500";
      case "delivered": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pickup_ready": return "Prêt à récupérer";
      case "en_route": return "En route";
      case "delivered": return "Livré";
      default: return "Inconnu";
    }
  };

  return (
    <DeliveryLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl animate-in slide-in-from-top duration-700">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Bonjour Jacques ! 👋</h1>
              <p className="text-blue-100">
                Prêt pour une nouvelle journée de livraisons ? Vous avez {activeDeliveries.length} commandes en attente.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Truck className="w-10 h-10 text-white animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Livraisons Aujourd'hui</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{stats.todayDeliveries}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2 depuis hier
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Gains Aujourd'hui</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">${stats.todayEarnings}</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% cette semaine
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Note Moyenne</CardTitle>
              <Star className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">{stats.rating}★</div>
              <p className="text-xs text-purple-600 flex items-center mt-1">
                <Award className="w-3 h-3 mr-1" />
                Top performer
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Temps Moyen</CardTitle>
              <Timer className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{stats.avgDeliveryTime}min</div>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <Activity className="w-3 h-3 mr-1" />
                -2min ce mois
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Goal Progress */}
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-800">
              <Target className="w-5 h-5 mr-2" />
              Objectif Journalier
            </CardTitle>
            <CardDescription className="text-indigo-600">
              Progression vers votre objectif de {todayGoal.target} livraisons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-indigo-700">
                  {todayGoal.current} / {todayGoal.target} livraisons
                </span>
                <span className="text-sm text-indigo-600">
                  {Math.round(todayGoal.percentage)}%
                </span>
              </div>
              <Progress value={todayGoal.percentage} className="h-3" />
              <p className="text-xs text-indigo-600">
                Plus que {todayGoal.target - todayGoal.current} livraisons pour atteindre votre objectif !
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active Deliveries and Recent History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Deliveries */}
          <Card className="shadow-lg border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Navigation className="w-5 h-5 mr-2" />
                Livraisons Actives
              </CardTitle>
              <CardDescription>
                Commandes en cours de livraison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(delivery.status)} animate-pulse`} />
                        <div>
                          <h4 className="font-semibold text-gray-800">{delivery.customerName}</h4>
                          <p className="text-xs text-gray-600">Commande #{delivery.orderId}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={delivery.priority === "urgent" ? "destructive" : "secondary"}
                        className={delivery.priority === "urgent" ? "animate-pulse" : ""}
                      >
                        {delivery.priority === "urgent" ? "🔥 Urgent" : "Normal"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="truncate">{delivery.address}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>ETA: {delivery.estimatedTime}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span>{delivery.distance}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-600">${delivery.total}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <Phone className="w-3 h-3 mr-1" />
                          Appeler
                        </Button>
                        <Button size="sm" className="text-xs">
                          <Navigation className="w-3 h-3 mr-1" />
                          Naviguer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4 border-blue-200 text-blue-600 hover:bg-blue-50">
                <Link to="/delivery/orders">
                  Voir Toutes les Commandes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Deliveries */}
          <Card className="shadow-lg border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <CheckCircle className="w-5 h-5 mr-2" />
                Livraisons Récentes
              </CardTitle>
              <CardDescription>
                Vos dernières livraisons effectuées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDeliveries.map((delivery, index) => (
                  <div key={delivery.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100 hover:shadow-md transition-all duration-200" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{delivery.customer}</h4>
                          <p className="text-xs text-gray-600">Livré à {delivery.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">${delivery.amount}</div>
                        {delivery.tip > 0 && (
                          <div className="text-xs text-green-500">+${delivery.tip} pourboire</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < delivery.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        Terminé
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4 border-green-200 text-green-600 hover:bg-green-50">
                <Link to="/delivery/history">
                  Voir l'Historique Complet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-purple-800">Actions Rapides</CardTitle>
            <CardDescription className="text-purple-600">
              Accès rapide aux fonctionnalités importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 h-16">
                <Link to="/delivery/map">
                  <div className="text-center">
                    <MapPin className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-sm">Ouvrir la Carte</div>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 h-16">
                <Link to="/delivery/profile">
                  <div className="text-center">
                    <User className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-sm">Mon Profil</div>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 h-16">
                <Link to="/delivery/settings">
                  <div className="text-center">
                    <Settings className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-sm">Paramètres</div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DeliveryLayout>
  );
}
