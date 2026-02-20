Build a client-side web application (Elm or React) that recommends a recipe based on a two-step form. 
The user must be able to move forward/backward without losing data, receive a recommended recipe, and indicate whether they like it.
Preferences (Like / Dislike) must be saved in localStorage and displayed in a History section. 
At least one element must be a dynamic search that reacts while the user types or changes a field.

Suggested API
TheMealDB — https://www.themealdb.com/api.php (free no registration needed).
Requisiti funzionali (MVP)

1. Two-Step Form: 
Step 1 for basic preferences (e.g., cuisine/area: Italian, Mexican, Japanese). 
Step 2 for a secondary constraint (e.g., main ingredient or category: Beef, Seafood, Vegetarian). Forward/backward navigation with preserved state.

2. Recommendation: Query TheMealDB and select ONE corresponding recipe. Display a Recommendation Card
with title, image, category, area, and a link to the recipe. Add a "New Idea" button to suggest another recipe using
the same criteria.

3. Feedback + Persistence: Ask "Did it match your preference?" with Yes/No buttons. Save each choice in
localStorage with the recipe ID, title, image, timestamp, and the inputs used. Create a History list of previous
recommendations with a Like / Dislike badge.

4. Dynamic Search (Mandatory): At least one field that updates results in real-time without a full form submission.
Examples: ingredient autocomplete (using /list.php?i=list and client-side filtering), live preview of the first 5
recipes from /search.php?s={term}, dependent dropdown (change the list of categories/ingredients when
changing the area).

5. Resilience & UX: Handle loading states, no results, errors, and image placeholders. Maintain values when going
back. Ensure minimum accessibility (labels, focus, keyboard navigation).
Estensioni (per pairing)
● Multiple strategies: random vs. simple scoring (e.g., number of ingredients, popularity).
● Shareable state via URL (query string).
● Offline mock mode to avoid rate limits.
● Testing: one unit test for the selection logic; one component test for the dynamic search.
● Filtering in the History (Liked / Disliked / All) and sorting by date.
Acceptance criteria(checklist)
● Two steps with forward/backward navigation, state preserved.
● Recommendation comes from the API (not hard-coded).
● "Do you like it?" saved in localStorage with ID, title, and timestamp; History is visible.
● At least one dynamic search control that reacts while typing/changing a field.
● Loading/empty/error/placeholder handled correctly.
● README with instructions and design decisions.