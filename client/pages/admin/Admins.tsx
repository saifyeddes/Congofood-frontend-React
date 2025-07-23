import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Mail, 
  Calendar,
  Search,
  UserCheck,
  UserX
} from "lucide-react";

interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "super_admin" | "admin" | "moderator";
  active: boolean;
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}

export default function Admins() {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "admin",
      firstName: "Admin",
      lastName: "Congo Food",
      email: "admin@congofood.com",
      role: "super_admin",
      active: true,
      lastLogin: "2024-01-20 14:30",
      createdAt: "2024-01-01",
      permissions: ["all"]
    },
    {
      id: "admin2",
      firstName: "Marie",
      lastName: "Kasongo",
      email: "marie.kasongo@congofood.com",
      role: "admin",
      active: true,
      lastLogin: "2024-01-20 09:15",
      createdAt: "2024-01-10",
      permissions: ["orders", "deliveries", "customers"]
    },
    {
      id: "admin3",
      firstName: "David",
      lastName: "Mbala",
      email: "david.mbala@congofood.com",
      role: "moderator",
      active: false,
      lastLogin: "2024-01-18 16:45",
      createdAt: "2024-01-15",
      permissions: ["dishes", "categories"]
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "admin" as const,
    permissions: [] as string[]
  });

  const roleColors = {
    super_admin: "bg-purple-100 text-purple-800",
    admin: "bg-blue-100 text-blue-800",
    moderator: "bg-green-100 text-green-800"
  };

  const roleLabels = {
    super_admin: "Super Admin",
    admin: "Administrateur",
    moderator: "Modérateur"
  };

  const availablePermissions = [
    { id: "orders", name: "Gestion des Commandes" },
    { id: "deliveries", name: "Gestion des Livraisons" },
    { id: "dishes", name: "Gestion des Plats" },
    { id: "categories", name: "Gestion des Catégories" },
    { id: "customers", name: "Gestion des Clients" },
    { id: "drivers", name: "Gestion des Livreurs" },
    { id: "reports", name: "Rapports" },
    { id: "settings", name: "Paramètres" }
  ];

  const filteredAdmins = admins.filter(admin =>
    admin.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    if (editingAdmin) {
      // Update existing admin
      setAdmins(admins.map(admin => 
        admin.id === editingAdmin.id 
          ? { ...admin, ...formData }
          : admin
      ));
    } else {
      // Add new admin
      const newAdmin: Admin = {
        id: Date.now().toString(),
        ...formData,
        active: true,
        lastLogin: "Jamais connecté",
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAdmins([...admins, newAdmin]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "admin",
      permissions: []
    });
    setEditingAdmin(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (admin: Admin) => {
    setFormData({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions
    });
    setEditingAdmin(admin);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (adminId: string) => {
    if (adminId === "admin") {
      alert("Impossible de supprimer le super administrateur principal !");
      return;
    }
    if (confirm("Êtes-vous sûr de vouloir supprimer cet administrateur ?")) {
      setAdmins(admins.filter(admin => admin.id !== adminId));
    }
  };

  const toggleAdminStatus = (adminId: string) => {
    if (adminId === "admin") {
      alert("Impossible de désactiver le super administrateur principal !");
      return;
    }
    setAdmins(admins.map(admin =>
      admin.id === adminId ? { ...admin, active: !admin.active } : admin
    ));
  };

  const togglePermission = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Administrateurs</h1>
            <p className="text-muted-foreground">
              Gérez les accès et permissions des administrateurs du site
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouvel Administrateur
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingAdmin ? "Modifier l'Administrateur" : "Nouvel Administrateur"}
                </DialogTitle>
                <DialogDescription>
                  {editingAdmin 
                    ? "Modifiez les informations et permissions"
                    : "Ajoutez un nouvel administrateur au système"
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Marie"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Kasongo"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="marie@congofood.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    <option value="admin">Administrateur</option>
                    <option value="moderator">Modérateur</option>
                    <option value="super_admin">Super Administrateur</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Switch
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                        <Label htmlFor={permission.id} className="text-sm">
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()}
                >
                  {editingAdmin ? "Modifier" : "Créer"}
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
                placeholder="Rechercher un administrateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{admins.length}</div>
                <div className="text-xs text-muted-foreground">Total Admins</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {admins.filter(a => a.active).length}
                </div>
                <div className="text-xs text-muted-foreground">Actifs</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {admins.filter(a => a.role === "super_admin").length}
                </div>
                <div className="text-xs text-muted-foreground">Super Admins</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {admins.filter(a => a.role === "admin").length}
                </div>
                <div className="text-xs text-muted-foreground">Administrateurs</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admins List */}
        <div className="space-y-4">
          {filteredAdmins.map((admin) => (
            <Card key={admin.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {admin.firstName.charAt(0)}{admin.lastName.charAt(0)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold">
                          {admin.firstName} {admin.lastName}
                        </h3>
                        <Badge className={roleColors[admin.role]}>
                          {roleLabels[admin.role]}
                        </Badge>
                        <Badge variant={admin.active ? "default" : "secondary"}>
                          {admin.active ? "Actif" : "Inactif"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span>{admin.email}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Créé le {new Date(admin.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div>
                          <span>Dernière connexion: {admin.lastLogin}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {admin.permissions.includes("all") ? (
                          <Badge variant="outline">Toutes les permissions</Badge>
                        ) : (
                          admin.permissions.map(permission => {
                            const perm = availablePermissions.find(p => p.id === permission);
                            return perm ? (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {perm.name}
                              </Badge>
                            ) : null;
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(admin)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAdminStatus(admin.id)}
                      disabled={admin.id === "admin"}
                      className={admin.active ? "text-red-600" : "text-green-600"}
                    >
                      {admin.active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(admin.id)}
                      disabled={admin.id === "admin"}
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

        {filteredAdmins.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucun administrateur trouvé
                </h3>
                <p className="text-muted-foreground">
                  Aucun administrateur ne correspond à votre recherche.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
