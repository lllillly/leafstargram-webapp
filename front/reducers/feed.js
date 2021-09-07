import produce from "immer";

export const initailState = {
  mainFeeds: [],
  previewImage: null,

  //
  st_feedImageUploadLoading: false,
  st_feedImageUploadDone: false,
  st_feedImageUploadError: null,
};

export const FEED_IMAGE_UPLOAD_REQUEST = "FEED_IMAGE_UPLOAD_REQUEST";
export const FEED_IMAGE_UPLOAD_SUCCESS = "FEED_IMAGE_UPLOAD_SUCCESS";
export const FEED_IMAGE_UPLOAD_FAILURE = "FEED_IMAGE_UPLOAD_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FEED_IMAGE_UPLOAD_REQUEST: {
        draft.st_feedImageUploadLoading = true;
        draft.st_feedImageUploadDone = false;
        draft.st_feedImageUploadError = null;
        break;
      }
      case FEED_IMAGE_UPLOAD_SUCCESS: {
        draft.st_feedImageUploadLoading = false;
        draft.st_feedImageUploadDone = true;
        draft.st_feedImageUploadError = null;
        draft.previewImage = action.data.path;
        break;
      }
      case FEED_IMAGE_UPLOAD_FAILURE: {
        draft.st_feedImageUploadLoading = false;
        draft.st_feedImageUploadDone = false;
        draft.st_feedImageUploadError = action.data;
        break;
      }

      default:
        break;
    }
  });
export default reducer;
