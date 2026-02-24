'use client';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { loadHistory } from './features/recipeSearchSlice';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>(undefined);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && storeRef.current) {
            const savedHistory = localStorage.getItem('recipeHistory');
            if (savedHistory) {
                try {
                    storeRef.current.dispatch(loadHistory(JSON.parse(savedHistory)));
                } catch (e) {
                    console.error('Failed to parse history', e);
                }
            }
        }
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}
