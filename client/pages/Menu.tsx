import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import {
  Search,
  Filter,
  Clock,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Sparkles,
  Heart,
  ChefHat,
  Leaf,
  Flame,
  Award,
  TrendingUp
} from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  preparationTime: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
}

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { state, dispatch } = useCart();
  const { state: authState } = useAuth();

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Moambé au Poulet",
      description: "Poulet mijoté dans une sauce onctueuse aux noix de palme, servi avec du riz",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop&crop=center",
      rating: 4.9,
      category: "plats",
      preparationTime: "25-30 min",
      isPopular: true
    },
    {
      id: 2,
      name: "Poisson à la Congolaise",
      description: "Poisson frais grillé aux épices locales, accompagné de légumes sautés",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=200&fit=crop&crop=center",
      rating: 4.8,
      category: "plats",
      preparationTime: "20-25 min",
      isPopular: true
    },
    {
      id: 3,
      name: "Saka-Saka aux Crevettes",
      description: "Feuilles de manioc cuisinées avec des crevettes fraîches et arachides",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center",
      rating: 4.7,
      category: "plats",
      preparationTime: "30-35 min",
      isPopular: true
    },
    {
      id: 4,
      name: "Liboke de Porc",
      description: "Porc mariné et cuit à la vapeur dans des feuilles de bananier",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop&crop=center",
      rating: 4.6,
      category: "plats",
      preparationTime: "35-40 min",
      isPopular: true
    },
    {
      id: 5,
      name: "Ntaba na Makemba",
      description: "Agneau grillé accompagné de bananes plantains et légumes du pays",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop&crop=center",
      rating: 4.8,
      category: "plats",
      preparationTime: "30-35 min"
    },
    {
      id: 6,
      name: "Salade de Madesu",
      description: "Salade fraîche aux haricots verts, tomates et vinaigrette à l'huile de palme",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop&crop=center",
      rating: 4.5,
      category: "accompagnements",
      preparationTime: "8-12 min",
      isVegetarian: true
    },
    {
      id: 7,
      name: "Makayabu na Dongo-Dongo",
      description: "Poisson salé aux épinards et gombo dans une sauce épicée",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center",
      rating: 4.7,
      category: "plats",
      preparationTime: "20-25 min",
      isSpicy: true
    },
    {
      id: 8,
      name: "Mikate na Sukali",
      description: "Beignets congolais traditionnels saupoudrés de sucre",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop&crop=center",
      rating: 4.8,
      category: "desserts",
      preparationTime: "15-20 min",
      isVegetarian: true
    },
    {
      id: 9,
      name: "Fufu na Ndakala",
      description: "Fufu traditionnel accompagné de sauce aux petits poissons séchés",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop&crop=center",
      rating: 4.6,
      category: "plats",
      preparationTime: "25-30 min"
    },
    {
      id: 10,
      name: "Bili na Madesu",
      description: "Riz parfumé aux haricots rouges et épices congolaises",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1512058556904-645dd1bb2de7?w=300&h=200&fit=crop&crop=center",
      rating: 4.4,
      category: "accompagnements",
      preparationTime: "20-25 min",
      isVegetarian: true
    }
  ];

  const categories = [
    { id: "all", name: "Tous les Plats", count: menuItems.length },
    { id: "plats", name: "Plats Principaux", count: menuItems.filter(item => item.category === "plats").length },
    { id: "accompagnements", name: "Accompagnements", count: menuItems.filter(item => item.category === "accompagnements").length },
    { id: "desserts", name: "Desserts", count: menuItems.filter(item => item.category === "desserts").length }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    const currentItem = state.items.find(item => item.id === itemId);
    if (currentItem && currentItem.quantity > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: itemId, quantity: currentItem.quantity - 1 }
      });
    } else {
      dispatch({
        type: "REMOVE_ITEM",
        payload: itemId
      });
    }
  };

  const getItemQuantity = (itemId: number) => {
    const item = state.items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-24 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-spin-slow"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 animate-in fade-in duration-1000">
              <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 px-8 py-3 text-base font-bold">
                <ChefHat className="mr-2 w-5 h-5" />
                Cuisine Authentique Congolaise
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Notre Menu
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Découvrez notre collection de plats congolais authentiques,
                préparés avec passion et les meilleurs ingrédients locaux
              </p>

              <div className="flex flex-wrap justify-center gap-8 pt-8">
                {[
                  { icon: Award, number: "50+", label: "Plats Authentiques" },
                  { icon: Star, number: "4.9★", label: "Note Moyenne" },
                  { icon: TrendingUp, number: "15K+", label: "Commandes Servies" }
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
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <div className="lg:w-80 space-y-8 animate-in slide-in-from-left duration-1000">
              {/* Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors duration-300" />
                <Input
                  placeholder="Rechercher des plats délicieux..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
                />
              </div>

              {/* Categories */}
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                  <CardTitle className="flex items-center text-xl font-bold">
                    <Filter className="w-6 h-6 mr-3" />
                    Catégories
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  {categories.map((category, index) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className={`w-full justify-between p-4 rounded-xl text-left transition-all duration-300 animate-in fade-in ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg transform scale-105"
                          : "hover:bg-emerald-50 hover:scale-105"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="font-medium">{category.name}</span>
                      <Badge
                        variant="secondary"
                        className={`${selectedCategory === category.id ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}
                      >
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Cart Summary */}
              {state.totalItems > 0 && (
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden animate-in slide-in-from-bottom duration-1000">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <CardTitle className="flex items-center text-xl font-bold">
                      <ShoppingCart className="w-6 h-6 mr-3 animate-bounce" />
                      Résumé du Panier
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                        <span className="font-medium text-gray-700">Articles:</span>
                        <Badge className="bg-emerald-500 text-white px-3 py-1">{state.totalItems}</Badge>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold text-lg">
                        <span>Total:</span>
                        <span>${state.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <Link to="/cart">
                        Voir le Panier
                        <ShoppingCart className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>

            {/* Menu Items */}
            <div className="flex-1 animate-in slide-in-from-right duration-1000 delay-300">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-white/80 backdrop-blur-sm transform hover:-translate-y-2 hover:scale-105 animate-in slide-in-from-bottom duration-1000"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-all duration-300"></div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          <Badge className="bg-white/95 text-gray-900 border-0 shadow-lg">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.preparationTime}
                          </Badge>
                          {item.isPopular && (
                            <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 shadow-lg animate-pulse">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                          {item.isVegetarian && (
                            <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg">
                              <Leaf className="w-3 h-3 mr-1" />
                              Végétarien
                            </Badge>
                          )}
                          {item.isSpicy && (
                            <Badge className="bg-gradient-to-r from-red-400 to-orange-500 text-white border-0 shadow-lg">
                              <Flame className="w-3 h-3 mr-1" />
                              Épicé
                            </Badge>
                          )}
                        </div>

                        {/* Heart Icon */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                          {item.name}
                        </CardTitle>
                        <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-yellow-600">{item.rating}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-emerald-600">${item.price}</span>
                        <Badge variant="outline" className="text-xs font-medium border-emerald-200 text-emerald-700">
                          Authentique
                        </Badge>
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      {getItemQuantity(item.id) > 0 ? (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl p-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-10 h-10 rounded-xl border-2 hover:bg-red-50 hover:border-red-200"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-bold text-lg min-w-[2rem] text-center text-gray-900">
                              {getItemQuantity(item.id)}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-10 h-10 rounded-xl border-2 hover:bg-emerald-50 hover:border-emerald-200"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Total</div>
                            <div className="text-lg font-bold text-emerald-600">
                              ${(item.price * getItemQuantity(item.id)).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Button
                          className={`w-full font-semibold py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
                            authState.isAuthenticated
                              ? "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                              : "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-amber-500 hover:to-orange-500 text-white"
                          }`}
                          onClick={() => addToCart(item)}
                        >
                          {authState.isAuthenticated ? (
                            <>
                              <Plus className="w-5 h-5 mr-2" />
                              Ajouter au Panier
                            </>
                          ) : (
                            <>
                              <Plus className="w-5 h-5 mr-2" />
                              Se connecter pour commander
                            </>
                          )}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-20 animate-in fade-in duration-1000">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Aucun plat trouvé</h3>
                  <p className="text-gray-500 text-lg max-w-md mx-auto">
                    Aucun plat ne correspond à vos critères de recherche.
                    Essayez avec d'autres mots-clés ou changez de catégorie.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="signin"
      />
    </Layout>
  );
}
