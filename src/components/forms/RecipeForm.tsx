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
import { useToast } from '@/hooks/useToast';

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
  const { toast } = useToast();

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
        const { success, error } = await createNewRecipeAction(values);
        if (error) {
          toast({
            variant: 'destructive',
            description: `Something went wrong, please try again.`
          });
          return;
        }

        if (success) {
          router.replace('/recipes');
          toast({
            variant: 'success',
            description: `Successfully created your recipe.`
          });
        }
      });
    };

    const handleUpdatedRecipe = () => {
      if (!Object.keys(form.formState.dirtyFields).length || !recipe) return;

      startTransition(async () => {
        const { success, error } = await updateExistingRecipeAction(recipe.id, values);

        if (error) {
          toast({
            variant: 'destructive',
            description: `Something went wrong, please try again.`
          });
          return;
        }

        if (success) {
          form.reset({ name: form.getValues().name, url: form.getValues().url });
          toast({
            variant: 'success',
            description: `Successfully updated recipe information.`
          });
        }
      });
    };

    // This is what gets called onSubmit depending on 'type' of form
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
        <Button type="submit" className="self-center" disabled={isPending}>
          {recipe ? 'Save changes' : 'Add recipe'}
        </Button>
      </form>
    </Form>
  );
}
