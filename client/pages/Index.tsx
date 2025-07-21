import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
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
  Plus
} from "lucide-react";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("popular");

  const featuredDishes = [
    {
      id: 1,
      name: "Truffle Mushroom Burger",
      description: "Juicy beef patty with truffle mayo, wild mushrooms, and arugula",
      price: 18.99,
      image: "/api/placeholder/300/200",
      rating: 4.8,
      category: "popular",
      preparationTime: "15-20 min"
    },
    {
      id: 2,
      name: "Lobster Ravioli",
      description: "Handmade pasta filled with fresh lobster in creamy sage butter sauce",
      price: 24.99,
      image: "/api/placeholder/300/200",
      rating: 4.9,
      category: "popular",
      preparationTime: "20-25 min"
    },
    {
      id: 3,
      name: "Korean BBQ Bowl",
      description: "Marinated beef bulgogi with steamed rice and fresh vegetables",
      price: 16.99,
      image: "/api/placeholder/300/200",
      rating: 4.7,
      category: "healthy",
      preparationTime: "10-15 min"
    },
    {
      id: 4,
      name: "Margherita Pizza",
      description: "Wood-fired pizza with fresh mozzarella, basil, and San Marzano tomatoes",
      price: 14.99,
      image: "/api/placeholder/300/200",
      rating: 4.6,
      category: "popular",
      preparationTime: "12-18 min"
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
      <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-primary bg-primary/10">
                  🚀 Now delivering in 30 minutes or less
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Delicious Food
                  <span className="text-primary block">Delivered Fast</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Experience culinary excellence delivered to your doorstep. Fresh ingredients, 
                  expert chefs, and lightning-fast delivery.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/menu">
                    Order Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  <Phone className="mr-2 w-5 h-5" />
                  Call (555) 123-4567
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">30+</div>
                  <div className="text-sm text-muted-foreground">Minutes Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">4.8★</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Delicious food" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl transform rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Featured Dishes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked favorites from our kitchen, crafted with love and the finest ingredients
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
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/menu">
                View Full Menu
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
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to enjoy delicious food at your doorstep
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">1. Choose Your Meal</h3>
                <p className="text-muted-foreground">
                  Browse our extensive menu and select your favorite dishes from various cuisines
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">2. Place Your Order</h3>
                <p className="text-muted-foreground">
                  Add items to cart, enter delivery address, and choose your preferred payment method
                </p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">3. Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Sit back and relax while we prepare and deliver your order in 30 minutes or less
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
                  Why Choose FoodieExpress?
                </h2>
                <p className="text-xl text-muted-foreground">
                  We're committed to delivering not just food, but an exceptional dining experience
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
                src="/api/placeholder/500/600" 
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
            Ready to Experience Amazing Food?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust FoodieExpress for their daily meals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/menu">
                Order Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              Download App
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
