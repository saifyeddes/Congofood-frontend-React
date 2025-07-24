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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-left duration-1000">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold flex items-center">
                      <Gift className="w-6 h-6 mr-3" />
                      Articles Sélectionnés
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Vider
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {state.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-6 p-6 bg-gradient-to-r from-gray-50 to-emerald-50/50 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom duration-1000"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-2xl shadow-lg"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-emerald-600 font-semibold">${item.price.toFixed(2)} chacun</p>
                      </div>

                      <div className="flex items-center space-x-3 bg-white rounded-2xl p-2 shadow-inner">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 rounded-xl border-2 hover:bg-red-50 hover:border-red-200"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold text-lg min-w-[3rem] text-center text-gray-900">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 rounded-xl border-2 hover:bg-emerald-50 hover:border-emerald-200"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-black text-emerald-600 mb-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Truck className="w-6 h-6 mr-3" />
                    Informations de Livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="address" className="text-gray-700 font-semibold text-lg">
                      Adresse de livraison
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5" />
                      <Input
                        id="address"
                        placeholder="Entrez votre adresse complète..."
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-gray-700 font-semibold text-lg">
                      Numéro de téléphone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+243 123 456 789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-2xl border border-emerald-200">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700 font-medium">Livraison express: 30-45 minutes</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-8 animate-in slide-in-from-right duration-1000">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                  <CardTitle className="text-2xl font-bold">Résumé de la Commande</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                      <span className="font-medium text-gray-700">Sous-total</span>
                      <span className="font-bold text-gray-900">${state.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                      <span className="font-medium text-gray-700">Frais de livraison</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <Badge className="bg-green-500 text-white animate-pulse">Gratuit !</Badge>
                        ) : (
                          <span className="font-bold text-gray-900">${deliveryFee.toFixed(2)}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                      <span className="font-medium text-gray-700">Taxes (10%)</span>
                      <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator className="bg-gradient-to-r from-emerald-500 to-blue-500 h-0.5" />
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl font-bold text-2xl">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <p className="text-sm text-yellow-700 font-medium flex items-center">
                        <Gift className="w-4 h-4 mr-2" />
                        Livraison gratuite pour les commandes de $20+
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <CreditCard className="w-6 h-6 mr-3" />
                    Mode de Paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  {[
                    { value: "cash", label: "Paiement à la livraison (Espèces)", icon: "💰" },
                    { value: "mobile", label: "Mobile Money", icon: "📱" },
                    { value: "card", label: "Carte de crédit", icon: "💳" }
                  ].map((payment) => (
                    <label
                      key={payment.value}
                      className={`flex items-center space-x-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        paymentMethod === payment.value
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={payment.value}
                        checked={paymentMethod === payment.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="hidden"
                      />
                      <div className="text-2xl">{payment.icon}</div>
                      <span className="font-medium text-gray-700 flex-1">{payment.label}</span>
                      {paymentMethod === payment.value && (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                    </label>
                  ))}
                </CardContent>
              </Card>

              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 rounded-2xl"
                size="lg"
                disabled={!deliveryAddress || !phoneNumber}
              >
                <Shield className="w-6 h-6 mr-3" />
                Finaliser la Commande
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
