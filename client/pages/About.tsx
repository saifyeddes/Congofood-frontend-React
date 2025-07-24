import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Heart,
  Award,
  Users,
  Globe,
  ChefHat,
  Truck,
  Star,
  Target,
  Sparkles,
  MapPin,
  Clock,
  Shield
} from "lucide-react";

export default function About() {
  const stats = [
    { icon: Users, number: "15K+", label: "Clients Satisfaits" },
    { icon: ChefHat, number: "50+", label: "Plats Authentiques" },
    { icon: Truck, number: "500+", label: "Livraisons/jour" },
    { icon: Star, number: "4.9", label: "Note Moyenne" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Authenticité",
      description: "Nous préservons les recettes traditionnelles congolaises transmises de génération en génération.",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: Award,
      title: "Qualité Premium",
      description: "Ingrédients frais, chefs expérimentés et préparation soignée pour chaque plat.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Clock,
      title: "Service Rapide",
      description: "Livraison express en 30 minutes pour vous faire découvrir nos saveurs rapidement.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Shield,
      title: "Confiance",
      description: "Hygiène stricte, livraison sécurisée et satisfaction client garantie à 100%.",
      color: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-24 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 animate-in fade-in duration-1000">
              <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 px-8 py-3 text-base font-bold">
                <Globe className="mr-2 w-5 h-5" />
                Notre Histoire
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  À Propos de Nous
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Congo Food est né de la passion de partager l'authenticité culinaire congolaise
                avec le monde, une livraison à la fois.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 px-6 py-2">
                  <Target className="mr-2 w-4 h-4" />
                  Notre Mission
                </Badge>

                <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
                  Apporter l'Afrique
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    à Votre Table
                  </span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed">
                  Chez Congo Food, nous croyons que la nourriture est bien plus qu'un simple repas.
                  C'est un pont entre les cultures, un moyen de préserver nos traditions et de créer
                  des souvenirs durables.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Fondée par des passionnés de cuisine congolaise, notre plateforme connecte
                  les amateurs de saveurs authentiques avec les meilleurs chefs traditionnels
                  de Kinshasa et d'ailleurs.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Link to="/menu">
                  <ChefHat className="w-5 h-5 mr-2" />
                  Découvrir Notre Menu
                </Link>
              </Button>
            </div>

            <div className="relative animate-in slide-in-from-right duration-1000 delay-300">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
                <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-100 p-4">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&crop=center"
                    alt="Cuisine congolaise authentique"
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-3xl transform rotate-6 scale-105 -z-10"></div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-xl bg-white/80 backdrop-blur-sm animate-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Values Section */}
          <div className="mb-20 animate-in fade-in duration-1000 delay-1000">
            <div className="text-center space-y-6 mb-16">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-6 py-2">
                <Sparkles className="mr-2 w-4 h-4" />
                Nos Valeurs
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
                Ce qui Nous Anime
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Quatre piliers fondamentaux guident chaque décision que nous prenons
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in slide-in-from-bottom duration-1000"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed text-center">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-emerald-50 to-blue-50 overflow-hidden animate-in fade-in duration-1000 delay-1500">
            <CardContent className="p-12 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-gray-900">Restons en Contact</h3>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Une question sur nos plats ? Envie de nous faire part de vos suggestions ?
                  Notre équipe est là pour vous écouter.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Link to="/contact">
                    <Heart className="w-5 h-5 mr-2" />
                    Nous Contacter
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
