import { Search } from 'lucide-react';

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export default function SearchBox({ value, onChange, placeholder }: SearchBoxProps) {
    return (
        <div className="relative">
            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                size={20}
            />
            <input
                type="text"
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-orange-600 outline-none transition-all"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
