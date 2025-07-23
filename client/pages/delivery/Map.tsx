import { useState } from "react";
import DeliveryLayout from "@/components/delivery/DeliveryLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Phone, 
  Route, 
  Layers,
  ZoomIn,
  ZoomOut,
  Target,
  Truck,
  Package,
  Flag,
  Home
} from "lucide-react";

export default function DeliveryMap() {
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [mapView, setMapView] = useState<"satellite" | "roadmap" | "hybrid">("roadmap");

  // Mock data for deliveries on map
  const deliveries = [
    {
      id: "DEL-001",
      orderId: "ORD-001",
      customerName: "Jean Mukendi",
      address: "Av. Lumumba 123, Kinshasa",
      coordinates: { lat: -4.3217, lng: 15.3014 },
      status: "ready",
      priority: "normal",
      estimatedTime: "25 min",
      distance: "3.2 km",
      total: 28.98
    },
    {
      id: "DEL-002",
      orderId: "ORD-004",
      customerName: "Marie Kabila",
      address: "Avenue des Nations Unies 45, Kinshasa",
      coordinates: { lat: -4.3115, lng: 15.2994 },
      status: "assigned",
      priority: "urgent",
      estimatedTime: "15 min",
      distance: "1.8 km",
      total: 33.98
    },
    {
      id: "DEL-003",
      orderId: "ORD-007",
      customerName: "Pierre Mbuyi",
      address: "Av. des Poids Lourds 78, Kinshasa",
      coordinates: { lat: -4.3398, lng: 15.3235 },
      status: "en_route",
      priority: "express",
      estimatedTime: "10 min",
      distance: "2.1 km",
      total: 30.98
    }
  ];

  // Driver current location
  const driverLocation = { lat: -4.3286, lng: 15.3124 };

  // Restaurant locations
  const restaurants = [
    {
      name: "Congo Food Central",
      address: "Av. Lumumba, Kinshasa",
      coordinates: { lat: -4.3167, lng: 15.3083 }
    },
    {
      name: "Congo Food Gombe",
      address: "Av. du Port, Gombe",
      coordinates: { lat: -4.3198, lng: 15.2943 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-blue-500";
      case "assigned": return "bg-yellow-500";
      case "picked_up": return "bg-purple-500";
      case "en_route": return "bg-orange-500";
      case "delivered": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ready": return "Prêt";
      case "assigned": return "Assigné";
      case "picked_up": return "Récupéré";
      case "en_route": return "En route";
      case "delivered": return "Livré";
      default: return "Inconnu";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent": return "🔥";
      case "express": return "⚡";
      default: return "📦";
    }
  };

  const openGoogleMaps = (coordinates: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps/dir/${driverLocation.lat},${driverLocation.lng}/${coordinates.lat},${coordinates.lng}/@${coordinates.lat},${coordinates.lng},15z/data=!3m1!4b1!4m2!4m1!3e0`;
    window.open(url, '_blank');
  };

  return (
    <DeliveryLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Carte & Navigation</h1>
              <p className="text-blue-100">
                Visualisez toutes vos livraisons et naviguez efficacement
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-blue-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Carte Interactive
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={mapView === "roadmap" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMapView("roadmap")}
                    >
                      Route
                    </Button>
                    <Button
                      variant={mapView === "satellite" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMapView("satellite")}
                    >
                      Satellite
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Google Maps Embed Simulation */}
                <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-xl h-96 border-2 border-blue-200 overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-100 to-blue-300">
                    {/* Kinshasa street pattern simulation */}
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px),
                        linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px'
                    }} />
                  </div>

                  {/* Driver Location */}
                  <div 
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ 
                      left: '45%', 
                      top: '55%'
                    }}
                  >
                    <div className="relative">
                      <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
                      <div className="absolute -top-8 -left-8 bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        Votre Position
                      </div>
                    </div>
                  </div>

                  {/* Restaurant Locations */}
                  {restaurants.map((restaurant, index) => (
                    <div 
                      key={index}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{ 
                        left: `${40 + index * 15}%`, 
                        top: `${50 + index * 10}%`
                      }}
                    >
                      <div className="relative">
                        <div className="w-3 h-3 bg-purple-600 rounded-full shadow-lg border border-white"></div>
                        <Home className="w-4 h-4 text-purple-600 absolute -top-1 -left-0.5" />
                      </div>
                    </div>
                  ))}

                  {/* Delivery Points */}
                  {deliveries.map((delivery, index) => (
                    <div 
                      key={delivery.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-15 cursor-pointer"
                      style={{ 
                        left: `${50 + (index - 1) * 15}%`, 
                        top: `${45 + (index - 1) * 20}%`
                      }}
                      onClick={() => setSelectedDelivery(delivery)}
                    >
                      <div className="relative">
                        <div className={`w-4 h-4 ${getStatusColor(delivery.status)} rounded-full shadow-lg border-2 border-white animate-bounce`}>
                          <span className="absolute -top-2 -left-1 text-xs">
                            {getPriorityIcon(delivery.priority)}
                          </span>
                        </div>
                        {selectedDelivery?.id === delivery.id && (
                          <div className="absolute -top-12 -left-16 bg-white rounded-lg shadow-lg p-2 border border-gray-200 whitespace-nowrap z-30">
                            <div className="text-xs font-semibold">{delivery.customerName}</div>
                            <div className="text-xs text-gray-600">{delivery.estimatedTime}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Route Lines (simulation) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <pattern id="dashed" patternUnits="userSpaceOnUse" width="10" height="2">
                        <rect width="5" height="2" fill="rgb(59, 130, 246)" />
                      </pattern>
                    </defs>
                    {deliveries.map((_, index) => (
                      <line
                        key={index}
                        x1="45%"
                        y1="55%"
                        x2={`${50 + (index - 1) * 15}%`}
                        y2={`${45 + (index - 1) * 20}%`}
                        stroke="url(#dashed)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                      />
                    ))}
                  </svg>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
                      <Target className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="text-xs font-semibold mb-2">Légende</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span>Votre position</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Home className="w-3 h-3 text-purple-600" />
                        <span>Restaurants</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span>Livraisons</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button 
                    onClick={() => window.open('https://www.google.com/maps', '_blank')}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Ouvrir Google Maps
                  </Button>
                  <Button variant="outline" className="border-blue-200 text-blue-600">
                    <Route className="w-4 h-4 mr-2" />
                    Optimiser Route
                  </Button>
                  <Button variant="outline" className="border-blue-200 text-blue-600">
                    <Layers className="w-4 h-4 mr-2" />
                    Couches
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Location */}
            <Card className="shadow-lg border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Truck className="w-5 h-5 mr-2" />
                  Ma Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-800">En ligne</span>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      📍 Av. Lumumba, Gombe
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    Coordonnées: {driverLocation.lat.toFixed(4)}, {driverLocation.lng.toFixed(4)}
                  </div>
                  <Button size="sm" variant="outline" className="w-full border-green-200 text-green-600">
                    <Target className="w-4 h-4 mr-2" />
                    Centrer sur ma position
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Deliveries List */}
            <Card className="shadow-lg border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Package className="w-5 h-5 mr-2" />
                  Livraisons Actives
                </CardTitle>
                <CardDescription>
                  Cliquez sur une livraison pour la voir sur la carte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deliveries.map((delivery) => (
                    <div 
                      key={delivery.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedDelivery?.id === delivery.id 
                          ? 'bg-blue-50 border-blue-300 shadow-md' 
                          : 'bg-gray-50 border-gray-200 hover:bg-blue-50'
                      }`}
                      onClick={() => setSelectedDelivery(delivery)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(delivery.status)}`}></div>
                          <span className="font-medium text-sm">{delivery.customerName}</span>
                        </div>
                        <span className="text-xs text-gray-500">#{delivery.orderId}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {delivery.estimatedTime}
                          </span>
                          <span className="font-semibold text-green-600">${delivery.total}</span>
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          📍 {delivery.address}
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            openGoogleMaps(delivery.coordinates);
                          }}
                          className="flex-1 text-xs"
                        >
                          <Navigation className="w-3 h-3 mr-1" />
                          Naviguer
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`tel:+243123456789`, '_self');
                          }}
                          className="text-xs"
                        >
                          <Phone className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <Flag className="w-5 h-5 mr-2" />
                  Statistiques Rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <div className="text-sm font-medium text-purple-800">Distance Totale</div>
                    <div className="text-lg font-bold text-purple-700">
                      {deliveries.reduce((total, d) => total + parseFloat(d.distance), 0).toFixed(1)} km
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                    <div className="text-sm font-medium text-orange-800">Temps Estimé</div>
                    <div className="text-lg font-bold text-orange-700">
                      {deliveries.reduce((total, d) => total + parseInt(d.estimatedTime), 0)} min
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="text-sm font-medium text-green-800">Valeur Totale</div>
                    <div className="text-lg font-bold text-green-700">
                      ${deliveries.reduce((total, d) => total + d.total, 0).toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DeliveryLayout>
  );
}
