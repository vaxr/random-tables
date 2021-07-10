import {Hello} from './index';

describe('Hello', () => {
    it('works', () => {
        expect(Hello('World')).toBe('Hello World');
    });
})
