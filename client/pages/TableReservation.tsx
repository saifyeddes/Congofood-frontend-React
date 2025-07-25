import { useState } from "react";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Users,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  AlertCircle,
  Utensils,
  ChefHat,
  Heart,
  Award,
  Sparkles,
  Gift,
  Music,
  Wifi,
  Car
} from "lucide-react";

export default function TableReservation() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    phone: "",
    email: "",
    specialRequests: "",
    occasion: ""
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Chez Mama Congo",
      category: "Cuisine Congolaise",
      rating: 4.8,
      reviews: 156,
      priceRange: "$$$",
      image: "/api/placeholder/400/250",
      address: "Av. Lumumba, Kinshasa",
      phone: "+243 123 456 789",
      openingHours: "11:00 - 22:00",
      features: ["Terrasse", "Musique live", "Parking"],
      tables: {
        small: { available: 8, capacity: "2-4 personnes" },
        medium: { available: 6, capacity: "4-6 personnes" },
        large: { available: 3, capacity: "6-8 personnes" },
        vip: { available: 2, capacity: "8+ personnes" }
      },
      specialOccasions: ["Anniversaire", "Dîner d'affaires", "Demande en mariage", "Célébration famille"],
      description: "Restaurant traditionnel congolais dans un cadre authentique et chaleureux."
    },
    {
      id: 2,
      name: "Le Jardin Tropical",
      category: "Cuisine Fusion",
      rating: 4.6,
      reviews: 89,
      priceRange: "$$$$",
      image: "/api/placeholder/400/250",
      address: "Commune de Gombe",
      phone: "+243 987 654 321",
      openingHours: "12:00 - 23:00",
      features: ["Terrasse panoramique", "Bar cocktails", "Wifi gratuit"],
      tables: {
        small: { available: 12, capacity: "2-4 personnes" },
        medium: { available: 8, capacity: "4-6 personnes" },
        large: { available: 5, capacity: "6-8 personnes" },
        vip: { available: 3, capacity: "8+ personnes" }
      },
      specialOccasions: ["Dîner romantique", "Réunion d'affaires", "Anniversaire", "Événement privé"],
      description: "Restaurant élégant avec terrasse panoramique et cuisine fusion créative."
    },
    {
      id: 3,
      name: "Saveurs d'Afrique",
      category: "Cuisine Africaine",
      rating: 4.7,
      reviews: 203,
      priceRange: "$$",
      image: "/api/placeholder/400/250",
      address: "Av. des Poids Lourds",
      phone: "+243 555 123 456",
      openingHours: "10:00 - 21:00",
      features: ["Buffet", "Spectacle traditionnel", "Ambiance familiale"],
      tables: {
        small: { available: 15, capacity: "2-4 personnes" },
        medium: { available: 10, capacity: "4-6 personnes" },
        large: { available: 7, capacity: "6-8 personnes" },
        vip: { available: 4, capacity: "8+ personnes" }
      },
      specialOccasions: ["Fête famille", "Baptême", "Anniversaire", "Réunion amis"],
      description: "Restaurant convivial proposant un voyage culinaire à travers l'Afrique."
    }
  ];

  const timeSlots = [
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
  ];

  const occasions = [
    "Dîner romantique", "Anniversaire", "Dîner d'affaires", "Fête famille",
    "Demande en mariage", "Célébration", "Réunion amis", "Événement spécial"
  ];

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

  const handleReservation = () => {
    // Simulate reservation submission
    setShowConfirmation(true);
  };

  const RestaurantCard = ({ restaurant }: { restaurant: any }) => (
    <Card 
      className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
        selectedRestaurant?.id === restaurant.id 
          ? 'ring-2 ring-emerald-500 bg-emerald-50' 
          : 'hover:scale-105'
      }`}
      onClick={() => setSelectedRestaurant(restaurant)}
    >
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
          <ChefHat className="w-16 h-16 text-white/80" />
        </div>
        {selectedRestaurant?.id === restaurant.id && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-emerald-500 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Sélectionné
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
              <p className="text-sm text-gray-600">{restaurant.category}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                {getRatingStars(restaurant.rating)}
              </div>
              <p className="text-sm text-gray-600">{restaurant.reviews} avis</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-gray-600">{restaurant.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">{restaurant.openingHours}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {restaurant.features.map((feature: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-gray-700">{restaurant.description}</p>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="font-semibold text-emerald-600">Tables 2-4p</div>
              <div className="text-gray-600">{restaurant.tables.small.available} disponibles</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="font-semibold text-blue-600">Tables 4-6p</div>
              <div className="text-gray-600">{restaurant.tables.medium.available} disponibles</div>
            </div>
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
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-black mb-4">Réservez Votre Table</h1>
            <p className="text-xl text-emerald-100 mb-8">
              Réservez en quelques clics dans les meilleurs restaurants de Kinshasa
            </p>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-emerald-300" />
                <span>Confirmation immédiate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="w-6 h-6 text-emerald-300" />
                <span>Offres spéciales</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-emerald-300" />
                <span>Service personnalisé</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Restaurant Selection */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Choisissez votre restaurant
                </h2>
                <p className="text-gray-600">
                  Sélectionnez le restaurant où vous souhaitez réserver une table
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurants.map((restaurant, index) => (
                  <div
                    key={restaurant.id}
                    className="animate-in slide-in-from-bottom duration-1000"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}
              </div>
            </div>

            {/* Reservation Form */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-2xl sticky top-6">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-6 h-6" />
                    <span>Détails de la réservation</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  {!selectedRestaurant ? (
                    <div className="text-center py-8">
                      <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Sélectionnez un restaurant
                      </h3>
                      <p className="text-sm text-gray-500">
                        Choisissez d'abord un restaurant pour continuer votre réservation
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Selected Restaurant Info */}
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <h4 className="font-bold text-emerald-800 mb-2">
                          {selectedRestaurant.name}
                        </h4>
                        <div className="space-y-1 text-sm text-emerald-700">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-3 h-3" />
                            <span>{selectedRestaurant.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-3 h-3" />
                            <span>{selectedRestaurant.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date de réservation *
                          </label>
                          <Input
                            type="date"
                            value={reservationData.date}
                            onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Heure *
                          </label>
                          <Select 
                            value={reservationData.time} 
                            onValueChange={(value) => setReservationData({...reservationData, time: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir l'heure" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map(time => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nombre de personnes *
                          </label>
                          <Select 
                            value={reservationData.guests} 
                            onValueChange={(value) => setReservationData({...reservationData, guests: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Nombre de convives" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} personne{num > 1 ? 's' : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Informations de contact</h4>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nom complet *
                          </label>
                          <Input
                            type="text"
                            placeholder="Votre nom complet"
                            value={reservationData.name}
                            onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Téléphone *
                          </label>
                          <Input
                            type="tel"
                            placeholder="+243 123 456 789"
                            value={reservationData.phone}
                            onChange={(e) => setReservationData({...reservationData, phone: e.target.value})}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                          </label>
                          <Input
                            type="email"
                            placeholder="votre@email.com"
                            value={reservationData.email}
                            onChange={(e) => setReservationData({...reservationData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Special Occasion */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Occasion spéciale
                        </label>
                        <Select 
                          value={reservationData.occasion} 
                          onValueChange={(value) => setReservationData({...reservationData, occasion: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner l'occasion" />
                          </SelectTrigger>
                          <SelectContent>
                            {occasions.map(occasion => (
                              <SelectItem key={occasion} value={occasion}>
                                {occasion}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Special Requests */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Demandes spéciales
                        </label>
                        <Textarea
                          placeholder="Allergies, préférences de table, etc."
                          value={reservationData.specialRequests}
                          onChange={(e) => setReservationData({...reservationData, specialRequests: e.target.value})}
                          rows={3}
                        />
                      </div>

                      {/* Confirmation Button */}
                      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-lg py-6"
                            onClick={handleReservation}
                            disabled={!reservationData.date || !reservationData.time || !reservationData.guests || !reservationData.name || !reservationData.phone}
                          >
                            <Sparkles className="w-5 h-5 mr-2" />
                            Confirmer la réservation
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2 text-emerald-600">
                              <CheckCircle className="w-6 h-6" />
                              <span>Réservation confirmée !</span>
                            </DialogTitle>
                            <DialogDescription className="space-y-4 pt-4">
                              <div className="bg-emerald-50 rounded-lg p-4">
                                <h4 className="font-bold text-emerald-800 mb-2">Détails de votre réservation:</h4>
                                <div className="space-y-2 text-sm text-emerald-700">
                                  <div><strong>Restaurant:</strong> {selectedRestaurant.name}</div>
                                  <div><strong>Date:</strong> {reservationData.date}</div>
                                  <div><strong>Heure:</strong> {reservationData.time}</div>
                                  <div><strong>Personnes:</strong> {reservationData.guests}</div>
                                  <div><strong>Nom:</strong> {reservationData.name}</div>
                                </div>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-600 mb-4">
                                  Un SMS de confirmation vous sera envoyé au {reservationData.phone}
                                </p>
                                <Button 
                                  onClick={() => setShowConfirmation(false)}
                                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                                >
                                  Parfait !
                                </Button>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      </ProtectedRoute>
    </Layout>
  );
}
