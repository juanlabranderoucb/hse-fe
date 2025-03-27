import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { usePost } from "@/hooks/fetch/fetch.hook";
import { useAuth } from "@/hooks/auth/auth.hook";

const formSchema = z.object({
  userName: z.string().min(4, "Campo requerido"),
  password: z.string().min(8, "Mínimo 6 caracteres").max(50),
});

type TFormSchema = z.infer<typeof formSchema>;

export function Login() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  });
  const { login } = useAuth();
  const onCompleted = (data: { access_token: string }) => {
    login(data.access_token);
  }
  const { call: post } = usePost('/auth/login', { onCompleted });
  const onSubmit = (data: TFormSchema) => post({ body: data });

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tu nombre de usuario"
                        type="text"
                        {...field}
                      />
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
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Cargando..." : "Ingresar"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">

          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
