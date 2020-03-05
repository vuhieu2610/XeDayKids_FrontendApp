import produce from 'immer';

export const initialState = {
  sliders: [
    'https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/mung8.3_pc.jpg',
    'https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/colosbaby_desk.png',
    'https://bibomart.com.vn/media/wysiwyg/bibomart_homepage/covid-19-bye-desk_2.jpg',
    'https://salt.tikicdn.com/cache/w750/ts/banner/ac/fa/f5/46acb2b40fc7e29398bc30df52072e9c.png'
  ]
};

const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      default:
        break;
    }
  });

export default homePageReducer;
