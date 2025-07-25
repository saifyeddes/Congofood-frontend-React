import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Truck,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Crown,
} from "lucide-react";

export default function Dashboard() {
  // Mock data - in real app this would come from API
  const stats = {
    totalOrders: 156,
    activeDeliveries: 12,
    totalCustomers: 1234,
    revenue: 15420.5,
    ordersToday: 23,
    availableDrivers: 6,
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 rounded-3xl p-8 overflow-hidden animate-in fade-in duration-1000">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900">
                    Dashboard Administrateur
                  </h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-green-500 text-white border-0 px-4 py-1 animate-pulse">
                      <Activity className="w-3 h-3 mr-2" />
                      Système Actif
                    </Badge>
                    <p className="text-gray-600 font-medium">
                      {new Date().toLocaleDateString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Commandes Totales",
              value: stats.totalOrders,
              change: `+${stats.ordersToday} aujourd'hui`,
              icon: ShoppingBag,
              color: "from-blue-500 to-indigo-500",
              bgColor: "from-blue-50 to-indigo-50",
              textColor: "text-blue-600",
            },
            {
              title: "Livraisons Actives",
              value: stats.activeDeliveries,
              change: `${stats.availableDrivers} livreurs disponibles`,
              icon: Truck,
              color: "from-emerald-500 to-green-500",
              bgColor: "from-emerald-50 to-green-50",
              textColor: "text-emerald-600",
            },
            {
              title: "Clients Total",
              value: stats.totalCustomers.toLocaleString(),
              change: "+12% ce mois",
              icon: Users,
              color: "from-purple-500 to-pink-500",
              bgColor: "from-purple-50 to-pink-50",
              textColor: "text-purple-600",
            },
            {
              title: "Chiffre d'Affaires",
              value: `$${stats.revenue.toFixed(2)}`,
              change: "+8.2% ce mois",
              icon: DollarSign,
              color: "from-orange-500 to-red-500",
              bgColor: "from-orange-50 to-red-50",
              textColor: "text-orange-600",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden bg-white animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                <div
                  className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 mb-6`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </div>
                      <div className="text-3xl font-black text-gray-900">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${stat.textColor} font-semibold`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
