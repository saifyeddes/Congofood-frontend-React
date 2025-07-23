import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  ChefHat,
  Search,
  Star,
  Clock,
  DollarSign,
  Image
} from "lucide-react";

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  preparationTime: string;
  isPopular: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
  available: boolean;
  createdAt: string;
}

export default function Dishes() {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: "1",
      name: "Moambé au Poulet",
      description: "Poulet mijoté dans une sauce onctueuse aux noix de palme, servi avec du riz",
      price: 15.99,
      category: "plats",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop&crop=center",
      rating: 4.9,
      preparationTime: "25-30 min",
      isPopular: true,
      isVegetarian: false,
      isSpicy: false,
      available: true,
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Saka-Saka aux Crevettes",
      description: "Feuilles de manioc cuisinées avec des crevettes fraîches et arachides",
      price: 16.99,
      category: "plats",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center",
      rating: 4.7,
      preparationTime: "30-35 min",
      isPopular: true,
      isVegetarian: false,
      isSpicy: false,
      available: true,
      createdAt: "2024-01-15"
    }
  ]);

  const categories = [
    { id: "plats", name: "Plats Principaux" },
    { id: "accompagnements", name: "Accompagnements" },
    { id: "desserts", name: "Desserts" },
    { id: "boissons", name: "Boissons" }
  ];

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    preparationTime: "",
    isPopular: false,
    isVegetarian: false,
    isSpicy: false,
    available: true
  });

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || dish.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = () => {
    if (editingDish) {
      // Update existing dish
      setDishes(dishes.map(dish => 
        dish.id === editingDish.id 
          ? { 
              ...dish, 
              ...formData, 
              price: parseFloat(formData.price) || 0,
              rating: dish.rating // Keep existing rating
            }
          : dish
      ));
    } else {
      // Add new dish
      const newDish: Dish = {
        id: Date.now().toString(),
        ...formData,
        price: parseFloat(formData.price) || 0,
        rating: 4.0, // Default rating
        createdAt: new Date().toISOString().split('T')[0]
      };
      setDishes([...dishes, newDish]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      preparationTime: "",
      isPopular: false,
      isVegetarian: false,
      isSpicy: false,
      available: true
    });
    setEditingDish(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (dish: Dish) => {
    setFormData({
      name: dish.name,
      description: dish.description,
      price: dish.price.toString(),
      category: dish.category,
      image: dish.image,
      preparationTime: dish.preparationTime,
      isPopular: dish.isPopular,
      isVegetarian: dish.isVegetarian,
      isSpicy: dish.isSpicy,
      available: dish.available
    });
    setEditingDish(dish);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (dishId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce plat?")) {
      setDishes(dishes.filter(dish => dish.id !== dishId));
    }
  };

  const toggleAvailable = (dishId: string) => {
    setDishes(dishes.map(dish =>
      dish.id === dishId ? { ...dish, available: !dish.available } : dish
    ));
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Plats</h1>
            <p className="text-muted-foreground">
              Gérez votre menu et vos spécialités congolaises
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Plat
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingDish ? "Modifier le Plat" : "Nouveau Plat"}
                </DialogTitle>
                <DialogDescription>
                  {editingDish 
                    ? "Modifiez les informations de ce plat"
                    : "Ajoutez un nouveau plat à votre menu"
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du plat</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Moambé au Poulet"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="15.99"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez ce délicieux plat..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preparationTime">Temps de préparation</Label>
                    <Input
                      id="preparationTime"
                      placeholder="25-30 min"
                      value={formData.preparationTime}
                      onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL de l'image</Label>
                  <Input
                    id="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="available"
                      checked={formData.available}
                      onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                    />
                    <Label htmlFor="available">Disponible</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popular"
                      checked={formData.isPopular}
                      onCheckedChange={(checked) => setFormData({ ...formData, isPopular: checked })}
                    />
                    <Label htmlFor="popular">Plat populaire</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="vegetarian"
                      checked={formData.isVegetarian}
                      onCheckedChange={(checked) => setFormData({ ...formData, isVegetarian: checked })}
                    />
                    <Label htmlFor="vegetarian">Végétarien</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="spicy"
                      checked={formData.isSpicy}
                      onCheckedChange={(checked) => setFormData({ ...formData, isSpicy: checked })}
                    />
                    <Label htmlFor="spicy">Épicé</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.name.trim() || !formData.price}
                >
                  {editingDish ? "Modifier" : "Créer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher un plat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Toutes catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <Card key={dish.id} className={`${!dish.available ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-2">
                <div className="relative">
                  {dish.image ? (
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                      <Image className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {dish.isPopular && (
                      <Badge className="bg-orange-500">Populaire</Badge>
                    )}
                    {dish.isVegetarian && (
                      <Badge className="bg-green-500">Végétarien</Badge>
                    )}
                    {dish.isSpicy && (
                      <Badge className="bg-red-500">🌶️ Épicé</Badge>
                    )}
                  </div>
                  <Badge 
                    variant={dish.available ? "default" : "secondary"}
                    className="absolute top-2 right-2"
                  >
                    {dish.available ? "Disponible" : "Indisponible"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <CardTitle className="text-lg mb-1">{dish.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {dish.description}
                  </CardDescription>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline">{getCategoryName(dish.category)}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{dish.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{dish.preparationTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-3 h-3 text-primary" />
                    <span className="font-semibold text-primary">{dish.price}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAvailable(dish.id)}
                  >
                    {dish.available ? "Masquer" : "Afficher"}
                  </Button>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(dish)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(dish.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <ChefHat className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucun plat trouvé
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery || categoryFilter !== "all"
                    ? "Aucun plat ne correspond à vos critères de recherche."
                    : "Commencez par ajouter vos premiers plats au menu."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{dishes.length}</div>
                <div className="text-xs text-muted-foreground">Total Plats</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {dishes.filter(d => d.available).length}
                </div>
                <div className="text-xs text-muted-foreground">Disponibles</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {dishes.filter(d => d.isPopular).length}
                </div>
                <div className="text-xs text-muted-foreground">Populaires</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  ${(dishes.reduce((sum, d) => sum + d.price, 0) / dishes.length || 0).toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">Prix Moyen</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
