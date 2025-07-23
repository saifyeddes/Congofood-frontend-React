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
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Plats Vedettes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sélection de nos spécialités congolaises, préparées avec amour et les meilleurs ingrédients
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <Card key={dish.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-white/90 text-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {dish.preparationTime}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {dish.name}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{dish.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">${dish.price}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => addToCart(dish)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter au Panier
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/menu">
                Voir le Menu Complet
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Comment Ça Marche
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trois étapes simples pour savourer nos délicieux plats à votre porte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">1. Choisissez Votre Repas</h3>
                <p className="text-muted-foreground">
                  Parcourez notre menu et sélectionnez vos plats congolais préférés
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">2. Passez Votre Commande</h3>
                <p className="text-muted-foreground">
                  Ajoutez au panier, entrez votre adresse et choisissez votre mode de paiement
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">3. Livraison Rapide</h3>
                <p className="text-muted-foreground">
                  Détendez-vous pendant que nous préparons et livrons votre commande en 30 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Pourquoi Choisir Congo Food?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Nous nous engageons à livrer non seulement de la nourriture, mais une expérience culinaire exceptionnelle
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Lightning Fast Delivery</h3>
                    <p className="text-muted-foreground">
                      30-minute delivery guarantee or your money back. We value your time as much as you do.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Food Safety Guaranteed</h3>
                    <p className="text-muted-foreground">
                      HACCP certified kitchen with strict hygiene protocols and temperature-controlled delivery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Premium Quality</h3>
                    <p className="text-muted-foreground">
                      Fresh, locally sourced ingredients prepared by professional chefs daily.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/menu">
                  Start Ordering
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=600&fit=crop&crop=center"
                alt="Fresh ingredients"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Prêt à Découvrir une Cuisine Exceptionnelle?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits qui font confiance à Congo Food pour leurs repas quotidiens
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/menu">
                Commander Maintenant
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              Télécharger l'App
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
