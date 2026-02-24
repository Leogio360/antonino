'use client';

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

interface RecipeRecommendationProps {
    selections: { area: string; category: string };
    recommendation: any;
    allAreas: any[];
    allCategories: any[];
    isLoading: boolean;
    onSelectionChange: (type: 'area' | 'category', value: string) => void;
    onFeedback: (status: 'Like' | 'Dislike') => void;
    onNewIdea: () => void;
}

export default function RecipeRecommendation({
    selections,
    recommendation,
    allAreas,
    allCategories,
    isLoading,
    onSelectionChange,
    onFeedback,
    onNewIdea
}: RecipeRecommendationProps) {
    const t = useTranslations('components.RecipeRecommendation');

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
                        onFeedback={onFeedback}
                    />
                </CardContent>

                <CardFooter className="bg-stone-50 border-t border-stone-100 p-4">
                    <button
                        onClick={onNewIdea}
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
                            items={allAreas?.map((a: any) => ({ value: a.strArea, label: a.strArea })) || []}
                            value={selections.area}
                            onValueChange={(val) => val && onSelectionChange('area', val)}
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
                            items={allCategories?.map((c: any) => ({ value: c.strCategory, label: c.strCategory })) || []}
                            value={selections.category}
                            onValueChange={(val) => val && onSelectionChange('category', val)}
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
