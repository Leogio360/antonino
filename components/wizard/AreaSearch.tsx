'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SearchBox from '@/components/core/SearchBox';

interface AreaSearchProps {
    onSelect: (area: string) => void;
    selectedArea: string;
    areas: Array<{ strArea: string }>;
    isLoading: boolean;
}

export default function AreaSearch({ onSelect, selectedArea, areas, isLoading }: AreaSearchProps) {
    const t = useTranslations('components.AreaSearch');

    const [searchTerm, setSearchTerm] = useState('');

    const filteredAreas =
        areas?.filter((m) => m.strArea.toLowerCase().includes(searchTerm.toLowerCase()) || m.strArea.toLowerCase() === selectedArea.toLowerCase()) ||
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
                    filteredAreas.map((item) => (
                        <button
                            key={item.strArea}
                            onClick={() => onSelect(item.strArea)}
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
