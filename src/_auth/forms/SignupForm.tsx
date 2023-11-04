import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

function SignupForm() {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isLoading: isCreateUser} = useCreateUserAccount();

  const { mutateAsync: signInAccount, isLoading: isSigningIn} = useSignInAccount();
  
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })
  
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);

    if(!newUser) {
      return toast({title: "A criação da conta falhou. Tente novamente!"});
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session) {
      return toast({title: "A criação da conta falhou. Tente novamente!"});
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset()
      
      navigate('/')
    } else {
      return toast({title: "A criação da conta falhou. Tente novamente!"});
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-enter flex-col">
        <img src="/assets/images/logo.svg" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Criar uma nova conta</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Para usar o snapgram, entre com seus dados!</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome usuário</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreateUser ? (
            <div className="flex-center gap-2">
             <Loader /> Criando nova conta...
            </div>
            ) : "Criar" }
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
              Já tem uma conta?
              <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Entrar</Link>
          </p>

        </form>
      </div>
    </Form>
  )
}

export default SignupForm