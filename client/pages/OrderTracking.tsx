import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Phone,
  Truck,
  Package,
  CheckCircle,
  Timer,
  Star,
  Navigation,
  MessageSquare,
  AlertCircle,
  Zap,
  Users,
  Utensils,
  CreditCard,
  Award,
  RefreshCw,
  Eye,
  ArrowRight
} from "lucide-react";

export default function OrderTracking() {
  const [trackingId, setTrackingId] = useState("TRK-789123");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock tracking data
  const trackingData = {
    orderId: "ORD-2024-001",
    trackingId: "TRK-789123",
    status: "en_route",
    restaurant: {
      name: "Chez Mama Congo",
      address: "Av. Lumumba, Kinshasa",
      phone: "+243 123 456 789",
      rating: 4.8
    },
    customer: {
      name: "Jean Mukendi",
      address: "Résidence Royale, Appartement 15B",
      phone: "+243 987 654 321"
    },
    driver: {
      name: "Jacques Tshisekedi",
      phone: "+243 555 789 123",
      vehicle: "Moto Honda - ABC 123",
      rating: 4.9,
      photo: "/api/placeholder/100/100"
    },
    items: [
      { name: "Moambé au Poulet", quantity: 2, price: 15.99 },
      { name: "Fufu na Ndakala", quantity: 1, price: 8.99 },
      { name: "Saka-Saka aux Crevettes", quantity: 1, price: 12.99 }
    ],
    timeline: [
      {
        status: "confirmed",
        time: "14:30",
        title: "Commande confirmée",
        description: "Votre commande a été reçue et confirmée",
        completed: true,
        icon: CheckCircle
      },
      {
        status: "preparing",
        time: "14:35",
        title: "Préparation en cours",
        description: "Le restaurant prépare votre commande",
        completed: true,
        icon: Utensils
      },
      {
        status: "ready",
        time: "15:05",
        title: "Commande prête",
        description: "Votre commande est prête pour la livraison",
        completed: true,
        icon: Package
      },
      {
        status: "picked_up",
        time: "15:12",
        title: "Récupérée par le livreur",
        description: "Le livreur a récupéré votre commande",
        completed: true,
        icon: Truck
      },
      {
        status: "en_route",
        time: "15:15",
        title: "En route vers vous",
        description: "Le livreur est en route vers votre adresse",
        completed: false,
        current: true,
        icon: Navigation
      },
      {
        status: "delivered",
        time: "15:45",
        title: "Livraison attendue",
        description: "Votre commande sera livrée",
        completed: false,
        icon: CheckCircle
      }
    ],
    estimatedDelivery: "15:45",
    totalAmount: 53.96,
    paymentMethod: "Mobile Money",
    orderNotes: "Sonner à l'interphone, Appartement 15B"
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-blue-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmée
          </Badge>
        );
      case "preparing":
        return (
          <Badge className="bg-orange-500 text-white animate-pulse">
            <Utensils className="w-3 h-3 mr-1" />
            En préparation
          </Badge>
        );
      case "ready":
        return (
          <Badge className="bg-green-500 text-white">
            <Package className="w-3 h-3 mr-1" />
            Prête
          </Badge>
        );
      case "en_route":
        return (
          <Badge className="bg-purple-500 text-white animate-pulse">
            <Truck className="w-3 h-3 mr-1" />
            En route
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-green-600 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Livrée
          </Badge>
        );
      default:
        return <Badge className="bg-gray-500 text-white">{status}</Badge>;
    }
  };

  const getTimeRemaining = () => {
    const estimated = new Date();
    const [hours, minutes] = trackingData.estimatedDelivery.split(':');
    estimated.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const diff = estimated.getTime() - currentTime.getTime();
    const minutesRemaining = Math.max(0, Math.ceil(diff / (1000 * 60)));
    
    return minutesRemaining;
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "text-yellow-400 fill-current" 
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-black mb-4">Suivi de Commande</h1>
              <p className="text-xl text-emerald-100">
                Suivez votre commande en temps réel
              </p>
            </div>

            {/* Quick Tracking Input */}
            <div className="max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <div className="flex space-x-3">
                  <Input
                    placeholder="Entrez votre ID de suivi"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                  <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tracking Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Status */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">
                      Commande {trackingData.orderId}
                    </CardTitle>
                    {getStatusBadge(trackingData.status)}
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Restaurant</h4>
                        <div className="space-y-2">
                          <p className="font-bold text-emerald-600">{trackingData.restaurant.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{trackingData.restaurant.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getRatingStars(trackingData.restaurant.rating)}
                            <span className="text-sm text-gray-600">({trackingData.restaurant.rating})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Livraison à</h4>
                        <div className="space-y-2">
                          <p className="font-bold text-blue-600">{trackingData.customer.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{trackingData.customer.address}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{trackingData.customer.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                          <Timer className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Livraison estimée</h4>
                          <p className="text-sm text-gray-600">Dans environ {getTimeRemaining()} minutes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-600">{trackingData.estimatedDelivery}</div>
                        <p className="text-sm text-gray-600">Aujourd'hui</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Driver Info */}
              {trackingData.status === "en_route" && (
                <Card className="border-0 shadow-xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <Truck className="w-6 h-6 mr-3" />
                      Votre Livreur
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900">{trackingData.driver.name}</h4>
                        <div className="flex items-center space-x-1 mb-2">
                          {getRatingStars(trackingData.driver.rating)}
                          <span className="text-sm text-gray-600 ml-1">({trackingData.driver.rating})</span>
                        </div>
                        <p className="text-sm text-gray-600">{trackingData.driver.vehicle}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
                          <Phone className="w-4 h-4 mr-2" />
                          Appeler
                        </Button>
                        <Button size="sm" variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Live Map */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <MapPin className="w-6 h-6 mr-3" />
                    Localisation en Temps Réel
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
                      <div className="absolute top-8 right-12 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-6 left-8 w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    </div>
                    
                    <div className="text-center z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Navigation className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-700 mb-2">Carte Interactive</h3>
                      <p className="text-gray-500">Suivez votre livreur en temps réel</p>
                      <Button className="mt-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                        <Zap className="w-4 h-4 mr-2" />
                        Activer la géolocalisation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Timeline */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                  <CardTitle className="text-xl font-bold">Suivi de la Commande</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {trackingData.timeline.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? 'bg-emerald-500 text-white' 
                            : step.current 
                              ? 'bg-blue-500 text-white animate-pulse'
                              : 'bg-gray-200 text-gray-400'
                        }`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-semibold ${
                              step.completed ? 'text-emerald-600' : 
                              step.current ? 'text-blue-600' : 'text-gray-400'
                            }`}>
                              {step.title}
                            </h4>
                            <span className="text-sm text-gray-500">{step.time}</span>
                          </div>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          {step.current && (
                            <div className="flex items-center space-x-1 mt-2">
                              <Zap className="w-3 h-3 text-blue-500" />
                              <span className="text-xs text-blue-600 font-medium">En cours</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle className="text-xl font-bold">Résumé de la Commande</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Items */}
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Articles commandés</h5>
                      <div className="space-y-2">
                        {trackingData.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm">{item.quantity}x {item.name}</span>
                            <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="text-xl font-black text-emerald-600">${trackingData.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CreditCard className="w-4 h-4" />
                        <span>{trackingData.paymentMethod}</span>
                      </div>
                    </div>

                    {/* Order Notes */}
                    {trackingData.orderNotes && (
                      <div className="pt-3 border-t border-gray-200">
                        <h5 className="font-semibold text-gray-900 mb-2">Notes spéciales</h5>
                        <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded-lg">{trackingData.orderNotes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-6 space-y-3">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Actualiser le suivi
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contacter le support
                  </Button>
                  <Button variant="outline" className="w-full">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Signaler un problème
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
