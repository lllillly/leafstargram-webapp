import produce from "immer";

export const initailState = {
  mainFeeds: [],
  previewImage: null,

  //
  st_feedImageUploadLoading: false,
  st_feedImageUploadDone: false,
  st_feedImageUploadError: null,

  //
  st_feedCreateLoading: false,
  st_feedCreateDone: false,
  st_feedCreateError: null,

  //
  st_feedListLoading: false,
  st_feedListDone: false,
  st_feedListError: null,
};

export const FEED_IMAGE_UPLOAD_REQUEST = "FEED_IMAGE_UPLOAD_REQUEST";
export const FEED_IMAGE_UPLOAD_SUCCESS = "FEED_IMAGE_UPLOAD_SUCCESS";
export const FEED_IMAGE_UPLOAD_FAILURE = "FEED_IMAGE_UPLOAD_FAILURE";

//

export const FEED_CREATE_REQUEST = "FEED_CREATE_REQUEST";
export const FEED_CREATE_SUCCESS = "FEED_CREATE_SUCCESS";
export const FEED_CREATE_FAILURE = "FEED_CREATE_FAILURE";

// other action
export const FEED_PREVIEW_IMAGE_RESET = "FEED_PREVIEW_IMAGE_RESET";
//

//

export const FEED_LIST_REQUEST = "FEED_LIST_REQUEST";
export const FEED_LIST_SUCCESS = "FEED_LIST_SUCCESS";
export const FEED_LIST_FAILURE = "FEED_LIST_FAILURE";

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

      //
      case FEED_CREATE_REQUEST: {
        draft.st_feedCreateLoading = true;
        draft.st_feedCreateDone = false;
        draft.st_feedCreateError = null;
        break;
      }
      case FEED_CREATE_SUCCESS: {
        draft.st_feedCreateLoading = false;
        draft.st_feedCreateDone = true;
        draft.st_feedCreateError = null;
        break;
      }
      case FEED_CREATE_FAILURE: {
        draft.st_feedCreateLoading = false;
        draft.st_feedCreateDone = false;
        draft.st_feedCreateError = action.data;
        break;
      }

      //
      case FEED_PREVIEW_IMAGE_RESET: {
        draft.previewImage = null;
        break;
      }
      //

      //
      case FEED_LIST_REQUEST: {
        draft.st_feedListLoading = true;
        draft.st_feedListDone = false;
        draft.st_feedListError = null;
        break;
      }
      case FEED_LIST_SUCCESS: {
        draft.st_feedListLoading = false;
        draft.st_feedListDone = true;
        draft.st_feedListError = null;
        draft.mainFeeds = action.data;
        break;
      }
      case FEED_LIST_FAILURE: {
        draft.st_feedListLoading = false;
        draft.st_feedListDone = false;
        draft.st_feedListError = action.data;
        break;
      }

      default:
        break;
    }
  });
export default reducer;
