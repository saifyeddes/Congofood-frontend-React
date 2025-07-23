import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Clock,
  Star,
  Truck,
  Shield,
  Utensils,
  MapPin,
  Phone,
  Plus,
  Sparkles,
  Heart,
  Award,
  Zap,
  ChefHat,
  Users,
  Leaf
} from "lucide-react";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const { dispatch } = useCart();

  const addToCart = (dish: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image
      }
    });
  };

  const featuredDishes = [
    {
      id: 1,
      name: "Moambé au Poulet",
      description: "Poulet mijoté dans une sauce onctueuse aux noix de palme, servi avec du riz",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop&crop=center",
      rating: 4.9,
      category: "popular",
      preparationTime: "25-30 min"
    },
    {
      id: 2,
      name: "Poisson à la Congolaise",
      description: "Poisson frais grillé aux épices locales, accompagné de légumes sautés",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=200&fit=crop&crop=center",
      rating: 4.8,
      category: "popular",
      preparationTime: "20-25 min"
    },
    {
      id: 3,
      name: "Saka-Saka aux Crevettes",
      description: "Feuilles de manioc cuisinées avec des crevettes fraîches et arachides",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center",
      rating: 4.7,
      category: "popular",
      preparationTime: "30-35 min"
    },
    {
      id: 4,
      name: "Liboke de Porc",
      description: "Porc mariné et cuit à la vapeur dans des feuilles de bananier",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop&crop=center",
      rating: 4.6,
      category: "popular",
      preparationTime: "35-40 min"
    }
  ];

  const categories = [
    { id: "popular", name: "Popular", count: 12 },
    { id: "healthy", name: "Healthy", count: 8 },
    { id: "comfort", name: "Comfort Food", count: 15 },
    { id: "desserts", name: "Desserts", count: 6 }
  ];

  const filteredDishes = featuredDishes.filter(dish => 
    selectedCategory === "popular" ? true : dish.category === selectedCategory
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-in slide-in-from-left duration-1000">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 px-6 py-2 text-sm animate-bounce">
                  <Sparkles className="mr-2 w-4 h-4" />
                  Livraison Express en 30 minutes
                </Badge>

                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    Saveurs du Congo
                  </span>
                  <br />
                  <span className="text-gray-700 text-4xl lg:text-5xl font-light">
                    à votre porte
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-600 max-w-xl leading-relaxed">
                  Découvrez l'art culinaire congolais avec nos plats authentiques,
                  préparés par des chefs passionnés et livrés avec amour.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-10 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Link to="/menu">
                    <ChefHat className="mr-2 w-6 h-6" />
                    Commander Maintenant
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-4 border-2 border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300"
                >
                  <Phone className="mr-2 w-6 h-6" />
                  (+243) 123-456-789
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { number: "30", label: "Min. Livraison", icon: Clock },
                  { number: "4.9", label: "Note Clients", icon: Star },
                  { number: "15K+", label: "Clients Heureux", icon: Heart }
                ].map((stat, index) => (
                  <div key={index} className="text-center group animate-in fade-in duration-1000" style={{ animationDelay: `${index * 200}ms` }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-black text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-in slide-in-from-right duration-1000 delay-300">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
                <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-100 p-4">
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&crop=center"
                    alt="Délicieux plats congolais"
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl"
                  />
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">100% Frais</div>
                      <div className="text-xs text-gray-600">Ingrédients locaux</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float delay-1000">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Chef Expert</div>
                      <div className="text-xs text-gray-600">Cuisine authentique</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-blue-200/50 rounded-3xl transform rotate-6 scale-105 -z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-200/50 to-pink-200/50 rounded-3xl transform -rotate-3 scale-95 -z-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-emerald-100/50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16 animate-in fade-in duration-1000">
            <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 px-6 py-2">
              <Sparkles className="mr-2 w-4 h-4" />
              Nos Spécialités
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-black text-gray-900">
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Plats Vedettes
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre sélection de spécialités congolaises authentiques,
              préparées avec passion par nos chefs experts
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 animate-in slide-in-from-bottom duration-1000 delay-300">
            {categories.map((category, index) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 animate-in fade-in delay-${index * 100} ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-lg transform hover:-translate-y-1"
                    : "border-2 hover:border-emerald-500 hover:bg-emerald-50"
                }`}
              >
                {category.name}
                <Badge
                  variant="secondary"
                  className={`ml-2 ${selectedCategory === category.id ? "bg-white/20 text-white" : ""}`}
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredDishes.map((dish, index) => (
              <Card
                key={dish.id}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-white/80 backdrop-blur-sm animate-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>

                    <Badge className="absolute top-4 left-4 bg-white/95 text-gray-900 border-0 shadow-lg">
                      <Clock className="w-3 h-3 mr-1" />
                      {dish.preparationTime}
                    </Badge>

                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                      {dish.name}
                    </CardTitle>
                    <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-yellow-600">{dish.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-600">${dish.price}</span>
                    <Badge variant="outline" className="text-xs font-medium">
                      Authentique
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => addToCart(dish)}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Ajouter au Panier
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16 animate-in fade-in duration-1000 delay-1000">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link to="/menu">
                Voir le Menu Complet
                <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-20 animate-in fade-in duration-1000">
            <Badge className="bg-gradient-to-r from-emerald-400 to-blue-400 text-gray-900 border-0 px-6 py-2 font-semibold">
              <Zap className="mr-2 w-4 h-4" />
              Processus Simple
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-black text-white">
              Comment Ça Marche
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Trois étapes simples pour savourer l'authenticité congolaise depuis le confort de votre foyer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                icon: Utensils,
                title: "Explorez & Choisissez",
                description: "Parcourez notre collection de plats authentiques congolais, chacun préparé selon les traditions ancestrales",
                color: "from-emerald-400 to-green-500"
              },
              {
                step: "02",
                icon: MapPin,
                title: "Commandez en Sécurité",
                description: "Ajoutez vos favoris au panier, confirmez votre adresse et choisissez votre mode de paiement préféré",
                color: "from-blue-400 to-indigo-500"
              },
              {
                step: "03",
                icon: Truck,
                title: "Savourez Rapidement",
                description: "Relaxez-vous pendant que nos chefs préparent votre commande et nos livreurs vous l'apportent en 30 minutes",
                color: "from-purple-400 to-pink-500"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="relative text-center space-y-6 group animate-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span className="text-2xl font-black text-white">{item.step}</span>
                </div>

                {/* Icon Container */}
                <div className="relative mx-auto w-24 h-24">
                  <div className={`w-full h-full bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6`}>
                    <item.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`}></div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">
                    {item.description}
                  </p>
                </div>

                {/* Connection Line (except last item) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-12 h-0.5 bg-gradient-to-r from-white/30 to-transparent transform translate-x-8"></div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20 animate-in fade-in duration-1000 delay-1000">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Link to="/menu">
                Commencer Maintenant
                <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 animate-in slide-in-from-left duration-1000">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 px-6 py-2">
                  <Award className="mr-2 w-4 h-4" />
                  Excellence Culinaire
                </Badge>

                <h2 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight">
                  Pourquoi Choisir
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    Congo Food?
                  </span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed">
                  Nous nous engageons à livrer non seulement de la nourriture,
                  mais une véritable expérience culinaire exceptionnelle qui vous transporte au cœur du Congo.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: Zap,
                    title: "Livraison Ultra-Rapide",
                    description: "Garantie 30 minutes ou remboursé. Votre temps est précieux, nous le respectons avec un service express de qualité.",
                    color: "from-yellow-400 to-orange-500"
                  },
                  {
                    icon: Shield,
                    title: "Sécurité Alimentaire Garantie",
                    description: "Cuisine certifiée HACCP avec protocoles d'hygiène stricts et livraison à température contrôlée pour votre sécurité.",
                    color: "from-green-400 to-emerald-500"
                  },
                  {
                    icon: Star,
                    title: "Qualité Premium",
                    description: "Ingrédients frais locaux, chefs professionnels expérimentés, et recettes authentiques préparées quotidiennement.",
                    color: "from-purple-400 to-pink-500"
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-6 group animate-in slide-in-from-left duration-1000"
                    style={{ animationDelay: `${index * 200 + 300}ms` }}
                  >
                    <div className="relative flex-shrink-0">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to="/menu">
                  Commencer à Commander
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </Button>
            </div>

            {/* Image Section */}
            <div className="relative animate-in slide-in-from-right duration-1000 delay-500">
              <div className="relative z-10">
                <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-100 p-4 transform hover:scale-105 transition-transform duration-700">
                  <img
                    src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=600&fit=crop&crop=center"
                    alt="Ingrédients frais et cuisine authentique"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 animate-float">
                  <div className="text-center">
                    <div className="text-3xl font-black text-emerald-600 mb-1">15K+</div>
                    <div className="text-sm text-gray-600 font-medium">Clients Satisfaits</div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 animate-float delay-1000">
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-600 mb-1">4.9★</div>
                    <div className="text-sm text-gray-600 font-medium">Note Moyenne</div>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-4 bg-white rounded-2xl shadow-2xl p-4 animate-float delay-500">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">500+</div>
                      <div className="text-xs text-gray-600">Commandes/jour</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-3xl transform rotate-6 scale-105 -z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-200/30 to-pink-200/30 rounded-3xl transform -rotate-3 scale-95 -z-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-emerald-900 to-blue-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-600/20 to-blue-600/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-8 animate-in fade-in duration-1000">
            <Badge className="bg-gradient-to-r from-emerald-400 to-blue-400 text-gray-900 border-0 px-8 py-3 text-base font-bold">
              <Sparkles className="mr-2 w-5 h-5" />
              Expérience Culinaire Premium
            </Badge>

            <h2 className="text-4xl lg:text-7xl font-black text-white leading-tight">
              Prêt à Découvrir une
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Cuisine Exceptionnelle?
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Rejoignez plus de <span className="text-emerald-400 font-bold">15,000 clients satisfaits</span> qui font confiance à Congo Food
              pour savourer l'authenticité congolaise au quotidien
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in slide-in-from-bottom duration-1000 delay-500">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white px-10 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 group"
            >
              <Link to="/menu">
                <ChefHat className="mr-3 w-6 h-6 group-hover:animate-bounce" />
                Commander Maintenant
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-xl px-10 py-4 border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm bg-white/10 font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Phone className="mr-3 w-6 h-6" />
              (+243) 123-456-789
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 animate-in fade-in duration-1000 delay-1000">
            {[
              { icon: Users, number: "15K+", label: "Clients Fidèles" },
              { icon: Star, number: "4.9★", label: "Note Moyenne" },
              { icon: Award, number: "99%", label: "Satisfaction Client" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  <stat.icon className="w-10 h-10 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </Layout>
  );
}
