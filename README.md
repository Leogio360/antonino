# Antonino Recipe Recommender

Antonino is a modern, interactive web application built with Next.js that helps users discover new recipes based on their preferences.
The app is affectionately named after the renowned Italian chef **Antonino Cannavacciuolo**, as eagle-eyed fans might have caught from the subtle quote on the welcome page! 🤌


## 🚀 Quick Start

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
- **State Management:** Redux Toolkit & RTK Query
- **Internationalization:** `next-intl` (English & Italian support)
- **Icons:** Lucide React

## ✨ Key Features

- **Recipe Wizard:** A structured, multi-step onboarding flow for users to select their preferred Area and Category.
- **Smart Intersections:** Fetches recipes for both the selected Area and Category, intersecting the results on the client-side to find a matching meal.
- **Inline Editing:** Uses Shadcn Comboboxes to allow users to quickly change their filters and regenerate a recommendation without losing context.
- **Feedback & History:** Users can "Like" or "Dislike" a recommendation. This feedback is saved and accessible on a dedicated History page.
- **Persistent State:** Utilizing a custom Redux middleware, the user's recipe history is seamlessly synced with the browser's `localStorage` to persist across sessions.
- **Internationalization:** Full support for English and Italian locales, handled via Next.js middleware and `next-intl`.

## 🏗️ Design Decisions & Architecture

1. **ATOMIC DESIGN**
   - To keep components clean and maintainable, complex UI logic was extracted into dedicated core presentational components (e.g., `RecipeImage`, `RecipeHeader`, `HistoryRecipeCard` in `components/core/RecipeCard.tsx`).
   - `RecipeRecommendation.tsx` acts as the "smart" component, handling Redux connections, RTK queries, and business logic.

2. **State Management & Caching with RTK Query**
   - Redux Toolkit is used to manage the wizard's step state and user selections.
   - RTK Query was chosen to handle API interactions with TheMealDB. It provides out-of-the-box caching, de-duplication of requests, and easy tracking of loading states.

3. **Client-Side Intersection**
   - Since TheMealDB API does not provide a single endpoint to filter by *both* Area and Category simultaneously, the app fetches both lists independently using RTK Query and performs an intersection on the frontend to find matching `idMeal` values.

4. **LocalStorage Persistence via Redux Middleware**
   - Persistence is handled at the Redux store level using a custom middleware (`localStorageMiddleware`). This guarantees that every `addFeedback` action reliably saves the latest history array to the disk.
