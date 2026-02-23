'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { updateSelection } from '@/lib/store/features/recipeSearchSlice';
import { useGetAreasQuery } from '@/lib/services/mealApi';
import { Search, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AreaSearch() {
    const t = useTranslations('components.AreaSearch');

    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useAppDispatch();
    const selectedArea = useAppSelector((state) => state.form.selections.area);

    const { data, isLoading } = useGetAreasQuery();

    const filteredAreas =
        data?.meals?.filter((m) => m.strArea.toLowerCase().includes(searchTerm.toLowerCase())) ||
        [];

    return (
        <div className="space-y-6">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-serif font-bold text-[#2c1810]">{t('title')}</h2>
                <p className="text-stone-500">{t('description')}</p>
            </header>

            <div className="relative">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    size={20}
                />
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-orange-600 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {isLoading ? (
                    <div className="col-span-full py-10 text-center text-stone-400">
                        {t('loading')}
                    </div>
                ) : (
                    filteredAreas.map((item) => (
                        <button
                            key={item.strArea}
                            onClick={() => dispatch(updateSelection({ area: item.strArea }))}
                            className={`p-4 rounded-xl text-sm font-medium transition-all border-2 ${selectedArea === item.strArea
                                ? 'border-orange-600 bg-orange-50 text-orange-800'
                                : 'border-transparent bg-stone-50 text-stone-600 hover:bg-stone-100'
                                }`}
                        >
                            {item.strArea}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
