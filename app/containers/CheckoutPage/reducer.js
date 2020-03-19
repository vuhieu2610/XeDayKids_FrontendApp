import produce from 'immer';

export const initialState = {};

const checkoutPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      default:
        break;
    }
  });

export default checkoutPageReducer;
