import Mealplan from './mealplan';

export default async function MealplanPage() {
  return (
    <div className="flex flex-col gap-2">
      <h2>Plan your meals</h2>
      <Mealplan />
    </div>
  );
}
