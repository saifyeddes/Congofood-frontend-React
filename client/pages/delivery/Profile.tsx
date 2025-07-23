import DeliveryLayout from "@/components/delivery/DeliveryLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  Star, 
  Calendar,
  Edit,
  Camera,
  Save,
  Award,
  Target,
  Clock,
  DollarSign
} from "lucide-react";

export default function DeliveryProfile() {
  const driverData = {
    id: "DRV-001",
    firstName: "Jacques",
    lastName: "Tshisekedi",
    email: "jacques.tshisekedi@congofood.com",
    phone: "+243 111 222 333",
    address: "Av. Lumumba, Kinshasa",
    vehicleType: "Moto",
    vehicleNumber: "KIN-1234",
    licenseNumber: "DL123456789",
    joinDate: "2024-01-10",
    rating: 4.8,
    totalDeliveries: 156,
    totalEarnings: 2340.75,
    badgeLevel: "Gold",
    availability: "Disponible",
    emergencyContact: "+243 999 888 777",
    bio: "Livreur expérimenté et fiable, spécialisé dans les livraisons rapides dans la région de Kinshasa."
  };

  const achievements = [
    { name: "Top Performer", description: "Plus de 150 livraisons", icon: "🏆", earned: true },
    { name: "Speed Master", description: "Temps moyen sous 20 min", icon: "⚡", earned: false },
    { name: "Customer Favorite", description: "Note 4.8+", icon: "⭐", earned: true },
    { name: "Reliability Pro", description: "98% de réussite", icon: "🎯", earned: true }
  ];

  const monthlyStats = [
    { label: "Livraisons", value: "67", change: "+15%" },
    { label: "Gains", value: "$892", change: "+8%" },
    { label: "Note Moyenne", value: "4.8", change: "+0.2" },
    { label: "Temps Moyen", value: "22min", change: "-3min" }
  ];

  return (
    <DeliveryLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Mon Profil</h1>
              <p className="text-indigo-100">
                Gérez vos informations personnelles et professionnelles
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-indigo-200">
              <CardHeader className="text-center pb-2">
                <div className="relative mx-auto">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {driverData.firstName[0]}{driverData.lastName[0]}
                      </span>
                    </div>
                    <AvatarFallback>JT</AvatarFallback>
                  </Avatar>
                  <Button size="sm" className="absolute bottom-0 right-1/3 rounded-full">
                    <Camera className="w-3 h-3" />
                  </Button>
                </div>
                <CardTitle className="text-xl">{driverData.firstName} {driverData.lastName}</CardTitle>
                <CardDescription className="text-center">Livreur professionnel</CardDescription>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Badge className="bg-green-100 text-green-800">{driverData.availability}</Badge>
                  <Badge variant="outline">{driverData.badgeLevel}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold text-yellow-600">{driverData.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">Note moyenne</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center bg-blue-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-600">{driverData.totalDeliveries}</div>
                    <div className="text-xs text-blue-500">Livraisons</div>
                  </div>
                  <div className="text-center bg-green-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-green-600">${driverData.totalEarnings}</div>
                    <div className="text-xs text-green-500">Gains totaux</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-gray-500" />
                    <span>{driverData.vehicleType} - {driverData.vehicleNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Membre depuis {new Date(driverData.joinDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{driverData.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Stats */}
            <Card className="shadow-lg border-green-200 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Target className="w-5 h-5 mr-2" />
                  Statistiques du Mois
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <div className="text-right">
                        <div className="font-semibold">{stat.value}</div>
                        <div className="text-xs text-green-600">{stat.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-lg border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Informations Personnelles
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" value={driverData.firstName} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" value={driverData.lastName} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={driverData.email} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" value={driverData.phone} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency">Contact d'urgence</Label>
                    <Input id="emergency" value={driverData.emergencyContact} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" value={driverData.address} readOnly />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea id="bio" value={driverData.bio} readOnly rows={3} />
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Information */}
            <Card className="shadow-lg border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-purple-600" />
                    Informations Véhicule
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Type de véhicule</Label>
                    <Input id="vehicleType" value={driverData.vehicleType} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber">Numéro d'immatriculation</Label>
                    <Input id="vehicleNumber" value={driverData.vehicleNumber} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Numéro de permis</Label>
                    <Input id="license" value={driverData.licenseNumber} readOnly />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-lg border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Réalisations
                </CardTitle>
                <CardDescription>
                  Vos accomplissements et badges gagnés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        achievement.earned 
                          ? 'bg-yellow-50 border-yellow-200 hover:shadow-md' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className={`font-semibold ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                            {achievement.name}
                          </div>
                          <div className={`text-sm ${achievement.earned ? 'text-yellow-600' : 'text-gray-500'}`}>
                            {achievement.description}
                          </div>
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Obtenu
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder les Modifications
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DeliveryLayout>
  );
}
