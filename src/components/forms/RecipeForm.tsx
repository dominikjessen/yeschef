'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createNewRecipeAction } from '@/actions/createNewRecipe';
import { useTransition } from 'react';

export const recipeFormSchema = z.object({
  name: z.string().min(1, { message: 'Please add a name for this recipe' }),
  link: z.string().optional()
});

export type RecipeFormProps = {
  submitCallback: (formValues: z.infer<typeof recipeFormSchema>) => void;
};

export default function RecipeForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: '',
      link: ''
    }
  });

  async function onSubmit(values: z.infer<typeof recipeFormSchema>) {
    startTransition(async () => {
      await createNewRecipeAction(values);
      // router.replace('/items');
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe name (required)</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link to recipe</FormLabel>
              <FormControl>
                <Input type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-center">
          Add recipe
        </Button>
      </form>
    </Form>
  );
}
