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
import { Label } from "@/components/ui/label";
import {
  Users,
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
  UserCheck,
  UserX,
  Filter,
  Eye,
  MoreVertical,
} from "lucide-react";

interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  dateInscription: string;
  statut: "actif" | "bloque";
  totalCommandes: number;
  montantDepense: number;
}

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    "tous" | "actif" | "bloque"
  >("tous");
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data
  const clients: Client[] = [
    {
      id: "CLI-001",
      nom: "Mukendi",
      prenom: "Jean",
      email: "jean.mukendi@email.com",
      telephone: "+243 123 456 789",
      adresse: "Av. Lumumba, Kinshasa, Gombe",
      dateInscription: "2024-01-15",
      statut: "actif",
      totalCommandes: 24,
      montantDepense: 456.78,
    },
    {
      id: "CLI-002",
      nom: "Kabila",
      prenom: "Marie",
      email: "marie.kabila@email.com",
      telephone: "+243 987 654 321",
      adresse: "Av. des Nations Unies, Kinshasa",
      dateInscription: "2024-02-10",
      statut: "actif",
      totalCommandes: 18,
      montantDepense: 324.5,
    },
    {
      id: "CLI-003",
      nom: "Tshisekedi",
      prenom: "Paul",
      email: "paul.tshisekedi@email.com",
      telephone: "+243 555 444 333",
      adresse: "Commune de Limete, Kinshasa",
      dateInscription: "2023-12-05",
      statut: "bloque",
      totalCommandes: 8,
      montantDepense: 142.3,
    },
    {
      id: "CLI-004",
      nom: "Mbuyi",
      prenom: "Fatou",
      email: "fatou.mbuyi@email.com",
      telephone: "+243 777 888 999",
      adresse: "Av. de la Liberation, Kinshasa",
      dateInscription: "2024-03-01",
      statut: "actif",
      totalCommandes: 15,
      montantDepense: 278.9,
    },
  ];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "tous" || client.statut === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: clients.length,
    actifs: clients.filter((c) => c.statut === "actif").length,
    bloques: clients.filter((c) => c.statut === "bloque").length,
    nouveaux: clients.filter((c) => {
      const inscriptionDate = new Date(c.dateInscription);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return inscriptionDate > thirtyDaysAgo;
    }).length,
  };

  const toggleClientStatus = (clientId: string) => {
    console.log(`Toggle status for client ${clientId}`);
    // Implementation here
  };

  const getStatusBadge = (statut: string) => {
    return statut === "actif" ? (
      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-3 py-1">
        <UserCheck className="w-3 h-3 mr-1" />
        Actif
      </Badge>
    ) : (
      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 px-3 py-1">
        <UserX className="w-3 h-3 mr-1" />
        Bloqué
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900">
                    Gestion des Clients
                  </h1>
                  <p className="text-gray-600 font-medium">
                    Administration complète des utilisateurs clients
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 px-6 py-3 font-semibold"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filtres Avancés
              </Button>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nouveau Client
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Total Clients",
              value: stats.total,
              icon: Users,
              color: "from-blue-500 to-indigo-500",
              bgColor: "from-blue-50 to-indigo-50",
            },
            {
              title: "Clients Actifs",
              value: stats.actifs,
              icon: UserCheck,
              color: "from-green-500 to-emerald-500",
              bgColor: "from-green-50 to-emerald-50",
            },
            {
              title: "Clients Bloqués",
              value: stats.bloques,
              icon: UserX,
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
                      <div className="text-2xl font-black text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
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
                  placeholder="Rechercher par nom, prénom ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 transition-all duration-300"
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
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                        : "border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
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

        {/* Clients Table */}
        <Card className="border-0 shadow-2xl bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8">
            <CardTitle className="text-2xl font-bold flex items-center">
              <Users className="w-6 h-6 mr-3" />
              Liste des Clients ({filteredClients.length})
            </CardTitle>
            <CardDescription className="text-gray-300 font-medium">
              Gestion complète des comptes clients
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="space-y-4 p-6">
                {filteredClients.map((client, index) => (
                  <div
                    key={client.id}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {client.prenom[0]}
                          {client.nom[0]}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {client.prenom} {client.nom}
                          </h3>
                          <p className="text-blue-600 font-medium">
                            {client.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(client.statut)}
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">
                          {client.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">
                          {client.telephone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600">
                          {client.adresse}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-600">
                          {new Date(client.dateInscription).toLocaleDateString(
                            "fr-FR",
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex space-x-6">
                        <div className="text-center">
                          <div className="text-2xl font-black text-blue-600">
                            {client.totalCommandes}
                          </div>
                          <div className="text-xs text-gray-500">Commandes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-emerald-600">
                            ${client.montantDepense}
                          </div>
                          <div className="text-xs text-gray-500">Dépensé</div>
                        </div>
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
                          onClick={() => toggleClientStatus(client.id)}
                          className={`rounded-xl ${
                            client.statut === "actif"
                              ? "bg-red-500 hover:bg-red-600 text-white"
                              : "bg-green-500 hover:bg-green-600 text-white"
                          }`}
                        >
                          {client.statut === "actif" ? (
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
