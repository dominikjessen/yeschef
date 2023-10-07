export type EdamamSearchResponse = {
  from: number;
  to: number;
  count: number;
  _links: {
    self?: {
      href: string;
      title: string;
    };
    next?: {
      href: string;
      title: string;
    };
  };
  hits: [
    {
      recipe: EdamamRecipe;
      _links?: {
        self?: {
          href: string;
          title: string;
        };
        next?: {
          href: string;
          title: string;
        };
      };
    }
  ];
};

// NOTE: This will depend on included fields and can be larger
export type EdamamRecipe = {
  label: string;
  uri: string;
  source: string;
  url: string;
  ingredientLines: string[];
  mealType: Meal[];
  dishType: string[];
};

export type Meal = 'Breakfast' | 'Dinner' | 'Lunch' | 'Snack' | 'Teatime';

export type Dish =
  | 'Biscuits and cookies'
  | 'Bread'
  | 'Condiments and sauces'
  | 'Desserts'
  | 'Drinks'
  | 'Main course'
  | 'Pancake'
  | 'Preps'
  | 'Preserve'
  | 'Salad'
  | 'Sandwiches'
  | 'Side dish'
  | 'Soup'
  | 'Starter'
  | 'Sweets';
