import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { savePlanningData } from '@/services/planningService';

export default function PlanningPage() {
  const [guestCount, setGuestCount] = useState<number>(50);
  const [venue, setVenue] = useState<string>("");
  const [venueSize, setVenueSize] = useState<string>("medium");
  const [decorStyle, setDecorStyle] = useState<string>("elegant");
  const [weddingDate, setWeddingDate] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("details");
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({
    catering: false,
    photography: false,
    videography: false,
    music: false,
    flowers: false,
    transportation: false,
    cake: false,
  });
  const [totalEstimate, setTotalEstimate] = useState<number>(0);
  const { toast } = useToast();

  // Service costs (in Lei)
  const serviceCosts = {
    basePrice: 10000,
    guestPrice: 350, // per guest
    venueSizes: {
      small: 5000,
      medium: 8000,
      large: 15000,
    },
    decorStyles: {
      simple: 3000,
      elegant: 6000,
      luxury: 10000,
    },
    services: {
      catering: 150, // per guest
      photography: 3500,
      videography: 4500,
      music: 2500,
      flowers: 3000,
      transportation: 1500,
      cake: 1000,
    }
  };

  // Calculate total estimate
  useEffect(() => {
    let total = serviceCosts.basePrice;
    
    // Guest-related costs
    total += guestCount * serviceCosts.guestPrice;
    
    // Venue size
    if (venueSize) {
      total += serviceCosts.venueSizes[venueSize as keyof typeof serviceCosts.venueSizes];
    }
    
    // Decoration style
    if (decorStyle) {
      total += serviceCosts.decorStyles[decorStyle as keyof typeof serviceCosts.decorStyles];
    }
    
    // Additional services
    Object.entries(selectedServices).forEach(([service, isSelected]) => {
      if (isSelected) {
        const serviceKey = service as keyof typeof serviceCosts.services;
        const cost = serviceCosts.services[serviceKey];
        
        // If service is catering, multiply by guest count
        if (service === 'catering') {
          total += cost * guestCount;
        } else {
          total += cost;
        }
      }
    });
    
    setTotalEstimate(total);
  }, [guestCount, venue, venueSize, decorStyle, selectedServices]);

  // Toggle service selection
  const toggleService = (service: string) => {
    setSelectedServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  // Handle plan submission - updated to save the planning data
  const handleSubmitPlan = () => {
    if (!venue || !weddingDate) {
      toast({
        title: "Informații lipsă",
        description: "Vă rugăm completați locația și data nunții.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      savePlanningData({
        weddingDate,
        venue,
        venueSize,
        guestCount,
        decorStyle,
        selectedServices,
        totalEstimate
      });
      
      toast({
        title: "Plan salvat cu succes!",
        description: "Planul dumneavoastră de nuntă a fost salvat și poate fi accesat din pagina de profil.",
      });
    } catch (error) {
      toast({
        title: "Eroare la salvare",
        description: "A apărut o eroare la salvarea planului. Vă rugăm încercați din nou.",
        variant: "destructive"
      });
    }
  };

  // Handle email send
  const handleSendPlanEmail = () => {
    if (!venue || !weddingDate) {
      toast({
        title: "Informații lipsă",
        description: "Vă rugăm completați locația și data nunții pentru a trimite planul.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Plan trimis pe email!",
      description: "Planul dumneavoastră de nuntă a fost trimis pe adresa de email.",
    });
  };

  // Tab navigation functions
  const navigateToTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Safe click helper function
  const safeClickElement = (selector: string) => {
    const element = document.querySelector(selector);
    if (element instanceof HTMLElement) {
      element.click();
    }
  };

  return (
    <div className="py-12">
      <div className="wedding-container">
        <h1 className="wedding-title mb-4 text-center">Planificare Nuntă</h1>
        <p className="text-center max-w-2xl mx-auto mb-12">
          Completați formularul pentru a crea planul perfect pentru nunta dumneavoastră și pentru a primi o estimare de cost.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger value="details">Detalii de bază</TabsTrigger>
            <TabsTrigger value="services">Servicii</TabsTrigger>
            <TabsTrigger value="summary">Sumar</TabsTrigger>
          </TabsList>
          
          {/* Basic Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Detalii de bază</CardTitle>
                <CardDescription>Introduceți informațiile principale despre evenimentul dumneavoastră.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Wedding Date */}
                <div className="space-y-2">
                  <Label htmlFor="wedding-date">Data nunții</Label>
                  <Input 
                    id="wedding-date" 
                    type="date" 
                    value={weddingDate} 
                    onChange={(e) => setWeddingDate(e.target.value)} 
                  />
                </div>
                
                {/* Venue */}
                <div className="space-y-2">
                  <Label htmlFor="venue">Locație</Label>
                  <Input 
                    id="venue" 
                    placeholder="Numele locației pentru nuntă" 
                    value={venue} 
                    onChange={(e) => setVenue(e.target.value)}
                  />
                </div>
                
                {/* Venue Size */}
                <div className="space-y-2">
                  <Label htmlFor="venue-size">Mărime locație</Label>
                  <Select value={venueSize} onValueChange={setVenueSize}>
                    <SelectTrigger id="venue-size">
                      <SelectValue placeholder="Selectați mărimea locației" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Mică (până la 80 invitați)</SelectItem>
                      <SelectItem value="medium">Medie (80-150 invitați)</SelectItem>
                      <SelectItem value="large">Mare (peste 150 invitați)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Guest Count */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="guest-count">Număr de invitați: {guestCount}</Label>
                  </div>
                  <Slider 
                    id="guest-count"
                    value={[guestCount]} 
                    min={10} 
                    max={300} 
                    step={10} 
                    onValueChange={value => setGuestCount(value[0])}
                  />
                </div>
                
                {/* Decoration Style */}
                <div className="space-y-2">
                  <Label htmlFor="decor-style">Stil decorațiuni</Label>
                  <Select value={decorStyle} onValueChange={setDecorStyle}>
                    <SelectTrigger id="decor-style">
                      <SelectValue placeholder="Selectați stilul decorațiunilor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simplu & Elegant</SelectItem>
                      <SelectItem value="elegant">Clasic & Sofisticat</SelectItem>
                      <SelectItem value="luxury">Lux & Extravagant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigateToTab("services")}>
                  Continuă la Servicii
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Servicii pentru nuntă</CardTitle>
                <CardDescription>Selectați serviciile de care aveți nevoie pentru eveniment.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Catering */}
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="catering" 
                      checked={selectedServices.catering} 
                      onCheckedChange={() => toggleService('catering')}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="catering" 
                        className="cursor-pointer"
                      >
                        Catering
                      </Label>
                      <p className="text-sm text-gray-500">
                        Meniu complet cu aperitive, fel principal și desert.
                        <span className="block font-medium text-wedding-gold">{serviceCosts.services.catering} Lei / invitat</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Photography */}
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="photography" 
                      checked={selectedServices.photography} 
                      onCheckedChange={() => toggleService('photography')}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="photography" 
                        className="cursor-pointer"
                      >
                        Fotografie
                      </Label>
                      <p className="text-sm text-gray-500">
                        Servicii profesionale de fotografie pe tot parcursul evenimentului.
                        <span className="block font-medium text-wedding-gold">{serviceCosts.services.photography} Lei</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Videography */}
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="videography" 
                      checked={selectedServices.videography} 
                      onCheckedChange={() => toggleService('videography')}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="videography" 
                        className="cursor-pointer"
                      >
                        Videografie
                      </Label>
                      <p className="text-sm text-gray-500">
                        Filmare profesională și editare video pentru amintiri de neuitat.
                        <span className="block font-medium text-wedding-gold">{serviceCosts.services.videography} Lei</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Music */}
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="music" 
                      checked={selectedServices.music} 
                      onCheckedChange={() => toggleService('music')}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="music" 
                        className="cursor-pointer"
                      >
                        DJ & Muzică
                      </Label>
                      <p className="text-sm text-gray-500">
                        DJ profesionist cu sistem de sonorizare pentru întreaga seară.
                        <span className="block font-medium text-wedding-gold">{serviceCosts.services.music} Lei</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Flowers */}
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="flowers" 
                      checked={selectedServices.flowers} 
                      onCheckedChange={() => toggleService('flowers')}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="flowers" 
                        className="cursor-pointer"
                      >
                        Aranjamente Florale
                      </Label>
                      <p className="text-sm text-gray-500">
                        Buchet de mireasă, aranjamente pentru masă și decorațiuni florale.
                        <span className="block font-medium text-wedding-gold">{serviceCosts.services.flowers} Lei</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Transportation */}
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="transportation" 
                      checked={selectedServices.transportation} 
                      onCheckedChange={() => toggleService('transportation')}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="transportation" 
                        className="cursor-pointer"
                      >
                        Transport
                      </Label>
                      <p className="text-sm text-gray-500">
                        Limuzină pentru miri și transport pentru invitați.
                        <span className="block font-medium text-wedding-gold">{serviceCosts.services.transportation} Lei</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Wedding Cake */}
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="cake" 
                      checked={selectedServices.cake} 
                      onCheckedChange={() => toggleService('cake')}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="cake" 
                        className="cursor-pointer"
                      >
                        Tort de Nuntă
                      </Label>
                      <p className="text-sm text-gray-500">
                        Tort personalizat pentru ceremonie.
                        <span className="block font-medium text-wedding-gold">{serviceCosts.services.cake} Lei</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => navigateToTab("details")}
                >
                  Înapoi la Detalii
                </Button>
                <Button onClick={() => navigateToTab("summary")}>
                  Continuă la Sumar
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Summary Tab */}
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Sumar Planificare</CardTitle>
                <CardDescription>Sumar al detaliilor și costurilor estimate pentru nuntă.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Details Summary */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Detalii de bază</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Data nunții:</span>
                          <span>{weddingDate || 'Neselectat'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Locație:</span>
                          <span>{venue || 'Neselectat'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Mărime locație:</span>
                          <span>
                            {venueSize === 'small' ? 'Mică' : venueSize === 'medium' ? 'Medie' : 'Mare'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Număr invitați:</span>
                          <span>{guestCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Stil decorațiuni:</span>
                          <span>
                            {decorStyle === 'simple' 
                              ? 'Simplu & Elegant' 
                              : decorStyle === 'elegant' 
                              ? 'Clasic & Sofisticat' 
                              : 'Lux & Extravagant'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Services Summary */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Servicii selectate</h3>
                      <div className="space-y-2">
                        {Object.entries(selectedServices).filter(([_, isSelected]) => isSelected).length === 0 ? (
                          <p className="text-sm text-gray-500">Nu ați selectat niciun serviciu.</p>
                        ) : (
                          Object.entries(selectedServices).map(([service, isSelected]) => 
                            isSelected && (
                              <div key={service} className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                  {service === 'catering' ? 'Catering' :
                                   service === 'photography' ? 'Fotografie' :
                                   service === 'videography' ? 'Videografie' :
                                   service === 'music' ? 'DJ & Muzică' :
                                   service === 'flowers' ? 'Aranjamente Florale' :
                                   service === 'transportation' ? 'Transport' : 'Tort de Nuntă'}
                                </span>
                                <span className="font-medium">
                                  {service === 'catering' 
                                    ? `${serviceCosts.services.catering * guestCount} Lei`
                                    : `${serviceCosts.services[service as keyof typeof serviceCosts.services]} Lei`}
                                </span>
                              </div>
                            )
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Total Estimate */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-medium">Cost Total Estimat:</h3>
                      <span className="text-3xl font-bold text-wedding-gold">{totalEstimate.toLocaleString()} Lei</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Aceasta este o estimare care poate varia în funcție de opțiunile exacte și de furnizori.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigateToTab("services")}
                  className="w-full sm:w-auto"
                >
                  Înapoi la Servicii
                </Button>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button 
                    onClick={handleSubmitPlan}
                    className="w-full sm:w-auto"
                  >
                    Salvează Planul
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={handleSendPlanEmail}
                    className="w-full sm:w-auto"
                  >
                    Trimite pe Email
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
