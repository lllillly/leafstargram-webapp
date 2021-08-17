import { produce } from "immer";
//불변성을 찾아주는 패키지

export const initialState = {
  mainFeeds: [],
};

const feed = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      default:
        break;
    }
  });

export default feed;
