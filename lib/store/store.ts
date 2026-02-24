import { configureStore, Middleware } from '@reduxjs/toolkit';
import { mealApi } from '@/lib/services/mealApi';
import recipeSearchSlice from '@/lib/store/features/recipeSearchSlice';

const localStorageMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
    const result = next(action);
    if (action.type === 'recipeSearch/addFeedback' || action.type === 'recipeSearch/loadHistory') {
        const state = storeAPI.getState() as any;
        if (typeof window !== 'undefined' && state.form) {
            localStorage.setItem('recipeHistory', JSON.stringify(state.form.history));
        }
    }
    return result;
};

export const makeStore = () => {
    return configureStore({
        reducer: {
            [mealApi.reducerPath]: mealApi.reducer,
            form: recipeSearchSlice,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(mealApi.middleware, localStorageMiddleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
