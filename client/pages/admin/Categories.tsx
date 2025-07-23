import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package,
  Search
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  dishCount: number;
  active: boolean;
  createdAt: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Plats Principaux",
      description: "Plats traditionnels congolais copieux et savoureux",
      dishCount: 8,
      active: true,
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "Accompagnements",
      description: "Accompagnements et garnitures pour compléter vos repas",
      dishCount: 4,
      active: true,
      createdAt: "2024-01-15"
    },
    {
      id: "3",
      name: "Desserts",
      description: "Douceurs traditionnelles congolaises",
      dishCount: 2,
      active: true,
      createdAt: "2024-01-15"
    },
    {
      id: "4",
      name: "Boissons",
      description: "Boissons locales et rafraîchissements",
      dishCount: 0,
      active: false,
      createdAt: "2024-01-16"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: formData.name, description: formData.description }
          : cat
      ));
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        dishCount: 0,
        active: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
    }

    // Reset form
    setFormData({ name: "", description: "" });
    setEditingCategory(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description
    });
    setEditingCategory(category);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (categoryId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?")) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const toggleActive = (categoryId: string) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId ? { ...cat, active: !cat.active } : cat
    ));
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Catégories</h1>
            <p className="text-muted-foreground">
              Organisez vos plats par catégories pour faciliter la navigation
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Catégorie
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Modifier la Catégorie" : "Nouvelle Catégorie"}
                </DialogTitle>
                <DialogDescription>
                  {editingCategory 
                    ? "Modifiez les informations de cette catégorie"
                    : "Créez une nouvelle catégorie pour organiser vos plats"
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de la catégorie</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Plats Principaux"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez cette catégorie..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleDialogClose}>
                  Annuler
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.name.trim()}
                >
                  {editingCategory ? "Modifier" : "Créer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher une catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card key={category.id} className={`${!category.active ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                  <Badge variant={category.active ? "default" : "secondary"}>
                    {category.active ? "Actif" : "Inactif"}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Nombre de plats:</span>
                  <span className="font-medium">{category.dishCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Créée le:</span>
                  <span className="font-medium">
                    {new Date(category.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(category.id)}
                  >
                    {category.active ? "Désactiver" : "Activer"}
                  </Button>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                      className="text-destructive hover:text-destructive"
                      disabled={category.dishCount > 0}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {category.dishCount > 0 && (
                  <p className="text-xs text-muted-foreground">
                    * Cette catégorie ne peut pas être supprimée car elle contient des plats
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucune catégorie trouvée
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? "Aucune catégorie ne correspond à votre recherche."
                    : "Commencez par créer votre première catégorie."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{categories.length}</div>
                <div className="text-xs text-muted-foreground">Total Catégories</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {categories.filter(c => c.active).length}
                </div>
                <div className="text-xs text-muted-foreground">Catégories Actives</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {categories.reduce((sum, c) => sum + c.dishCount, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total Plats</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {categories.filter(c => c.dishCount === 0).length}
                </div>
                <div className="text-xs text-muted-foreground">Catégories Vides</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
