'use client';

import { useAppSelector } from '@/lib/store/hooks';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HistoryRecipeCard } from '@/components/core/RecipeCard';

export default function HistoryPage() {
    const t = useTranslations('pages.history');
    const history = useAppSelector((state) => state.form.history);

    return (
        <div className="min-h-screen bg-[#faf9f6] py-12 px-4 relative">
            <div className="max-w-4xl mx-auto space-y-8">

                <header className="flex flex-col items-center text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2c1810]">
                        {t('title')}
                    </h1>
                    <p className="text-stone-500 mt-3 text-lg">{t('subtitle')}</p>

                    <Link
                        href="/recipe-wizard"
                        className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-stone-200 text-stone-700 font-bold rounded-full hover:bg-stone-50 transition-all shadow-sm"
                    >
                        <ArrowLeft size={18} /> {t('backToWizard')}
                    </Link>
                </header>

                {history.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border-2 border-stone-100 shadow-xl">
                        <p className="text-stone-400 text-lg">{t('empty')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {history.map((item, idx) => (
                            <HistoryRecipeCard
                                key={`${item.idMeal}-${item.timestamp}-${idx}`}
                                item={item}
                                t={t}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
