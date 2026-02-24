'use client';

import { useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/lib/store/hooks';
import { nextStep, setStep, resetSearch } from '@/lib/store/features/recipeSearchSlice';
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

    return (
        <div className="min-h-screen bg-[#faf9f6] py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-stone-100">
                    {currentStep === 1 && <AreaSearch />}
                    {currentStep === 2 && <CategorySearch />}
                    {currentStep === 3 && <RecipeRecommendation />}
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
