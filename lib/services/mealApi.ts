import { Meal } from '@/types/meal';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_MEAL_DB_API_URL;

if (!baseUrl) {
    throw new Error('Missing NEXT_PUBLIC_MEAL_DB_API_URL in environment variables.');
}

export const mealApi = createApi({
    reducerPath: 'mealApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/` }),
    tagTypes: ['Meal'],
    endpoints: (builder) => ({
        getAreas: builder.query<{ meals: { strArea: string }[] }, void>({
            query: () => 'list.php?a=list',
        }),

        getCategories: builder.query<{ meals: { strCategory: string }[] }, void>({
            query: () => 'list.php?c=list',
        }),

        getRecipesByArea: builder.query<{ meals: Meal[] }, string>({
            query: (area) => `filter.php?a=${area}`,
            transformResponse: (response: { meals: Meal[] | null }) => ({
                meals: response.meals ?? [],
            }),
        }),

        getRecipesByCategory: builder.query<{ meals: Meal[] }, string>({
            query: (category) => `filter.php?c=${category}`,
            transformResponse: (response: { meals: Meal[] | null }) => ({
                meals: response.meals ?? [],
            }),
        }),

        getRecipeById: builder.query<{ meals: Meal[] }, string>({
            query: (id) => `lookup.php?i=${id}`,
        }),
    }),
});

export const {
    useGetAreasQuery,
    useGetCategoriesQuery,
    useGetRecipesByAreaQuery,
    useGetRecipesByCategoryQuery,
    useGetRecipeByIdQuery,
} = mealApi;
