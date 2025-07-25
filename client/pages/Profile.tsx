import { useState } from "react";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Shield,
  Heart,
  Star,
  Award,
  CreditCard,
  Clock,
  ShoppingBag,
  Settings,
  Truck,
  Gift
} from "lucide-react";

export default function Profile() {
  const { state: authState } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: authState.user?.firstName || "",
    lastName: authState.user?.lastName || "",
    email: authState.user?.email || "",
    phone: authState.user?.phone || "",
    address: "Av. Lumumba, Kinshasa",
    dateOfBirth: "1990-05-15",
    preferences: "Plats épicés, sans noix",
    emergencyContact: "Marie Mukendi",
    emergencyPhone: "+243 987 654 321"
  });

  const handleSave = () => {
    // In real app, this would update the user profile via API
    setIsEditing(false);
    alert("Profil mis à jour avec succès !");
  };

  const stats = {
    totalOrders: 24,
    favoriteRestaurant: "Chez Mama Congo",
    totalSpent: 586.50,
    memberSince: "Janvier 2024",
    loyaltyPoints: 1240
  };

  const recentOrders = [
    {
      id: "ORD-2024-001",
      restaurant: "Chez Mama Congo",
      items: ["Moambé au Poulet", "Fufu na Ndakala"],
      total: 28.98,
      date: "2024-01-15",
      status: "delivered"
    },
    {
      id: "ORD-2024-002",
      restaurant: "Le Jardin Tropical",
      items: ["Salade Fusion"],
      total: 14.50,
      date: "2024-01-12",
      status: "delivered"
    }
  ];

  return (
    <Layout>
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-16">
            <div className="container mx-auto px-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black mb-2">
                    {authState.user?.firstName} {authState.user?.lastName}
                  </h1>
                  <p className="text-xl text-emerald-100 mb-2">{authState.user?.email}</p>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-green-500 text-white">
                      <Award className="w-3 h-3 mr-1" />
                      Client VIP
                    </Badge>
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      {stats.loyaltyPoints} points
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <Card className="border-0 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold flex items-center">
                        <User className="w-6 h-6 mr-3" />
                        Informations Personnelles
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-white hover:bg-white/20"
                      >
                        {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom de famille</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date de naissance</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={profileData.dateOfBirth}
                            onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Contact d'urgence</Label>
                        <Input
                          id="emergencyContact"
                          value={profileData.emergencyContact}
                          onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                          <Textarea
                            id="address"
                            value={profileData.address}
                            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferences">Préférences alimentaires</Label>
                        <div className="relative">
                          <Heart className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                          <Textarea
                            id="preferences"
                            value={profileData.preferences}
                            onChange={(e) => setProfileData({...profileData, preferences: e.target.value})}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4 mt-6 pt-6 border-t">
                        <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                          <Save className="w-4 h-4 mr-2" />
                          Sauvegarder
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          <X className="w-4 h-4 mr-2" />
                          Annuler
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card className="border-0 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <CardTitle className="text-2xl font-bold flex items-center">
                      <ShoppingBag className="w-6 h-6 mr-3" />
                      Commandes Récentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900">{order.restaurant}</h4>
                            <Badge className="bg-green-500 text-white">Livré</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{order.items.join(", ")}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">{order.date}</span>
                            <span className="font-bold text-emerald-600">${order.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Voir tout l'historique
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Statistics Sidebar */}
              <div className="space-y-6">
                {/* Stats Cards */}
                <Card className="border-0 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <CardTitle className="text-xl font-bold">Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-black text-gray-900 mb-1">{stats.totalOrders}</div>
                      <div className="text-sm text-gray-600">Commandes totales</div>
                    </div>
                    <Separator />
                    <div className="text-center">
                      <div className="text-3xl font-black text-green-600 mb-1">${stats.totalSpent}</div>
                      <div className="text-sm text-gray-600">Total dépensé</div>
                    </div>
                    <Separator />
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600 mb-1">{stats.favoriteRestaurant}</div>
                      <div className="text-sm text-gray-600">Restaurant favori</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Loyalty Program */}
                <Card className="border-0 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <Gift className="w-5 h-5 mr-2" />
                      Programme Fidélité
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-black text-yellow-600">{stats.loyaltyPoints}</div>
                      <div className="text-sm text-gray-600">points disponibles</div>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 mb-4">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: "62%"}}></div>
                    </div>
                    <p className="text-xs text-gray-600 text-center mb-4">
                      Plus que 760 points pour devenir membre Gold
                    </p>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                      Utiliser mes points
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <CardTitle className="text-xl font-bold">Actions Rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Répéter dernière commande
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Truck className="w-4 h-4 mr-2" />
                      Suivre une commande
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Gérer paiements
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Paramètres
                    </Button>
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
