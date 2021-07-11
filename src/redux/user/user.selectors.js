
import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    selectUser,
    (user, cart) => user.currentUser
);

/*const selectCart = state => state.cart;

export const selectCurrentUser = createSelector(
    selectUser,
    selectCart,
    (user, cart) => user.currentUser
)*/

