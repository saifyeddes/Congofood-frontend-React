import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
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
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  SlidersHorizontal,
  Phone,
  Globe,
  Heart,
  Eye,
  Calendar,
  Utensils,
  DollarSign,
  Users,
  ChefHat,
  Award,
  Zap,
  Navigation,
  Target,
  Map,
  Crosshair,
  RefreshCw
} from "lucide-react";

export default function RestaurantSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  // Géolocalisation
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationCity, setLocationCity] = useState("");
  const [locationCountry, setLocationCountry] = useState("Congo (RDC)");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);

  // Mock data for restaurants with coordinates
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
      website: "www.mamacongo.cd",
      openingHours: "11:00 - 22:00",
      distance: "1.2 km",
      deliveryTime: "25-35 min",
      specialties: ["Moambé", "Saka-Saka", "Fufu"],
      features: ["Livraison", "Sur place", "À emporter"],
      description: "Restaurant traditionnel congolais offrant une expérience culinaire authentique dans un cadre chaleureux.",
      coordinates: { lat: -4.3317, lng: 15.3139 }, // Kinshasa centre
      city: "Kinshasa",
      country: "Congo (RDC)"
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
      website: "www.jardintropical.cd",
      openingHours: "12:00 - 23:00",
      distance: "2.1 km",
      deliveryTime: "30-40 min",
      specialties: ["Plats fusion", "Grillades", "Salades"],
      features: ["Terrasse", "Livraison", "Parking"],
      description: "Restaurant moderne proposant une cuisine fusion créative dans un cadre élégant avec terrasse.",
      coordinates: { lat: -4.3276, lng: 15.3222 }, // Gombe
      city: "Kinshasa",
      country: "Congo (RDC)"
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
      website: "www.saveursafrique.cd",
      openingHours: "10:00 - 21:00",
      distance: "0.8 km",
      deliveryTime: "20-30 min",
      specialties: ["Thieboudienne", "Attiéké", "Yassa"],
      features: ["Buffet", "Livraison", "Musique live"],
      description: "Découvrez les saveurs authentiques de l'Afrique dans une ambiance conviviale et musicale.",
      coordinates: { lat: -4.3290, lng: 15.3180 }, // Av. des Poids Lourds
      city: "Kinshasa",
      country: "Congo (RDC)"
    },
    {
      id: 4,
      name: "Fast Congo",
      category: "Fast Food",
      rating: 4.2,
      reviews: 341,
      priceRange: "$",
      image: "/api/placeholder/400/250",
      address: "Centre Commercial",
      phone: "+243 777 888 999",
      website: "www.fastcongo.cd",
      openingHours: "08:00 - 24:00",
      distance: "3.5 km",
      deliveryTime: "15-25 min",
      specialties: ["Burgers", "Sandwichs", "Salades"],
      features: ["Drive", "24h/24", "Wifi gratuit"],
      description: "Fast-food moderne proposant des plats rapides et savoureux disponibles 24h/24.",
      coordinates: { lat: -4.3400, lng: 15.3300 }, // Centre Commercial
      city: "Kinshasa",
      country: "Congo (RDC)"
    },
    // Restaurants dans d'autres villes
    {
      id: 5,
      name: "La Terrasse de Lubumbashi",
      category: "Cuisine Internationale",
      rating: 4.5,
      reviews: 78,
      priceRange: "$$$",
      image: "/api/placeholder/400/250",
      address: "Centre-ville, Lubumbashi",
      phone: "+243 998 765 432",
      website: "www.terrasselubumbashi.cd",
      openingHours: "12:00 - 22:00",
      distance: "850 km",
      deliveryTime: "N/A",
      specialties: ["Grillades", "Poissons", "Steaks"],
      features: ["Terrasse", "Bar", "Parking"],
      description: "Restaurant élégant au cœur de Lubumbashi avec vue panoramique.",
      coordinates: { lat: -11.6709, lng: 27.4794 }, // Lubumbashi
      city: "Lubumbashi",
      country: "Congo (RDC)"
    },
    {
      id: 6,
      name: "Chez Tantine Bukavu",
      category: "Cuisine Congolaise",
      rating: 4.6,
      reviews: 124,
      priceRange: "$$",
      image: "/api/placeholder/400/250",
      address: "Quartier Ibanda, Bukavu",
      phone: "+243 812 345 678",
      website: "www.cheztantine.cd",
      openingHours: "10:00 - 20:00",
      distance: "450 km",
      deliveryTime: "N/A",
      specialties: ["Sambaza", "Poisson du lac", "Légumes frais"],
      features: ["Vue sur lac", "Terrasse", "Spécialités locales"],
      description: "Restaurant familial avec vue sur le lac Kivu et spécialités de Bukavu.",
      coordinates: { lat: -2.5088, lng: 28.8632 }, // Bukavu
      city: "Bukavu",
      country: "Congo (RDC)"
    }
  ];

  // Fonction pour calculer la distance entre deux points (formule de Haversine)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Fonction pour obtenir la localisation de l'utilisateur
  const getCurrentLocation = () => {
    setIsGettingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setLocationCity("Position actuelle");
          setSortByDistance(true);
          setIsGettingLocation(false);
          alert("Localisation détectée ! Les restaurants sont maintenant triés par distance.");
        },
        (error) => {
          setIsGettingLocation(false);
          console.error("Erreur de géolocalisation:", error);
          alert("Impossible d'obtenir votre localisation. Veuillez saisir votre ville manuellement.");
        },
        { timeout: 10000, maximumAge: 600000 }
      );
    } else {
      setIsGettingLocation(false);
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  // Fonction pour geocoder une ville (simulation)
  const searchByCity = () => {
    if (!locationCity.trim()) {
      alert("Veuillez saisir une ville.");
      return;
    }

    // Simulation de géocodage pour quelques villes du Congo
    const cityCoordinates: { [key: string]: { lat: number, lng: number } } = {
      "kinshasa": { lat: -4.3317, lng: 15.3139 },
      "lubumbashi": { lat: -11.6709, lng: 27.4794 },
      "bukavu": { lat: -2.5088, lng: 28.8632 },
      "goma": { lat: -1.6792, lng: 29.2228 },
      "kisangani": { lat: 0.5167, lng: 25.2000 },
      "kananga": { lat: -5.8956, lng: 22.4669 },
      "mbuji-mayi": { lat: -6.1360, lng: 23.5897 }
    };

    const cityKey = locationCity.toLowerCase().trim();
    if (cityCoordinates[cityKey]) {
      setUserLocation(cityCoordinates[cityKey]);
      setSortByDistance(true);
      alert(`Localisation définie pour ${locationCity}. Les restaurants sont triés par distance.`);
    } else {
      // Coordonnées par défaut (Kinshasa)
      setUserLocation({ lat: -4.3317, lng: 15.3139 });
      setSortByDistance(true);
      alert(`Ville "${locationCity}" non trouvée. Position définie sur Kinshasa par défaut.`);
    }
  };

  const countries = [
    "Congo (RDC)", "Congo (Brazzaville)", "Angola", "Zambie", "Tanzanie",
    "Burundi", "Rwanda", "Ouganda", "Cameroun", "Gabon", "France", "Belgique"
  ];

  const categories = [
    { value: "all", label: "Toutes catégories" },
    { value: "congolaise", label: "Cuisine Congolaise" },
    { value: "africaine", label: "Cuisine Africaine" },
    { value: "fusion", label: "Cuisine Fusion" },
    { value: "fastfood", label: "Fast Food" },
    { value: "internationale", label: "Cuisine Internationale" }
  ];

  const priceRanges = [
    { value: "all", label: "Tous les prix" },
    { value: "$", label: "$ - Économique" },
    { value: "$$", label: "$$ - Modéré" },
    { value: "$$$", label: "$$$ - Élevé" },
    { value: "$$$$", label: "$$$$ - Luxe" }
  ];

  const ratingOptions = [
    { value: "all", label: "Toutes les notes" },
    { value: "4.5", label: "4.5+ étoiles" },
    { value: "4.0", label: "4.0+ étoiles" },
    { value: "3.5", label: "3.5+ étoiles" },
    { value: "3.0", label: "3.0+ étoiles" }
  ];

  const filteredRestaurants = restaurants
    .filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.specialties.some(specialty =>
                             specialty.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "all" ||
                             restaurant.category.toLowerCase().includes(selectedCategory);

      const matchesPrice = selectedPrice === "all" || restaurant.priceRange === selectedPrice;

      const matchesRating = selectedRating === "all" ||
                           restaurant.rating >= parseFloat(selectedRating);

      // Filtrage par ville/pays si spécifié
      const matchesLocation = !locationCity ||
                             restaurant.city.toLowerCase().includes(locationCity.toLowerCase()) ||
                             restaurant.country.toLowerCase().includes(locationCountry.toLowerCase());

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesLocation;
    })
    .map(restaurant => {
      // Calculer la distance si on a la localisation de l'utilisateur
      let calculatedDistance = null;
      if (userLocation && restaurant.coordinates) {
        calculatedDistance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          restaurant.coordinates.lat,
          restaurant.coordinates.lng
        );
      }

      return {
        ...restaurant,
        calculatedDistance,
        displayDistance: calculatedDistance
          ? calculatedDistance < 1
            ? `${Math.round(calculatedDistance * 1000)}m`
            : `${calculatedDistance.toFixed(1)}km`
          : restaurant.distance
      };
    })
    .sort((a, b) => {
      if (sortByDistance && a.calculatedDistance !== null && b.calculatedDistance !== null) {
        return a.calculatedDistance - b.calculatedDistance;
      }
      return 0; // Garder l'ordre original si pas de tri par distance
    });

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

  const RestaurantCard = ({ restaurant }: { restaurant: any }) => (
    <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white group">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
          <ChefHat className="w-16 h-16 text-white/80" />
        </div>
        <div className="absolute top-4 right-4">
          <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white text-red-500 hover:text-red-600">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-emerald-500 text-white font-bold">
            <Zap className="w-3 h-3 mr-1" />
            {restaurant.deliveryTime}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {restaurant.name}
              </h3>
              <p className="text-sm text-gray-600">{restaurant.category}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                {getRatingStars(restaurant.rating)}
              </div>
              <p className="text-sm text-gray-600">{restaurant.reviews} avis</p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-gray-600">{restaurant.address}</span>
              <Badge variant="outline" className="text-xs">{restaurant.distance}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">{restaurant.openingHours}</span>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">Spécialités:</p>
            <div className="flex flex-wrap gap-1">
              {restaurant.specialties.map((specialty: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {restaurant.features.map((feature: string, index: number) => (
              <Badge key={index} className="bg-blue-100 text-blue-700 text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="font-bold text-green-600">{restaurant.priceRange}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4 border-t border-gray-100">
            <Button 
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => window.location.href = `/restaurant/${restaurant.id}`}
            >
              <Eye className="w-4 h-4 mr-2" />
              Voir Menu
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Réserver
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Réserver une table</DialogTitle>
                  <DialogDescription>
                    Réservez votre table chez {restaurant.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input type="date" />
                  <Input type="time" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Nombre de personnes" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} personne{num > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                    Confirmer la réservation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-black mb-4">Trouvez Votre Restaurant</h1>
              <p className="text-xl text-emerald-100">
                Découvrez les meilleurs restaurants près de chez vous
              </p>
            </div>

            {/* Quick Search */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                    <Input
                      placeholder="Rechercher un restaurant, une cuisine..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg py-6"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    variant="outline" 
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filtres
                  </Button>
                </div>

                {/* Advanced Search */}
                {showAdvancedSearch && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white">
                          <SelectValue placeholder="Gamme de prix" />
                        </SelectTrigger>
                        <SelectContent>
                          {priceRanges.map(price => (
                            <SelectItem key={price.value} value={price.value}>
                              {price.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedRating} onValueChange={setSelectedRating}>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white">
                          <SelectValue placeholder="Note minimum" />
                        </SelectTrigger>
                        <SelectContent>
                          {ratingOptions.map(rating => (
                            <SelectItem key={rating.value} value={rating.value}>
                              {rating.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Restaurants trouvés ({filteredRestaurants.length})
              </h2>
              <p className="text-gray-600 mt-2">
                {searchTerm && `Résultats pour "${searchTerm}"`}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-emerald-500 text-white px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Nouveaux restaurants cette semaine
              </Badge>
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="animate-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Aucun restaurant trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedPrice("all");
                  setSelectedRating("all");
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
