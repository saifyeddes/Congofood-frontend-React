import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
  Truck,
  MapPin,
  Clock,
  Sparkles,
  Gift,
  Shield,
  CheckCircle
} from "lucide-react";

export default function Cart() {
  const { state, dispatch } = useCart();
  const { state: authState } = useAuth();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(authState.user?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const deliveryFee = state.totalPrice > 20 ? 0 : 2.50;
  const tax = state.totalPrice * 0.1; // 10% tax
  const finalTotal = state.totalPrice + deliveryFee + tax;

  const handleCheckout = () => {
    // In a real app, this would process the order
    alert("Commande passée avec succès! Merci pour votre commande.");
    clearCart();
  };

  if (state.items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-white via-emerald-50/30 to-white">
          <div className="text-center space-y-8 max-w-lg mx-auto px-6 animate-in fade-in duration-1000">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <ShoppingCart className="w-16 h-16 text-emerald-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-gray-900">Votre panier est vide</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Découvrez nos délicieux plats congolais authentiques et ajoutez-les à votre panier pour commencer votre expérience culinaire.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to="/menu">
                  <Gift className="w-5 h-5 mr-2" />
                  Découvrir le Menu
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                <Link to="/">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-20 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 animate-in slide-in-from-left duration-1000">
              <Button
                asChild
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 px-6 py-3"
              >
                <Link to="/menu">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Continuer les achats
                </Link>
              </Button>
            </div>

            <div className="text-center space-y-6 animate-in fade-in duration-1000 delay-300">
              <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 px-6 py-2 text-base font-bold">
                <ShoppingCart className="mr-2 w-5 h-5" />
                Votre Commande
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Panier d'Achat
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                {state.totalItems} article{state.totalItems > 1 ? 's' : ''} sélectionné{state.totalItems > 1 ? 's' : ''} •
                Total: <span className="font-bold text-emerald-600">${state.totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Articles Commandés</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Vider le panier
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} chacun</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Informations de Livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse de livraison</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="address"
                        placeholder="Entrez votre adresse complète"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input
                      id="phone"
                      placeholder="Votre numéro de téléphone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Temps de livraison estimé: 30-45 minutes</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de la Commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>${state.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais de livraison</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <Badge variant="secondary">Gratuit</Badge>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Livraison gratuite pour les commandes de $20+
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Mode de Paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>Paiement à la livraison (Espèces)</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="mobile"
                        checked={paymentMethod === "mobile"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>Mobile Money</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>Carte de crédit</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleCheckout}
                className="w-full"
                size="lg"
                disabled={!deliveryAddress || !phoneNumber}
              >
                Passer la Commande
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
