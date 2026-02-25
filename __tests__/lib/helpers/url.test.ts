import { setUrlParam } from '../../../lib/helpers/url';

describe('setUrlParam', () => {
    it('sets a new param when none exists', () => {
        const url = new URL('http://localhost');
        const hasChanges = setUrlParam(url, 'testParams', 'testValue');
        expect(hasChanges).toBe(true);
        expect(url.searchParams.get('testParams')).toBe('testValue');
    });

    it('updates an existing param with a new value', () => {
        const url = new URL('http://localhost?test=old');
        const hasChanges = setUrlParam(url, 'test', 'new');
        expect(hasChanges).toBe(true);
        expect(url.searchParams.get('test')).toBe('new');
    });

    it('removes the param if the new value is empty', () => {
        const url = new URL('http://localhost?test=old');
        const hasChanges = setUrlParam(url, 'test', '');
        expect(hasChanges).toBe(true);
        expect(url.searchParams.has('test')).toBe(false);
    });

    it('returns false and does not change URL if the value is the same', () => {
        const url = new URL('http://localhost?test=same');
        const hasChanges = setUrlParam(url, 'test', 'same');
        expect(hasChanges).toBe(false);
        expect(url.searchParams.get('test')).toBe('same');
    });

    it('returns false and does not change URL if the param is not present and the new value is empty', () => {
        const url = new URL('http://localhost');
        const hasChanges = setUrlParam(url, 'test', '');
        expect(hasChanges).toBe(false);
        expect(url.searchParams.has('test')).toBe(false);
    });
});
