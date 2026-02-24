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
