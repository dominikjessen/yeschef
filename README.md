<p align="center">
  <a href="https://yeschef.recipes">
  <img src="/public/YesChef_Logo.svg" alt="Yes, Chef! logo" />
  </a>
  <h3 align="center">Meal planning shouldn't take more than 5 minutes a week. Yes, Chef! will help you create a great menu for the week ahead using all your favorite recipes or inspiring ones from across the web (powered by Edamam's Recipe Search API).</h3>
  <div align="center">
    <h3>Built with</h3>
    <div style="display: grid; grid-template-columns: repeat(5, minmax(0, 64px)); gap: 1rem;">
      <img width="64px" height="64px" src="/public/company-logos/typescript-color.svg" alt="Typescript" />
      <img width="64px" height="64px" src="/public/company-logos/nextdotjs-color.svg" alt="Next.js" />
      <img width="64px" height="64px" src="/public/company-logos/radixui-color.svg" alt="Radix UI" />
      <img width="64px" height="64px" src="/public/company-logos/reacthookform-color.svg" alt="React Hook Form" />
      <img width="64px" height="64px" src="/public/company-logos/zod-color.svg" alt="Zod" />
      <!-- <img width="64px" height="64px" src="/public/company-logos/jest-color.svg" alt="Jest" /> -->
      <!-- <img width="64px" height="64px" src="/public/company-logos/testinglibrary-color.svg" alt="React Testing Library" /> -->
      <img width="64px" height="64px" src="/public/company-logos/html5-color.svg" alt="HTML5" />
      <img width="64px" height="64px" src="/public/company-logos/css3-color.svg" alt="CSS3" />
      <img width="64px" height="64px" src="/public/company-logos/tailwindcss-color.svg" alt="Tailwind" />
      <img width="64px" height="64px" src="/public/company-logos/mysql-color.svg" alt="MySQL" />
      <img width="64px" height="64px" src="/public/company-logos/prisma-color.svg" alt="Prisma" />
    </div>

  </div>
</p>

## About Yes, Chef!

Yes, Chef! is an app to quickly figure out your meal plan for the week from all your favorites (or forgotten favorites). Simply add your recipes to your own little recipe book, start the random generator and you'll have a varied meal plan in no time. Don't have a treasure trove of great recipes yet? No problem, the tool uses Edamam's Recipe API to help you explore different cuisines and find new favorites.

<a href='https://yeschef.recipes'>Check out Yes, Chef! here</a>

## About the codebase & future work

Yes, Chef! is a small project built to scratch my own itch. I love cooking but am notoriously bad at choosing what to eat for the week taking up too much of my mental space. I wanted to combine this with building a Next.js app that would largely depend on Server Components and the experimental Server Actions. In my opinion they provide a rather simple way of performing logic on the server without having to build and call API routes.

On the backend, I'm using Prisma with a MySQL database as well as NextAuth (Auth.js) for authentication which works well enough despite some supposed issues with the App Router. On the frontend, I wanted to implement drag & drop and used DnDKit as a great library to make dnd simple to implement. I also chose Zustand as a simple state management library over something like Redux (or just using hooks or Context) because it made managing and manipulating state from both the main mealplan component and the individual mealplan cards incredibly simple. I chose to use it for a separate client-side cache for the Edamam Recipe API as well to minimize API calls as much as possible.

### Product Images

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
  <img src="/public/01_YesChef_MealplanPage.png" alt="Mealplan page" />
  <img src="/public/02_YesChef_RecipesPage.png" alt="Recipes page" />
</div>
