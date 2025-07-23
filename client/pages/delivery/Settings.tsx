import DeliveryLayout from "@/components/delivery/DeliveryLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Settings, 
  Bell, 
  MapPin, 
  Shield, 
  Smartphone,
  Moon,
  Sun,
  Volume2,
  Navigation,
  Clock,
  Zap,
  Save
} from "lucide-react";

export default function DeliverySettings() {
  return (
    <DeliveryLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-700 to-slate-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Paramètres</h1>
              <p className="text-gray-100">
                Personnalisez votre expérience de livraison
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Settings className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <Card className="shadow-lg border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
              <CardDescription>
                Gérez vos préférences de notification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nouvelles commandes</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications pour les nouvelles commandes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rappels de livraison</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications de rappel avant l'heure de livraison
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Messages clients</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications pour les messages des clients
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Promotions</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications sur les promotions
                  </p>
                </div>
                <Switch />
              </div>

              <div className="space-y-3">
                <Label>Volume des notifications</Label>
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-4 h-4 text-gray-500" />
                  <Slider
                    defaultValue={[75]}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500 min-w-[3rem]">75%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Son de notification</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un son" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Son par défaut</SelectItem>
                    <SelectItem value="bell">Cloche</SelectItem>
                    <SelectItem value="chime">Carillon</SelectItem>
                    <SelectItem value="ping">Ping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Navigation & Maps */}
          <Card className="shadow-lg border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <MapPin className="w-5 h-5 mr-2" />
                Navigation & Cartes
              </CardTitle>
              <CardDescription>
                Paramètres de navigation et de géolocalisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Application de navigation préférée</Label>
                <Select defaultValue="google">
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une app" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Maps</SelectItem>
                    <SelectItem value="waze">Waze</SelectItem>
                    <SelectItem value="apple">Apple Maps</SelectItem>
                    <SelectItem value="builtin">Navigation intégrée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Partage de localisation</Label>
                  <p className="text-sm text-muted-foreground">
                    Permettre aux clients de suivre votre position
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode hors ligne</Label>
                  <p className="text-sm text-muted-foreground">
                    Télécharger les cartes pour utilisation hors ligne
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Optimisation d'itinéraire</Label>
                  <p className="text-sm text-muted-foreground">
                    Optimiser automatiquement vos routes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Rayon de livraison (km)</Label>
                <div className="flex items-center space-x-3">
                  <Navigation className="w-4 h-4 text-gray-500" />
                  <Slider
                    defaultValue={[15]}
                    max={50}
                    min={5}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500 min-w-[3rem]">15 km</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="shadow-lg border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <Smartphone className="w-5 h-5 mr-2" />
                Apparence
              </CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Thème</Label>
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un thème" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center">
                        <Sun className="w-4 h-4 mr-2" />
                        Clair
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center">
                        <Moon className="w-4 h-4 mr-2" />
                        Sombre
                      </div>
                    </SelectItem>
                    <SelectItem value="auto">Automatique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Langue</Label>
                <Select defaultValue="fr">
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ln">Lingala</SelectItem>
                    <SelectItem value="sw">Swahili</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Unité de distance</Label>
                <Select defaultValue="km">
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une unité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">Kilomètres</SelectItem>
                    <SelectItem value="mi">Miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode économie d'énergie</Label>
                  <p className="text-sm text-muted-foreground">
                    Réduire les animations et effets
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Affichage compact</Label>
                  <p className="text-sm text-muted-foreground">
                    Réduire l'espacement et la taille des éléments
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Work Preferences */}
          <Card className="shadow-lg border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <Clock className="w-5 h-5 mr-2" />
                Préférences de Travail
              </CardTitle>
              <CardDescription>
                Configurez vos horaires et préférences de travail
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Disponibilité par défaut</Label>
                <Select defaultValue="available">
                  <SelectTrigger>
                    <SelectValue placeholder="Statut par défaut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="busy">Occupé</SelectItem>
                    <SelectItem value="offline">Hors ligne</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Acceptation automatique</Label>
                  <p className="text-sm text-muted-foreground">
                    Accepter automatiquement les commandes
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode rush</Label>
                  <p className="text-sm text-muted-foreground">
                    Optimiser pour un maximum de livraisons
                  </p>
                </div>
                <Switch />
              </div>

              <div className="space-y-3">
                <Label>Objectif de livraisons par jour</Label>
                <div className="flex items-center space-x-3">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <Slider
                    defaultValue={[15]}
                    max={50}
                    min={5}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500 min-w-[3rem]">15</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Pause automatique après</Label>
                <Select defaultValue="4h">
                  <SelectTrigger>
                    <SelectValue placeholder="Durée de travail" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2h">2 heures</SelectItem>
                    <SelectItem value="4h">4 heures</SelectItem>
                    <SelectItem value="6h">6 heures</SelectItem>
                    <SelectItem value="8h">8 heures</SelectItem>
                    <SelectItem value="never">Jamais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="shadow-lg border-red-200 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-red-800">
                <Shield className="w-5 h-5 mr-2" />
                Confidentialité & Sécurité
              </CardTitle>
              <CardDescription>
                Gérez vos paramètres de confidentialité et de sécurité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Données de localisation</Label>
                      <p className="text-sm text-muted-foreground">
                        Enregistrer l'historique de localisation
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Partage d'analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Partager des données anonymes pour améliorer l'app
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Authentification biométrique</Label>
                      <p className="text-sm text-muted-foreground">
                        Utiliser l'empreinte digitale ou Face ID
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Suppression automatique des données</Label>
                    <Select defaultValue="never">
                      <SelectTrigger>
                        <SelectValue placeholder="Fréquence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30d">30 jours</SelectItem>
                        <SelectItem value="90d">90 jours</SelectItem>
                        <SelectItem value="1y">1 an</SelectItem>
                        <SelectItem value="never">Jamais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                      Télécharger mes données
                    </Button>
                    <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                      Supprimer mon compte
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-8">
            <Save className="w-5 h-5 mr-2" />
            Sauvegarder tous les Paramètres
          </Button>
        </div>
      </div>
    </DeliveryLayout>
  );
}
