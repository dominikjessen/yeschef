'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createNewRecipeAction } from '@/actions/createNewRecipe';
import { Recipe } from '@prisma/client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateExistingRecipeAction } from '@/actions/updateExistingRecipe';

export const recipeFormSchema = z.object({
  name: z.string().min(1, { message: 'Please add a name for this recipe' }),
  url: z.string().optional()
});

export type RecipeFormProps = {
  recipe?: Recipe;
};

export default function RecipeForm({ recipe }: RecipeFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      name: recipe ? recipe.name : '',
      url: recipe ? recipe.url ?? '' : ''
    }
  });

  async function onSubmit(values: z.infer<typeof recipeFormSchema>) {
    const handleNewRecipe = () => {
      startTransition(async () => {
        await createNewRecipeAction(values);
        router.replace('/recipes');
      });
    };

    const handleUpdatedRecipe = () => {
      if (!Object.keys(form.formState.dirtyFields).length || !recipe) return;

      startTransition(async () => {
        const { success } = await updateExistingRecipeAction(recipe.id, values);

        if (success) {
          console.log('Successfully updated');
          form.reset({ name: form.getValues().name, url: form.getValues().url });
        }
      });
    };

    recipe ? handleUpdatedRecipe() : handleNewRecipe();
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
                <Input type="text" {...field} className="w-full md:w-1/2" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe URL</FormLabel>
              <FormControl>
                <Input type="url" {...field} className="w-full md:w-1/2" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-center">
          {recipe ? 'Save changes' : 'Add recipe'}
        </Button>
      </form>
    </Form>
  );
}
