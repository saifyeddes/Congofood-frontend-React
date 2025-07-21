import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import {
  Search,
  Filter,
  Clock,
  Star,
  Plus,
  Minus,
  ShoppingCart
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
  const { state, dispatch } = useCart();

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
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Notre Menu
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos plats congolais authentiques préparés avec les meilleurs ingrédients
            </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-between"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Cart Summary */}
              {state.totalItems > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Cart Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Items:</span>
                        <span>{state.totalItems}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${state.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to="/cart">
                        Voir le Panier
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>

            {/* Menu Items */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          <Badge className="bg-white/90 text-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.preparationTime}
                          </Badge>
                          {item.isPopular && (
                            <Badge variant="destructive">Popular</Badge>
                          )}
                          {item.isVegetarian && (
                            <Badge className="bg-green-500">Vegetarian</Badge>
                          )}
                          {item.isSpicy && (
                            <Badge className="bg-red-500">🌶️ Spicy</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {item.name}
                        </CardTitle>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">${item.price}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      {getItemQuantity(item.id) > 0 ? (
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-medium min-w-[2rem] text-center">
                              {getItemQuantity(item.id)}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">
                            ${(item.price * getItemQuantity(item.id)).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No items found matching your search criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
