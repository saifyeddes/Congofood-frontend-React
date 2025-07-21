import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Congo Food</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Livraison de repas congolais authentiques à votre porte. Frais, délicieux et traditionnel.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/menu" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Menu
                </Link>
                <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
                <Link to="/careers" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Careers
                </Link>
              </div>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Customer Service</h4>
              <div className="space-y-2">
                <Link to="/help" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Help Center
                </Link>
                <Link to="/track-order" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Track Order
                </Link>
                <Link to="/returns" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Returns
                </Link>
                <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground text-sm">(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground text-sm">hello@congofood.com</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <span className="text-muted-foreground text-sm">123 Food Street<br />Culinary City, FC 12345</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground text-sm">Daily: 9 AM - 11 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Congo Food. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
