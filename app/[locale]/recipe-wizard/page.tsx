'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/lib/store/hooks';
import { nextStep, setStep, resetSearch, updateSelection, setRecommendation, addFeedback } from '@/lib/store/features/recipeSearchSlice';
import { useGetAreasQuery, useGetCategoriesQuery, useGetRecipesByAreaQuery, useGetRecipesByCategoryQuery, useGetRecipeByIdQuery } from '@/lib/services/mealApi';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store/store';
import AreaSearch from '@/components/wizard/AreaSearch';
import CategorySearch from '@/components/wizard/CategorySearch';
import RecipeRecommendation from '@/components/wizard/RecipeRecommendation';

export default function RecipeWizardPage() {
    const t = useTranslations('pages.recipe-wizard');
    const dispatch = useAppDispatch();
    const router = useRouter();

    const currentStep = useSelector((state: RootState) => state.form.step);
    const selections = useSelector((state: RootState) => state.form.selections);
    const selectedArea = selections.area;
    const selectedCategory = selections.category;
    const recommendation = useSelector((state: RootState) => state.form.recommendation);

    const { data: areasData, isLoading: isAreasLoading } = useGetAreasQuery();
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery();

    const [randomMealId, setRandomMealId] = useState<string | null>(null);

    const { data: areaData, isFetching: isFetchingArea } = useGetRecipesByAreaQuery(selectedArea, {
        skip: !selectedArea,
    });
    const { data: categoryData, isFetching: isFetchingCategory } = useGetRecipesByCategoryQuery(selectedCategory, {
        skip: !selectedCategory,
    });
    const { data: recipeData, isFetching: isFetchingRecipe } = useGetRecipeByIdQuery(randomMealId as string, {
        skip: !randomMealId,
    });

    const getIntersectedMeals = () => {
        if (!areaData?.meals || !categoryData?.meals) return [];
        const categoryIds = new Set(categoryData.meals.map((m: any) => m.idMeal));
        return areaData.meals.filter((m: any) => categoryIds.has(m.idMeal));
    };

    const pickRandomMeal = (meals: any[]) => {
        if (!meals || meals.length === 0) return;
        const randomIndex = Math.floor(Math.random() * meals.length);
        setRandomMealId(meals[randomIndex].idMeal);
    };

    useEffect(() => {
        const intersectedMeals = getIntersectedMeals();
        if (
            intersectedMeals.length &&
            !randomMealId &&
            areaData &&
            categoryData &&
            !isFetchingArea &&
            !isFetchingCategory
        ) {
            pickRandomMeal(intersectedMeals);
        }
    }, [areaData, categoryData, randomMealId, isFetchingArea, isFetchingCategory]);

    useEffect(() => {
        if (recipeData?.meals?.[0]) {
            dispatch(setRecommendation(recipeData.meals[0] as any));
        }
    }, [recipeData, dispatch]);

    const handleNewIdea = () => {
        const intersectedMeals = getIntersectedMeals();
        if (intersectedMeals.length > 1) {
            pickRandomMeal(intersectedMeals);
        }
    };

    const handleSelectionChange = (type: 'area' | 'category', value: string) => {
        if (!value || selections[type as keyof typeof selections] === value) return;
        dispatch(updateSelection({ [type]: value }));
        dispatch(setRecommendation(null));
        setRandomMealId(null);
    };

    const isRecommendationLoading = isFetchingCategory || isFetchingArea || isFetchingRecipe || (!recommendation && !!randomMealId);

    return (
        <div className="min-h-screen bg-[#faf9f6] py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-stone-100">
                    {currentStep === 1 && (
                        <AreaSearch
                            onSelect={(area) => dispatch(updateSelection({ area }))}
                            selectedArea={selectedArea}
                            areas={areasData?.meals || []}
                            isLoading={isAreasLoading}
                        />
                    )}
                    {currentStep === 2 && (
                        <CategorySearch
                            onSelect={(category) => dispatch(updateSelection({ category }))}
                            selectedCategory={selectedCategory}
                            categories={categoriesData?.meals || []}
                            isLoading={isCategoriesLoading}
                        />
                    )}
                    {currentStep === 3 && (
                        <RecipeRecommendation
                            selections={selections}
                            recommendation={recommendation}
                            allAreas={areasData?.meals || []}
                            allCategories={categoriesData?.meals || []}
                            isLoading={isRecommendationLoading}
                            onSelectionChange={handleSelectionChange}
                            onFeedback={(status) => dispatch(addFeedback(status))}
                            onNewIdea={handleNewIdea}
                        />
                    )}
                </div>

                {currentStep === 1 || currentStep === 2 ? (
                    <div className="flex gap-4 w-full mt-8">
                        <button
                            className="flex-1 py-4 bg-stone-200 text-[#2c1810] rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:bg-stone-300"
                            onClick={() => {
                                if (currentStep === 1) {
                                    router.push('/');
                                } else {
                                    dispatch(setStep(currentStep - 1));
                                }
                            }}
                        >
                            {t('back-button')}
                        </button>
                        <button
                            className="flex-1 py-4 bg-[#2c1810] text-white rounded-full font-bold flex items-center justify-center gap-2 disabled:opacity-30 transition-all hover:bg-black"
                            onClick={() => dispatch(nextStep())}
                        >
                            {t('next-button')} <ChevronRight size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-4 w-full mt-8">
                        <button
                            className="flex-1 py-4 bg-stone-200 text-[#2c1810] rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:bg-stone-300"
                            onClick={() => dispatch(resetSearch())}
                        >
                            {t('restart-button')}
                        </button>
                        <button
                            className="flex-1 py-4 bg-[#2c1810] text-white rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:bg-black"
                            onClick={() => router.push('/history')}
                        >
                            {t('history-button')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
