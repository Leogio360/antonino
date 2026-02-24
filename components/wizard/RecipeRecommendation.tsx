'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addFeedback, setRecommendation, updateSelection } from '@/lib/store/features/recipeSearchSlice';
import { useGetRecipesByAreaQuery, useGetRecipeByIdQuery, useGetRecipesByCategoryQuery, useGetAreasQuery, useGetCategoriesQuery } from '@/lib/services/mealApi';
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
} from '@/components/ui/combobox';
import { useTranslations } from 'next-intl';
import { RefreshCw, Loader2 } from 'lucide-react';
import {
    Card,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import {
    LoadingState,
    EmptyState,
    RecipeImage,
    RecipeHeader,
    FeedbackSection
} from '@/components/core/RecipeCard';

export default function RecipeRecommendation() {
    const t = useTranslations('components.RecipeRecommendation');
    const dispatch = useAppDispatch();

    const selections = useAppSelector((state) => state.form.selections);
    const recommendation = useAppSelector((state) => state.form.recommendation);

    const { data: areaData, isFetching: isFetchingArea } = useGetRecipesByAreaQuery(selections.area, {
        skip: !selections.area,
    });
    const { data: categoryData, isFetching: isFetchingCategory } = useGetRecipesByCategoryQuery(selections.category, {
        skip: !selections.category,
    });
    const { data: allAreas } = useGetAreasQuery();
    const { data: allCategories } = useGetCategoriesQuery();

    const [randomMealId, setRandomMealId] = useState<string | null>(null);
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

    const handleSelectionChange = (type: 'area' | 'category', value: string | null) => {
        if (!value || selections[type] === value) return;
        dispatch(updateSelection({ [type]: value }));
        dispatch(setRecommendation(null));
        setRandomMealId(null);
    };

    const handleFeedback = (status: 'Like' | 'Dislike') => {
        dispatch(addFeedback(status));
    };

    const isLoading = isFetchingCategory || isFetchingArea || isFetchingRecipe || (!recommendation && !!randomMealId);

    const renderContent = () => {
        if (isLoading) return <LoadingState text={t('loading')} />;
        if (!recommendation) {
            return <EmptyState text={t('noRecommendation')} />;
        }

        return (
            <Card className="overflow-hidden border-2 border-stone-100 shadow-xl rounded-2xl bg-white">
                <RecipeImage recommendation={recommendation} noImageText={t('noImage')} />
                <RecipeHeader recommendation={recommendation} viewRecipeText={t('viewRecipe')} />

                <CardContent className="pt-6 pb-8">
                    <FeedbackSection
                        question={t('feedbackQuestion')}
                        yesText={t('yes')}
                        noText={t('no')}
                        onFeedback={handleFeedback}
                    />
                </CardContent>

                <CardFooter className="bg-stone-50 border-t border-stone-100 p-4">
                    <button
                        onClick={handleNewIdea}
                        className="flex-1 py-4 bg-stone-200 text-[#2c1810] rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:bg-stone-300"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin text-stone-500" /> : <RefreshCw size={18} className="text-stone-500" />}
                        {t('newIdea')}
                    </button>
                </CardFooter>
            </Card>
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="text-center mb-4">
                <h2 className="text-3xl font-serif font-bold text-[#2c1810]">
                    {t('title')}
                </h2>
                <p className="text-stone-500 mt-2">
                    {t('description')}
                </p>
            </header>

            <Card className="overflow-hidden border-2 border-stone-100 shadow-sm rounded-2xl bg-white mb-6">
                <CardContent className="pt-6 pb-6 px-6 space-y-4 md:space-y-0 md:flex md:gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="text-sm font-medium text-stone-600">{t('area')}</label>
                        <Combobox
                            items={allAreas?.meals?.map((a: any) => ({ value: a.strArea, label: a.strArea })) || []}
                            value={selections.area}
                            onValueChange={(val) => handleSelectionChange('area', val)}
                        >
                            <ComboboxInput placeholder={t('selectArea')} className="w-full" />
                            <ComboboxContent>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item.value} value={item.value}>
                                            {item.label}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <label className="text-sm font-medium text-stone-600">{t('category')}</label>
                        <Combobox
                            items={allCategories?.meals?.map((c: any) => ({ value: c.strCategory, label: c.strCategory })) || []}
                            value={selections.category}
                            onValueChange={(val) => handleSelectionChange('category', val)}
                        >
                            <ComboboxInput placeholder={t('selectCategory')} className="w-full" />
                            <ComboboxContent>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item.value} value={item.value}>
                                            {item.label}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>
                </CardContent>
            </Card>

            {renderContent()}
        </div>
    );
}
