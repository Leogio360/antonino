import '@testing-library/jest-dom'

jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
    useFormatter: () => ({ dateTime: () => '', number: () => '' }),
    useLocale: () => 'en',
}))