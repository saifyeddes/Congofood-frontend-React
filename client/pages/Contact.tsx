import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Heart,
  Sparkles,
  CheckCircle
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-24 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 animate-in fade-in duration-1000">
              <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 px-8 py-3 text-base font-bold">
                <Headphones className="mr-2 w-5 h-5" />
                Support Client 24/7
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                  Contactez-nous
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Notre équipe est là pour vous aider. Posez-nous vos questions,
                partagez vos commentaires ou demandez de l'aide.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <MessageCircle className="w-6 h-6 mr-3" />
                    Informations de Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: "Téléphone",
                      detail: "+243 123 456 789",
                      subtitle: "Disponible 24h/24",
                      color: "from-emerald-400 to-green-500"
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      detail: "contact@congofood.com",
                      subtitle: "Réponse sous 24h",
                      color: "from-blue-400 to-indigo-500"
                    },
                    {
                      icon: MapPin,
                      title: "Adresse",
                      detail: "Avenue Lumumba, Gombe",
                      subtitle: "Kinshasa, RDC",
                      color: "from-purple-400 to-pink-500"
                    },
                    {
                      icon: Clock,
                      title: "Horaires",
                      detail: "7j/7 de 9h à 23h",
                      subtitle: "Service continu",
                      color: "from-orange-400 to-red-500"
                    }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className={`w-12 h-12 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{contact.title}</h3>
                        <p className="text-gray-700 font-medium">{contact.detail}</p>
                        <p className="text-gray-500 text-sm">{contact.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Response Promise */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">Réponse Rapide Garantie</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Nous nous engageons à répondre à tous vos messages dans les <strong>2 heures</strong>
                    pendant nos heures d'ouverture.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 animate-in slide-in-from-right duration-1000 delay-300">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <Send className="w-6 h-6 mr-3" />
                    Envoyez-nous un Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12 animate-in fade-in duration-1000">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Envoyé !</h3>
                      <p className="text-gray-600">
                        Merci pour votre message. Notre équipe vous répondra très bientôt.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-700 font-medium">
                            Nom Complet *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 py-3"
                            placeholder="Votre nom complet"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-700 font-medium">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 py-3"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-700 font-medium">
                            Téléphone
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 py-3"
                            placeholder="+243 123 456 789"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-gray-700 font-medium">
                            Sujet *
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 py-3"
                            placeholder="Sujet de votre message"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-700 font-medium">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                          placeholder="Écrivez votre message ici... Nous aimerions entendre vos commentaires, questions ou suggestions."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <Send className="w-5 h-5 mr-3" />
                        Envoyer le Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ or Additional Help */}
          <div className="mt-16 text-center animate-in fade-in duration-1000 delay-1000">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-50 to-blue-50 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Heart className="w-6 h-6 text-red-500 animate-pulse" />
                  <h3 className="text-2xl font-bold text-gray-900">Besoin d'aide immédiate ?</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Pour les urgences ou questions sur vos commandes, n'hésitez pas à nous appeler directement.
                  Notre équipe de support est disponible 24h/24 pour vous assister.
                </p>
                <Button
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Appelez Maintenant: +243 123 456 789
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
