import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="max-w-md mx-auto px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Construction className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="text-lg">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Cette page est actuellement en cours de développement. Revenez bientôt ou continuez à explorer nos autres fonctionnalités.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="default">
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/menu">
                    Voir le Menu
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
