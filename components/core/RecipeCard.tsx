import Image from 'next/image';
import { ExternalLink, Loader2, ThumbsDown, ThumbsUp } from 'lucide-react';
import {
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Recipe, HistoryItem } from '@/types/recipe';

export function LoadingState({ text }: { text: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
            <p className="text-stone-500 font-medium animate-pulse">{text}</p>
        </div>
    );
}

export function EmptyState({ text }: { text: string }) {
    return (
        <div className="text-center py-12 text-stone-500">
            <p>{text}</p>
        </div>
    );
}

export function RecipeImage({ recommendation, noImageText }: { recommendation: Recipe, noImageText: string }) {
    return (
        <div className="relative w-full h-64 md:h-80 bg-stone-100">
            {recommendation.strMealThumb ? (
                <Image
                    src={recommendation.strMealThumb}
                    alt={recommendation.strMeal}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            ) : (
                <div className="flex items-center justify-center w-full h-full text-stone-400">
                    {noImageText}
                </div>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-sm text-[#2c1810] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {recommendation.strCategory}
                </span>
                <span className="bg-orange-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {recommendation.strArea}
                </span>
            </div>
        </div>
    );
}

export function RecipeHeader({ recommendation, viewRecipeText }: { recommendation: Recipe, viewRecipeText: string }) {
    return (
        <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-serif text-[#2c1810]">
                {recommendation.strMeal}
            </CardTitle>
            <CardDescription className="text-stone-500 pt-2">
                <a
                    href={`https://www.themealdb.com/meal/${recommendation.idMeal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                >
                    {viewRecipeText} <ExternalLink size={16} />
                </a>
            </CardDescription>
        </CardHeader>
    );
}

export function FeedbackSection({ question, yesText, noText, onFeedback }: { question: string, yesText: string, noText: string, onFeedback: (status: 'Like' | 'Dislike') => void }) {
    return (
        <div className="bg-stone-50 rounded-xl p-6 text-center space-y-4">
            <p className="text-stone-600 font-medium">
                {question}
            </p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => onFeedback('Like')}
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-stone-200 text-stone-700 font-bold rounded-xl hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all shadow-sm"
                >
                    <ThumbsUp size={18} /> {yesText}
                </button>
                <button
                    onClick={() => onFeedback('Dislike')}
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-stone-200 text-stone-700 font-bold rounded-xl hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all shadow-sm"
                >
                    <ThumbsDown size={18} /> {noText}
                </button>
            </div>
        </div>
    );
}

export function HistoryRecipeCard({
    item,
    t
}: {
    item: HistoryItem;
    t: (key: string) => string;
}) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border-2 border-stone-100 shadow-lg flex flex-col hover:border-orange-200 transition-colors">
            <div className="relative h-48 w-full bg-stone-100">
                {item.strMealThumb ? (
                    <Image
                        src={item.strMealThumb}
                        alt={item.strMeal}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-stone-400">
                        {t('noImage')}
                    </div>
                )}
                <div className="absolute top-3 left-3 flex">
                    {item.status === 'Like' ? (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 shadow-md">
                            <ThumbsUp size={14} /> {t('liked')}
                        </div>
                    ) : (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 shadow-md">
                            <ThumbsDown size={14} /> {t('disliked')}
                        </div>
                    )}
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-[#2c1810] px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {item.strCategory}
                    </span>
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-serif text-xl font-bold text-[#2c1810] mb-1 line-clamp-2">
                        {item.strMeal}
                    </h3>
                    <p className="text-sm text-orange-600 font-medium mb-4">
                        {item.strArea}
                    </p>
                </div>

                <a
                    href={`https://www.themealdb.com/meal/${item.idMeal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-800 font-medium transition-colors text-sm"
                >
                    {t('viewRecipe')} <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
}
