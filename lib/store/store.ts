import { configureStore, Middleware } from '@reduxjs/toolkit';
import { mealApi } from '@/lib/services/mealApi';
import recipeSearchSlice from '@/lib/store/features/recipeSearchSlice';
import { setUrlParam } from '@/lib/helpers/url';

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

const urlSyncMiddleware: Middleware = (storeAPI) => (next) => (action: any) => {
    const result = next(action);

    const syncActions = ['recipeSearch/updateSelection', 'recipeSearch/resetSearch', 'recipeSearch/setRecommendation'];

    if (syncActions.includes(action.type)) {
        if (typeof window !== 'undefined') {
            const state = storeAPI.getState() as any;
            const selections = state.form.selections;
            const recommendation = state.form.recommendation;

            const url = new URL(window.location.href);
            let hasChanges = false;

            hasChanges = setUrlParam(url, 'area', selections.area) || hasChanges;
            hasChanges = setUrlParam(url, 'category', selections.category) || hasChanges;
            hasChanges = setUrlParam(url, 'recipe', recommendation?.idMeal || '') || hasChanges;

            if (hasChanges) {
                window.history.pushState({}, '', url.toString());
            }
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
            getDefaultMiddleware().concat(mealApi.middleware, localStorageMiddleware, urlSyncMiddleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
