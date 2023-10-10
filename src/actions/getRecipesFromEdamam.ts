'use server';

import { Dish, EdamamRecipe, EdamamSearchResponse, Meal } from '@/types/edamam';
import { revalidatePath } from 'next/cache';

export type GetEdamamRecipesActionResponse = {
  success: boolean;
  data: EdamamRecipe[] | null;
  error: Error | null;
};

export type GetEdamamRecipesActionOptions = {
  mealType?: Meal[];
  dishType?: Dish[];
};

const EDAMAM_RECIPE_API_BASEURL = 'https://api.edamam.com/api/recipes/v2';

function getParamsForEdamam(requestOptions: GetEdamamRecipesActionOptions): URLSearchParams {
  const params = new URLSearchParams();

  // API Auth - Edamam does this via searchparams
  params.append('app_id', process.env.EDAMAM_APP_ID ?? '');
  params.append('app_key', process.env.EDAMAM_APP_KEY ?? '');

  // Fixed options
  params.append('type', 'public');
  params.append('random', 'true');

  // Selected fields options
  params.append('field', 'label');
  params.append('field', 'uri'); // Edamam uri - getting this just in case?
  params.append('field', 'source'); // ~Recipe author
  params.append('field', 'url'); // Recipe url
  params.append('field', 'ingredientLines');
  params.append('field', 'mealType');
  params.append('field', 'dishType');

  // User configurable options
  requestOptions.mealType?.forEach((mealType) => {
    params.append('mealType', mealType);
  });

  requestOptions.dishType?.forEach((dishType) => {
    params.append('dishType', dishType);
  });

  return params;
}

export async function getRecipesFromEdamamAction(
  requestOptions: GetEdamamRecipesActionOptions = {
    mealType: ['Dinner'],
    dishType: ['Main course', 'Salad', 'Sandwiches', 'Soup', 'Side dish']
  }
): Promise<GetEdamamRecipesActionResponse> {
  try {
    const params = getParamsForEdamam(requestOptions);

    const res = await fetch(`${EDAMAM_RECIPE_API_BASEURL}?${params.toString()}`, { cache: 'no-store' });

    // Get data into shape for return
    const { hits } = (await res.json()) as EdamamSearchResponse;
    const recipes = hits.map((hit) => hit.recipe);

    revalidatePath('/mealplan');

    return { success: true, data: recipes as EdamamRecipe[], error: null };
  } catch (error) {
    return { success: false, data: null, error: error as Error };
  }
}
