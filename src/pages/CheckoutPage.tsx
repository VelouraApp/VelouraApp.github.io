
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';

const formSchema = z.object({
  firstName: z.string().min(1, 'Prenumele este obligatoriu'),
  lastName: z.string().min(1, 'Numele este obligatoriu'),
  email: z.string().min(1, 'Email-ul este obligatoriu').email('Email invalid'),
  phone: z.string().min(1, 'Telefonul este obligatoriu'),
  address: z.string().min(1, 'Adresa este obligatorie'),
  city: z.string().min(1, 'Orașul este obligatoriu'),
  county: z.string().min(1, 'Județul este obligatoriu'),
  postalCode: z.string().min(1, 'Codul poștal este obligatoriu'),
  paymentMethod: z.enum(['card', 'cash']),
  notes: z.string().optional(),
});

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, getTotal, clearCart } = useCart();
  const { isLoggedIn, userEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: userEmail || '',
      phone: '',
      address: '',
      city: '',
      county: '',
      postalCode: '',
      paymentMethod: 'card',
      notes: '',
    },
  });
  
  const subtotal = getTotal();
  const shipping = subtotal > 300 ? 0 : 15;
  const total = subtotal + shipping;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (cartItems.length === 0) {
      toast({
        title: "Coșul este gol",
        description: "Adăugați produse în coș înainte de a finaliza comanda.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Clear cart after successful order
      clearCart();
      
      // Show success message
      toast({
        title: "Comandă plasată cu succes!",
        description: "Vă mulțumim pentru comanda dumneavoastră. Veți primi un email de confirmare în curând.",
      });
      
      // Redirect to success page or home
      navigate('/');
      setLoading(false);
    }, 1500);
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="py-12">
      {/* SEO Optimizations */}
      <Helmet>
        <title>Finalizare comandă | Veloura - Where Every 'Yes' Begins in Style</title>
        <meta name="description" content="Finalizați comanda și pregătiți-vă pentru ziua cea mare cu produsele Veloura." />
      </Helmet>
      
      <div className="wedding-container">
        <h1 className="wedding-title mb-8 text-center">Finalizare comandă</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Detalii de livrare</CardTitle>
                <CardDescription>Introduceți adresa unde doriți să primiți comanda</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prenume</FormLabel>
                            <FormControl>
                              <Input placeholder="Prenume" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nume</FormLabel>
                            <FormControl>
                              <Input placeholder="Nume" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input placeholder="07xx xxx xxx" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresa</FormLabel>
                          <FormControl>
                            <Input placeholder="Strada, număr, bloc, apartament" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Oraș</FormLabel>
                            <FormControl>
                              <Input placeholder="Oraș" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="county"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Județ</FormLabel>
                            <FormControl>
                              <Input placeholder="Județ" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cod poștal</FormLabel>
                            <FormControl>
                              <Input placeholder="Cod poștal" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Metodă de plată</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="card" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Card de credit / debit
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cash" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Ramburs la livrare
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Note comandă (opțional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Instrucțiuni speciale pentru livrare sau alte detalii" {...field} />
                          </FormControl>
                          <FormDescription>
                            Orice informații suplimentare pentru comanda dvs.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="wedding-btn-secondary w-full" disabled={loading}>
                      {loading ? 'Se procesează...' : 'Finalizează comanda'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Sumar comandă</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Cantitate: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">{(item.price * item.quantity).toFixed(2)} Lei</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} Lei</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport</span>
                    <span>{shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2)} Lei`}</span>
                  </div>
                </div>

                <Separator />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{total.toFixed(2)} Lei</span>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                <p>
                  Plasând această comandă, sunteți de acord cu <a href="/termeni" className="text-wedding-gold hover:underline">Termenii și condițiile</a> și <a href="/confidentialitate" className="text-wedding-gold hover:underline">Politica de confidențialitate</a>.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
