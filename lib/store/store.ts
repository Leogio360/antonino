import { configureStore } from '@reduxjs/toolkit';
import { mealApi } from '@/lib/services/mealApi';
import recipeSearchSlice from '@/lib/store/features/recipeSearchSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            [mealApi.reducerPath]: mealApi.reducer,
            form: recipeSearchSlice,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mealApi.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
