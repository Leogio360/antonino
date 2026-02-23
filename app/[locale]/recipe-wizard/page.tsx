'use client';

import { useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/lib/store/hooks';
import { nextStep } from '@/lib/store/features/recipeSearchSlice';
import { RootState } from '@/lib/store/store';
import AreaSearch from '@/components/wizard/AreaSearch';
import { Progress } from '@/components/ui/progress';
import CategorySearch from '@/components/wizard/CategorySearch';

export default function RecipeWizardPage() {
    const t = useTranslations('components.AreaSearch');
    const dispatch = useAppDispatch();

    const currentStep = useSelector((state: RootState) => state.form.step);

    return (
        <div className="min-h-screen bg-[#faf9f6] py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Progress value={currentStep} />

                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-stone-100">
                    {currentStep === 1 && <AreaSearch />}
                    {currentStep === 2 && <CategorySearch />}
                </div>

                <button
                    className="w-full mt-8 py-4 bg-[#2c1810] text-white rounded-full font-bold flex items-center justify-center gap-2 disabled:opacity-30 transition-all hover:bg-black"
                    onClick={() => dispatch(nextStep())}
                >
                    {t('button')} <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
