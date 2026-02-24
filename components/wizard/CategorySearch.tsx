'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SearchBox from '@/components/core/SearchBox';

interface CategorySearchProps {
    onSelect: (category: string) => void;
    selectedCategory: string;
    categories: Array<{ strCategory: string }>;
    isLoading: boolean;
}

export default function CategorySearch({ onSelect, selectedCategory, categories, isLoading }: CategorySearchProps) {
    const t = useTranslations('components.CategorySearch');

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategories =
        categories?.filter((m) => m.strCategory.toLowerCase().includes(searchTerm.toLowerCase()) || m.strCategory.toLowerCase() === selectedCategory.toLowerCase()) ||
        [];

    return (
        <div className="space-y-6">
            <header className="text-center mb-10">
                <h2 className="text-3xl font-serif font-bold text-[#2c1810]">{t('title')}</h2>
                <p className="text-stone-500">{t('description')}</p>
            </header>

            <SearchBox
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={t('searchPlaceholder')}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {isLoading ? (
                    <div className="col-span-full py-10 text-center text-stone-400">
                        {t('loading')}
                    </div>
                ) : (
                    filteredCategories.map((item) => (
                        <button
                            key={item.strCategory}
                            onClick={() => onSelect(item.strCategory)}
                            className={`p-4 rounded-xl text-sm font-medium transition-all border-2 ${selectedCategory === item.strCategory
                                ? 'border-orange-600 bg-orange-50 text-orange-800'
                                : 'border-transparent bg-stone-50 text-stone-600 hover:bg-stone-100'
                                }`}
                        >
                            {item.strCategory}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
