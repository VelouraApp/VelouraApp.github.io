
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Helmet } from 'react-helmet-async';
import { Package, Calendar, User } from 'lucide-react';
import { getSavedPlans, deletePlanById } from '@/services/planningService';
import { useToast } from '@/hooks/use-toast';

// Mock data for orders demonstration
const mockOrders = [
  {
    id: "ORD-2025-001",
    date: "2025-05-10",
    status: "Livrată",
    total: 4599,
    items: [
      { name: "Rochie Prințesă cu Dantelă", quantity: 1, price: 3999 },
      { name: "Tiară din Cristale", quantity: 1, price: 600 },
    ]
  },
  {
    id: "ORD-2025-002",
    date: "2025-05-11",
    status: "În procesare",
    total: 1199,
    items: [
      { name: "Set Voal cu Dantelă", quantity: 1, price: 659 },
      { name: "Pantofi Eleganți cu Cristale", quantity: 1, price: 540 },
    ]
  }
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { isLoggedIn, userEmail, logout } = useAuth();
  const [weddingPlans, setWeddingPlans] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Load saved wedding plans when component mounts
      loadSavedPlans();
    }
  }, [isLoggedIn, navigate]);

  // Load saved wedding plans from localStorage
  const loadSavedPlans = () => {
    const savedPlans = getSavedPlans();
    setWeddingPlans(savedPlans);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeletePlan = (id) => {
    deletePlanById(id);
    toast({
      title: "Plan șters",
      description: "Planul de nuntă a fost șters cu succes.",
    });
    loadSavedPlans(); // Reload plans after deletion
  };

  const handleEditPlan = (id) => {
    // For future implementation: navigate to plan editing page
    navigate('/planificare');
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Nedefinit";
    return new Date(dateString).toLocaleDateString('ro-RO');
  };

  const getServicesList = (selectedServices) => {
    if (!selectedServices) return "Niciun serviciu selectat";
    
    const serviceNames = {
      catering: "Catering",
      photography: "Fotografie",
      videography: "Videografie",
      music: "DJ & Muzică",
      flowers: "Aranjamente Florale",
      transportation: "Transport",
      cake: "Tort de Nuntă"
    };
    
    const activeServices = Object.entries(selectedServices)
      .filter(([_, isSelected]) => isSelected)
      .map(([service]) => serviceNames[service] || service);
    
    return activeServices.length > 0 ? activeServices.join(", ") : "Niciun serviciu selectat";
  };

  if (!isLoggedIn) {
    return null; // Will redirect due to the useEffect
  }

  return (
    <div className="py-12">
      <Helmet>
        <title>Profil - Veloura | Where Every 'Yes' Begins in Style</title>
        <meta name="description" content="Gestionează-ți contul, vezi istoricul comenzilor și planurile tale de nuntă cu Veloura." />
        <link rel="canonical" href="https://veloura.ro/profil" />
      </Helmet>
      
      <div className="wedding-container">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="wedding-title mb-2">Contul meu</h1>
            <p className="text-gray-600">Bun venit, {userEmail}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="mt-4 md:mt-0">
            Deconectare
          </Button>
        </div>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User size={16} />
              <span>Date personale</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package size={16} />
              <span>Comenzi</span>
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Planuri nuntă</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Date personale</CardTitle>
                <CardDescription>
                  Informațiile contului tău
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-gray-600">{userEmail}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium">Adresă de livrare</p>
                  <p className="text-gray-600">Nu ai setat încă o adresă de livrare</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium">Telefon</p>
                  <p className="text-gray-600">Nu ai setat încă un număr de telefon</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Editează datele personale
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif mb-4">Istoricul comenzilor</h2>
              
              {mockOrders.length > 0 ? (
                mockOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>{order.id}</CardTitle>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          order.status === 'Livrată' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <CardDescription>Comandă din {order.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Cantitate: {item.quantity}</p>
                            </div>
                            <p>{item.price} Lei</p>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between items-center font-medium">
                        <p>Total</p>
                        <p>{order.total} Lei</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Vezi detalii comandă
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Nicio comandă</CardTitle>
                    <CardDescription>
                      Nu ai plasat încă nicio comandă
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-full wedding-btn-secondary">
                      <a href="/shop">Începe cumpărăturile</a>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="plans">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif mb-4">Planurile mele de nuntă</h2>
              
              {weddingPlans.length > 0 ? (
                weddingPlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <CardTitle>Planificare Nuntă</CardTitle>
                      <CardDescription>
                        Creat pe: {formatDate(plan.createdAt)} | Data evenimentului: {formatDate(plan.weddingDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Număr invitați</p>
                          <p className="text-gray-600">{plan.guestCount}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Locație</p>
                          <p className="text-gray-600">{plan.venue}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Mărime locație</p>
                          <p className="text-gray-600">
                            {plan.venueSize === 'small' ? 'Mică' : 
                             plan.venueSize === 'medium' ? 'Medie' : 'Mare'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Stil decorațiuni</p>
                          <p className="text-gray-600">
                            {plan.decorStyle === 'simple' ? 'Simplu & Elegant' : 
                             plan.decorStyle === 'elegant' ? 'Clasic & Sofisticat' : 'Lux & Extravagant'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Servicii incluse</p>
                          <p className="text-gray-600">{getServicesList(plan.selectedServices)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Cost estimat</p>
                          <p className="text-gray-600 font-bold text-wedding-gold">
                            {plan.totalEstimate.toLocaleString()} Lei
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto"
                        onClick={() => handleEditPlan(plan.id)}
                      >
                        Editează planul
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="w-full sm:w-auto"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        Șterge planul
                      </Button>
                      <Button className="w-full sm:w-auto wedding-btn-secondary">
                        Descarcă PDF
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Niciun plan de nuntă</CardTitle>
                    <CardDescription>
                      Nu ai creat încă niciun plan de nuntă
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-full wedding-btn-secondary">
                      <a href="/planificare">Creează primul plan</a>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
