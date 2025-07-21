import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Truffle Mushroom Burger",
      description: "Juicy beef patty with truffle mayo, wild mushrooms, and arugula on brioche bun",
      price: 18.99,
      image: "/api/placeholder/300/200",
      rating: 4.8,
      category: "mains",
      preparationTime: "15-20 min",
      isPopular: true
    },
    {
      id: 2,
      name: "Lobster Ravioli",
      description: "Handmade pasta filled with fresh lobster in creamy sage butter sauce",
      price: 24.99,
      image: "/api/placeholder/300/200",
      rating: 4.9,
      category: "mains",
      preparationTime: "20-25 min",
      isPopular: true
    },
    {
      id: 3,
      name: "Korean BBQ Bowl",
      description: "Marinated beef bulgogi with steamed rice, kimchi, and fresh vegetables",
      price: 16.99,
      image: "/api/placeholder/300/200",
      rating: 4.7,
      category: "bowls",
      preparationTime: "10-15 min",
      isSpicy: true
    },
    {
      id: 4,
      name: "Margherita Pizza",
      description: "Wood-fired pizza with fresh mozzarella, basil, and San Marzano tomatoes",
      price: 14.99,
      image: "/api/placeholder/300/200",
      rating: 4.6,
      category: "pizza",
      preparationTime: "12-18 min",
      isVegetarian: true,
      isPopular: true
    },
    {
      id: 5,
      name: "Quinoa Buddha Bowl",
      description: "Nutritious quinoa with roasted vegetables, avocado, and tahini dressing",
      price: 13.99,
      image: "/api/placeholder/300/200",
      rating: 4.5,
      category: "bowls",
      preparationTime: "8-12 min",
      isVegetarian: true
    },
    {
      id: 6,
      name: "Chicken Caesar Salad",
      description: "Grilled chicken breast with romaine lettuce, parmesan, and house-made dressing",
      price: 12.99,
      image: "/api/placeholder/300/200",
      rating: 4.4,
      category: "salads",
      preparationTime: "10-15 min"
    },
    {
      id: 7,
      name: "Spicy Tuna Roll",
      description: "Fresh tuna with spicy mayo, cucumber, and avocado wrapped in nori",
      price: 11.99,
      image: "/api/placeholder/300/200",
      rating: 4.7,
      category: "sushi",
      preparationTime: "5-10 min",
      isSpicy: true
    },
    {
      id: 8,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 8.99,
      image: "/api/placeholder/300/200",
      rating: 4.8,
      category: "desserts",
      preparationTime: "15-20 min",
      isVegetarian: true
    }
  ];

  const categories = [
    { id: "all", name: "All Items", count: menuItems.length },
    { id: "mains", name: "Main Courses", count: menuItems.filter(item => item.category === "mains").length },
    { id: "bowls", name: "Bowls", count: menuItems.filter(item => item.category === "bowls").length },
    { id: "pizza", name: "Pizza", count: menuItems.filter(item => item.category === "pizza").length },
    { id: "salads", name: "Salads", count: menuItems.filter(item => item.category === "salads").length },
    { id: "sushi", name: "Sushi", count: menuItems.filter(item => item.category === "sushi").length },
    { id: "desserts", name: "Desserts", count: menuItems.filter(item => item.category === "desserts").length }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [itemId, count]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      return sum + (item ? item.price * count : 0);
    }, 0);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                Our Menu
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our carefully crafted dishes made with the finest ingredients
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
              {getTotalItems() > 0 && (
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
                        <span>{getTotalItems()}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Proceed to Checkout
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
                      {cart[item.id] ? (
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
                              {cart[item.id]}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addToCart(item.id)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">
                            ${(item.price * cart[item.id]).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={() => addToCart(item.id)}
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
