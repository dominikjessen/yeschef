import Mealplan from './mealplan';

export default async function MealplanPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Mealplan page</h1>
      <Mealplan />
    </div>
  );
}
