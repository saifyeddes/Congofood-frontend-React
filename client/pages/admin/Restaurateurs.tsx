import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ChefHat,
  Search,
  Plus,
  Edit,
  Trash2,
  Shield,
  ShieldOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Store,
  Star,
  Filter,
  Eye,
  MoreVertical,
  Award,
  Clock,
  DollarSign,
} from "lucide-react";

interface Restaurateur {
  id: string;
  nomRestaurant: string;
  proprietaire: string;
  email: string;
  telephone: string;
  adresse: string;
  dateInscription: string;
  statut: "actif" | "bloque";
  typeComission: string;
  note: number;
  totalPlats: number;
  commandesLivrees: number;
  chiffreAffaires: number;
}

export default function Restaurateurs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    "tous" | "actif" | "bloque"
  >("tous");
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data
  const restaurateurs: Restaurateur[] = [
    {
      id: "REST-001",
      nomRestaurant: "Chez Mama Kongo",
      proprietaire: "Marie Kabuya",
      email: "contact@mamakongo.cd",
      telephone: "+243 123 456 789",
      adresse: "Av. Lumumba, Kinshasa, Gombe",
      dateInscription: "2024-01-15",
      statut: "actif",
      typeComission: "Premium - 12%",
      note: 4.8,
      totalPlats: 35,
      commandesLivrees: 456,
      chiffreAffaires: 12450.78,
    },
    {
      id: "REST-002",
      nomRestaurant: "Restaurant Mboka",
      proprietaire: "Jean-Pierre Tshisekedi",
      email: "info@mboka-restaurant.cd",
      telephone: "+243 987 654 321",
      adresse: "Av. des Nations Unies, Kinshasa",
      dateInscription: "2024-02-10",
      statut: "actif",
      typeComission: "Standard - 15%",
      note: 4.5,
      totalPlats: 28,
      commandesLivrees: 234,
      chiffreAffaires: 8900.5,
    },
    {
      id: "REST-003",
      nomRestaurant: "Saveurs du Congo",
      proprietaire: "Fatou Mukendi",
      email: "contact@saveurscongo.cd",
      telephone: "+243 555 444 333",
      adresse: "Commune de Limete, Kinshasa",
      dateInscription: "2023-12-05",
      statut: "bloque",
      typeComission: "Standard - 15%",
      note: 3.9,
      totalPlats: 18,
      commandesLivrees: 89,
      chiffreAffaires: 2340.3,
    },
    {
      id: "REST-004",
      nomRestaurant: "Les Délices Africains",
      proprietaire: "David Kabongo",
      email: "david@delicesafricains.cd",
      telephone: "+243 777 888 999",
      adresse: "Av. de la Liberation, Kinshasa",
      dateInscription: "2024-03-01",
      statut: "actif",
      typeComission: "Premium - 12%",
      note: 4.9,
      totalPlats: 42,
      commandesLivrees: 567,
      chiffreAffaires: 18750.9,
    },
  ];

  const filteredRestaurateurs = restaurateurs.filter((resto) => {
    const matchesSearch =
      resto.nomRestaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resto.proprietaire.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resto.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "tous" || resto.statut === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: restaurateurs.length,
    actifs: restaurateurs.filter((r) => r.statut === "actif").length,
    bloques: restaurateurs.filter((r) => r.statut === "bloque").length,
    nouveaux: restaurateurs.filter((r) => {
      const inscriptionDate = new Date(r.dateInscription);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return inscriptionDate > thirtyDaysAgo;
    }).length,
    chiffreTotal: restaurateurs.reduce(
      (total, r) => total + r.chiffreAffaires,
      0,
    ),
  };

  const toggleRestaurateurStatus = (restaurateurId: string) => {
    console.log(`Toggle status for restaurateur ${restaurateurId}`);
    // Implementation here
  };

  const getStatusBadge = (statut: string) => {
    return statut === "actif" ? (
      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-3 py-1">
        <Store className="w-3 h-3 mr-1" />
        Actif
      </Badge>
    ) : (
      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 px-3 py-1">
        <ShieldOff className="w-3 h-3 mr-1" />
        Bloqué
      </Badge>
    );
  };

  const getCommissionBadge = (commission: string) => {
    const isPremium = commission.includes("Premium");
    return (
      <Badge
        className={`border-0 px-3 py-1 ${
          isPremium
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
        }`}
      >
        {isPremium ? (
          <>
            <Award className="w-3 h-3 mr-1" />
            Premium
          </>
        ) : (
          <>
            <Store className="w-3 h-3 mr-1" />
            Standard
          </>
        )}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900">
                    Gestion des Restaurateurs
                  </h1>
                  <p className="text-gray-600 font-medium">
                    Administration des partenaires restaurant
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 px-6 py-3 font-semibold"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filtres Avancés
              </Button>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nouveau Restaurateur
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            {
              title: "Total Restaurants",
              value: stats.total,
              icon: Store,
              color: "from-orange-500 to-red-500",
              bgColor: "from-orange-50 to-red-50",
            },
            {
              title: "Restaurants Actifs",
              value: stats.actifs,
              icon: ChefHat,
              color: "from-green-500 to-emerald-500",
              bgColor: "from-green-50 to-emerald-50",
            },
            {
              title: "Restaurants Bloqués",
              value: stats.bloques,
              icon: ShieldOff,
              color: "from-red-500 to-pink-500",
              bgColor: "from-red-50 to-pink-50",
            },
            {
              title: "Nouveaux (30j)",
              value: stats.nouveaux,
              icon: Plus,
              color: "from-purple-500 to-violet-500",
              bgColor: "from-purple-50 to-violet-50",
            },
            {
              title: "CA Total",
              value: `$${stats.chiffreTotal.toLocaleString()}`,
              icon: DollarSign,
              color: "from-blue-500 to-indigo-500",
              bgColor: "from-blue-50 to-indigo-50",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white"
            >
              <CardContent className="p-6">
                <div
                  className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-4 mb-4`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-xs font-medium text-gray-600">
                        {stat.title}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-xl bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher par nom de restaurant, propriétaire ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-orange-500 transition-all duration-300"
                />
              </div>
              <div className="flex space-x-2">
                {[
                  { value: "tous", label: "Tous", count: stats.total },
                  { value: "actif", label: "Actifs", count: stats.actifs },
                  { value: "bloque", label: "Bloqués", count: stats.bloques },
                ].map((status) => (
                  <Button
                    key={status.value}
                    variant={
                      selectedStatus === status.value ? "default" : "outline"
                    }
                    onClick={() => setSelectedStatus(status.value as any)}
                    className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                      selectedStatus === status.value
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    {status.label}
                    <Badge variant="secondary" className="ml-2">
                      {status.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Restaurateurs Table */}
        <Card className="border-0 shadow-2xl bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
            <CardTitle className="text-2xl font-bold flex items-center">
              <ChefHat className="w-6 h-6 mr-3" />
              Liste des Restaurateurs ({filteredRestaurateurs.length})
            </CardTitle>
            <CardDescription className="text-gray-300 font-medium">
              Gestion complète des partenaires restaurant
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="space-y-6 p-6">
                {filteredRestaurateurs.map((resto, index) => (
                  <div
                    key={resto.id}
                    className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          <ChefHat className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {resto.nomRestaurant}
                          </h3>
                          <p className="text-orange-600 font-medium">
                            {resto.id}
                          </p>
                          <p className="text-gray-600">
                            Propriétaire: {resto.proprietaire}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(resto.statut)}
                        {getCommissionBadge(resto.typeComission)}
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">
                          {resto.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">
                          {resto.telephone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600">
                          {resto.adresse}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-600">
                          {new Date(resto.dateInscription).toLocaleDateString(
                            "fr-FR",
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-xl font-black text-gray-900">
                            {resto.note}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Note moyenne
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                        <div className="text-xl font-black text-blue-600">
                          {resto.totalPlats}
                        </div>
                        <div className="text-xs text-gray-500">Plats</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                        <div className="text-xl font-black text-emerald-600">
                          {resto.commandesLivrees}
                        </div>
                        <div className="text-xs text-gray-500">Commandes</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                        <div className="text-xl font-black text-orange-600">
                          ${resto.chiffreAffaires.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">CA total</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Commission: </span>
                        <span className="text-orange-600 font-bold">
                          {resto.typeComission}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Voir
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => toggleRestaurateurStatus(resto.id)}
                          className={`rounded-xl ${
                            resto.statut === "actif"
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-green-500 hover:bg-green-600 text-white"
                          }`}
                        >
                          {resto.statut === "actif" ? (
                            <>
                              <ShieldOff className="w-4 h-4 mr-2" />
                              Bloquer
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4 mr-2" />
                              Débloquer
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
