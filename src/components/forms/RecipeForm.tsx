'use client';

import { useState } from 'react';

export default function RecipeForm() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>This is the recipe form</h2>
      <div className="w-1/2 grid grid-cols-3 gap-2 items-center place-items-center p-4 border-primary">
        <button onClick={() => setCount((prev) => prev - 1)} className="w-10 h-10 p-2 border bg-primary">
          -
        </button>
        <p className="w-fit">Count is: {count}</p>
        <button onClick={() => setCount((prev) => prev + 1)} className="w-10 h-10 p-2 border bg-primary">
          +
        </button>
      </div>
    </div>
  );
}
