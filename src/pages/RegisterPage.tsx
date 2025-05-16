
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
  confirmPassword: z.string().min(6, 'Confirmarea parolei este obligatorie'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Parolele nu coincid",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      register(values.email, values.password);
      
      toast({
        title: 'Înregistrare reușită',
        description: 'Contul tău a fost creat cu succes!',
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Înregistrare eșuată',
        description: 'A apărut o eroare la crearea contului',
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
            <CardTitle className="text-center text-2xl">Înregistrare</CardTitle>
            <CardDescription className="text-center">
              Creează un cont pentru a continua
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmă parola</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="wedding-btn-secondary w-full">
                  Înregistrare
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Ai deja un cont?{' '}
              <Link to="/login" className="text-wedding-gold hover:underline">
                Autentifică-te
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
