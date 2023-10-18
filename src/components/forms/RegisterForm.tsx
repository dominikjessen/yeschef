'use client';

import Link from 'next/link';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import Logo from '/public/YesChef_Logo.svg';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { useSearchParams } from 'next/navigation';

type RegisterFormProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
};

export default function RegisterForm({ providers }: RegisterFormProps) {
  const googleProvider = providers?.google;
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const formSchema = z.object({
    email: z.string().email()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  //
  async function onEmailSubmit(values: z.infer<typeof formSchema>) {
    await signIn('email', { email: values.email });
  }

  async function signUpWithGoogle() {
    await signIn(googleProvider?.id);
  }

  return (
    <div className="max-w-md w-full flex flex-col px-12 pt-8 pb-12 border rounded-xl shadow-lg bg-white">
      {/* Header */}
      <Image src={Logo.src} alt="Yes, Chef! Logo" width={Logo.width} height={Logo.height} className="self-center" />
      <h2 className="font-bold text-2xl mt-12">Sign up</h2>
      <span className="mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-foreground/70 hover:text-foreground/60">
          Login
        </Link>
      </span>

      {/* Google SSO */}
      <Button onClick={signUpWithGoogle} variant="unstyled" size="lg" className="mt-8 w-full bg-white rounded border hover:shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        <span className="ml-4">Continue with {googleProvider?.name}</span>
      </Button>

      {/* Spacer */}
      <div className="my-8 flex gap-8 justify-evenly items-center">
        <Separator />
        <p className="text-sm text-foreground/50">or</p>
        <Separator />
      </div>

      {/* Email signup form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onEmailSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" size="default" className="w-full">
            Continue with Email
          </Button>
        </form>
      </Form>

      <p className="mt-8 leading-relaxed font-normal text-sm text-foreground/70">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="font-bold underline underline-offset-2 hover:text-foreground/70">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" className="font-bold underline underline-offset-2 ">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
