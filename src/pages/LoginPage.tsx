
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().min(1, 'Adresa de email este obligatorie').email('Adresa de email este invalidă'),
  password: z.string().min(6, 'Parola trebuie să aibă cel puțin 6 caractere'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      login(values.email, values.password);
      
      toast({
        title: 'Autentificare reușită',
        description: 'Bine ai revenit în contul tău Veloura!',
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Autentificare eșuată',
        description: 'Verifică adresa de email și parola',
        variant: 'destructive',
      });
      console.error(error);
    }
  }

  return (
    <div className="py-12">
      <div className="wedding-container max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Autentificare</CardTitle>
            <CardDescription className="text-center">
              Intră în contul tău Veloura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parolă</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="wedding-btn-secondary w-full">
                  Autentificare
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Nu ai încă un cont?{' '}
              <Link to="/register" className="text-wedding-gold hover:underline">
                Înregistrează-te
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
