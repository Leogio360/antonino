import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
}

export interface HistoryItem extends Recipe {
    status: 'Like' | 'Dislike';
    timestamp: number;
}

export interface SearchState {
    step: number;
    selections: {
        area: string;
        category: string;
        ingredient: string;
    };
    recommendation: Recipe | null;
    history: HistoryItem[];
    loading: boolean;
}

const initialState: SearchState = {
    step: 1,
    selections: { area: '', category: '', ingredient: '' },
    recommendation: null,
    history: [],
    loading: false,
};

const recipeSearchSlice = createSlice({
    name: 'recipeSearch',
    initialState,
    reducers: {
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        nextStep: (state) => {
            state.step += 1;
        },
        updateSelection: (state, action: PayloadAction<Partial<SearchState['selections']>>) => {
            state.selections = { ...state.selections, ...action.payload };
        },
        setRecommendation: (state, action: PayloadAction<Recipe | null>) => {
            state.recommendation = action.payload;
        },
        addFeedback: (state, action: PayloadAction<'Like' | 'Dislike'>) => {
            if (state.recommendation) {
                const newItem: HistoryItem = {
                    ...state.recommendation,
                    status: action.payload,
                    timestamp: Date.now(),
                };
                state.history.unshift(newItem);
            }
        },
        loadHistory: (state, action: PayloadAction<HistoryItem[]>) => {
            state.history = action.payload;
        },
        resetSearch: (state) => {
            state.step = 1;
            state.selections = initialState.selections;
            state.recommendation = null;
        },
    },
});

export const {
    setStep,
    nextStep,
    updateSelection,
    setRecommendation,
    addFeedback,
    loadHistory,
    resetSearch,
} = recipeSearchSlice.actions;
export default recipeSearchSlice.reducer;
