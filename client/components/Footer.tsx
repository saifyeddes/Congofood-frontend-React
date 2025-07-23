import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock, Heart, Award, Truck, ChefHat } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-blue-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-6 animate-in fade-in duration-1000">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-xl">C</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Congo Food</h3>
                  <p className="text-emerald-300 text-sm font-medium">Saveurs Authentiques</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Découvrez l'art culinaire congolais avec nos plats authentiques,
                préparés avec passion et livrés avec amour directement à votre porte.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all duration-300 cursor-pointer group">
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all duration-300 cursor-pointer group">
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all duration-300 cursor-pointer group">
                  <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-6 animate-in fade-in duration-1000 delay-200">
              <h4 className="text-lg font-bold text-white flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-emerald-400" />
                Navigation
              </h4>
              <div className="space-y-3">
                {[
                  { to: "/", label: "Accueil" },
                  { to: "/menu", label: "Notre Menu" },
                  { to: "/contact", label: "Contact" },
                  { to: "/delivery", label: "Livraison" }
                ].map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium group"
                  >
                    <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6 animate-in fade-in duration-1000 delay-400">
              <h4 className="text-lg font-bold text-white flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-400" />
                Nos Services
              </h4>
              <div className="space-y-4">
                {[
                  { icon: Truck, label: "Livraison Express", desc: "30 minutes" },
                  { icon: ChefHat, label: "Cuisine Authentique", desc: "Recettes traditionnelles" },
                  { icon: Heart, label: "Fait avec Amour", desc: "Ingrédients frais" },
                  { icon: Award, label: "Qualité Premium", desc: "Service 5 étoiles" }
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{service.label}</div>
                      <div className="text-gray-400 text-xs">{service.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-in fade-in duration-1000 delay-600">
              <h4 className="text-lg font-bold text-white flex items-center">
                <Phone className="w-5 h-5 mr-2 text-purple-400" />
                Contact
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">+243 123 456 789</div>
                    <div className="text-gray-400 text-sm">24/7 Support</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">hello@congofood.com</div>
                    <div className="text-gray-400 text-sm">Support client</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mt-1">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Kinshasa, RDC</div>
                    <div className="text-gray-400 text-sm">Avenue Lumumba, Gombe</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">7j/7 - 9h à 23h</div>
                    <div className="text-gray-400 text-sm">Horaires de service</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <p className="text-gray-300">
                © 2024 Congo Food. Fait avec amour au Congo. Tous droits réservés.
              </p>
            </div>
            <div className="flex space-x-8">
              <Link to="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium">
                Conditions d'utilisation
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
