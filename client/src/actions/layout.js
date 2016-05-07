import { TOGGLE_LEFT_NAV } from '../constants/layout';

export const toggleLeftNav = (open) => ({
    type: TOGGLE_LEFT_NAV,
    open
});
