import Link from 'next/link';
import { Utensils } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WelcomePage() {
    const t = useTranslations('pages.welcome');

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#faf9f6] overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

            <main className="relative z-10 text-center px-6 max-w-4xl">
                <div className="flex justify-center mb-8">
                    <div className="p-4 rounded-full border-2 border-orange-800 animate-bounce">
                        <Utensils size={48} className="text-orange-800" />
                    </div>
                </div>

                <h1 className="text-6xl md:text-8xl font-serif font-black text-[#2c1810] leading-tight mb-6">
                    {t('title')} <br />
                    <span className="text-orange-600">{t('subtitle')}</span>
                </h1>

                <p className="text-xl md:text-2xl text-stone-600 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                    {t('description')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/recipe-wizard"
                        className="group relative px-12 py-5 bg-[#2c1810] text-white font-bold text-xl rounded-full transition-all hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        {t('cta')}
                    </Link>
                </div>
            </main>
        </div>
    );
}
