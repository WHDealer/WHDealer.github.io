export const adminRouteBase = '/admin';

export const types = ['admin', 'user', 'nurse'];
export const statuses = ['', 'Pending Approval', 'Disapproved', 'Approved', 'Pending Upload'];
export const langs = ['en', 'de'];
export const mappingGender: any = { '0': 'Male', '1': 'Female', '2': 'Other', '3': '-', null: '-' };
export const mappingUserType: any = { user: 'basic-member', admin: 'admin', nurse: 'nurse' };
export const mappingPostureType: any = {
  standing: 'Standing exercises',
  lie: 'Lying down exercises',
  sit: 'Sitting exercises',
};

const config = {
  api: {
    // baseURL: 'https://66cf5t8j4a.execute-api.eu-central-1.amazonaws.com/develop',
    baseURL: 'https://hb.api.stg.deu.boot.ai',
    // baseURL: 'https://hb.stg.vn.boot.ai',
    staggingURL: 'https://sgzaegrtlj.execute-api.eu-central-1.amazonaws.com/staging',
  },
  app: {
    secretKey: 'hb2021',
    expiresIn: '30d',
  },
  rest: {
    signInAdmin: () => '/api/v1/admin/auth/signin',
    signInUser: () => '/api/v1/user/auth/signin',
    signUpUser: () => '/api/v1/user/auth/signup',
    signOutUser: () => '/api/v1/user/auth/signout',
    signOutAdmin: () => '/api/v1/admin/auth/signout',
    refreshTokenAdmin: () => '/api/v1/admin/auth/refresh-token',
    refreshTokenUser: () => '/api/v1/user/auth/refresh-token',
    createMeeting: () => '/api/v1/meetings',
    joinMeeting: () => '/api/v1/meetings/join',
    leaveMetting: () => '/api/v1/meetings/leave',
    endMetting: () => '/api/v1/meetings',
    getAllAttendee: () => '/api/v1/meetings',
    verifyToken: () => '/api/v1/verify-token',
    forceChangePassword: () => '/api/v1/admin/auth/force-change-password',
    getAllUsers: () => '/api/v1/admin/users',
    updateUser: (id: string) => `/api/v1/admin/users/${id}`,
    createUser: () => '/api/v1/admin/users',
    searchUsers: (type: string, status: number, pageSize: number, page: number, searchName: string) =>
      `/api/v1/admin/users/nurse?status=${
        status || ''
      }&page_size=${pageSize}&page_number=${page}&search_name=${searchName}`,
    forgotPasswordUser: (email: string) => `/api/v1/user/auth/recovery?email=${email}`,
    forgotPasswordNurse: (email: string) => `/api/v1/nurse/auth/recovery?email=${email}`,
    confirmForgotPassword: () => '/api/v1/user/auth/recovery',
    resetPassword: (id: string) => `/api/v1/admin/users/${id}/refresh-password`,
    resendVerifyEmail: (email: string) => `/api/v1/verify-email?email=${email}`,
    verifyEmail: () => '/api/v1/verify-email',
    getAllMessages: () => '/api/v1/settings/messages',
    createMessage: () => '/api/v1/settings/messages',
    updateMessage: (id: string) => `/api/v1/settings/messages/${id}`,
    getNewsfeedCategories: () => '/api/v1/newsfeed/categories',
    getNewsfeedSearch: (keyword: string) => `/api/v1/newsfeed/search?keyword=${keyword}`,
    getNewsfeedSeletectedCategories: () => '/api/v1/newsfeed/categories/selected',
    getNewsfeedArticles: (pageSize: number, page: number) =>
      `/api/v1/newsfeed/categories/articles?page_size=${pageSize}&page=${page}`,
    getNewsfeedArticlesById: (categoryId: string, pageSize: number, page: number) =>
      `/api/v1/newsfeed/categories/${categoryId}/articles?page_size=${pageSize}&page=${page}`,
    getNewsfeedFavoriteCategories: () => '/api/v1/newsfeed/favorite/selected',
    getNewsfeedFavoriteArticles: (pageSize: number, page: number) =>
      `/api/v1/newsfeed/favorite/categories/articles?page_size=${pageSize}&page=${page}`,
    getNewsfeedFavoriteArticlesById: (categoryId: string, pageSize: number, page: number) =>
      `/api/v1/newsfeed/favorite/categories/${categoryId}/articles?page_size=${pageSize}&page=${page}`,
    newsfeedFavoriteSetting: (articleId: string) => `/api/v1/newsfeed/favorite/${articleId}`,
    getTemporaryUploadLink: (fileName: string | number) => `/api/v1/upload/initialize?file_name=${fileName}`,
    getTemporaryUploadDocument: (fileName: any, videoId: any) =>
      `/api/v1/upload/documents?file_name=${fileName}&video_id=${videoId}`,
    createVideo: () => '/api/v1/admin/video',
    editVideo: (id: string) => `/api/v1/admin/video/${id}`,
    getMobilityUploader: (uploader: string) => `api/v1/admin/video/user?name=${uploader}`,
    saveVideo: (videosId: string) => `/api/v1/mobility/videos/${videosId}/save`,
    unsaveVideo: (videosId: string) => `api/v1/mobility/videos/${videosId}/unsave`,
    getVideoById: (id: string) => `/api/v1/mobility/videos/${id}`,
    getAllMobilityCategories: (postureType: string) => `api/v1/mobility/categories?posture_type=${postureType}`,
    getSearchVideos: (
      isSaved: string,
      searchName: string,
      categoryId: string,
      pageSize: number,
      page: number,
      posture?: string,
    ) =>
      `api/v1/mobility/videos?page_size=${pageSize}&page=${page}&value=${searchName}${
        categoryId === 'all' ? '' : `&category_id=${categoryId}`
      }${isSaved === '1' ? '&is_save=1' : ''}${posture ? `&posture_type=${posture}` : ''}`,
    getRelatedVideos: (videoId: string, pageSize: number, page: number) =>
      `api/v1/mobility/videos/${videoId}/related?page=${page}&page_size=${pageSize}`,
    likeVideo: (videoId: string) => `/api/v1/mobility/videos/${videoId}/like`,
    unlikeVideo: (videoId: string) => `/api/v1/mobility/videos/${videoId}/unlike`,
    getComments: (videoId: string, page: number) =>
      `api/v1/mobility/videos/${videoId}/comments?page=${page}&page_size=10`,
    createComment: (videoId: string) => `api/v1/mobility/videos/${videoId}/comments`,
    updateComment: (videoId: string, commentId: string) => `/api/v1/mobility/videos/${videoId}/comments/${commentId}`,
    deleteComment: (videoId: string, commentId: string) => `/api/v1/mobility/videos/${videoId}/comments/${commentId}`,
    likeComment: (videoId: string, commentId: string) =>
      `/api/v1/mobility/videos/${videoId}/comments/${commentId}/like`,
    unlikeComment: (videoId: string, commentId: string) =>
      `/api/v1/mobility/videos/${videoId}/comments/${commentId}/unlike`,
    getReplies: (videoId: string, commentId: string, page: number) =>
      `api/v1/mobility/videos/${videoId}/comments/${commentId}/replies?page=${page}&page_size=10`,
    createReply: (videoId: string, commentId: string) =>
      `api/v1/mobility/videos/${videoId}/comments/${commentId}/replies`,
    updateReply: (videoId: string, commentId: string, replyId: string) =>
      `/api/v1/mobility/videos/${videoId}/comments/${commentId}/replies/${replyId}`,
    deleteReply: (videoId: string, commentId: string, replyId: string) =>
      `/api/v1/mobility/videos/${videoId}/comments/${commentId}/replies/${replyId}`,
    likeReply: (videoId: string, commentId: string, replyId: string) =>
      `/api/v1/mobility/videos/${videoId}/comments/${commentId}/replies/${replyId}/like`,
    unlikeReply: (videoId: string, commentId: string, replyId: string) =>
      `/api/v1/mobility/videos/${videoId}/comments/${commentId}/replies/${replyId}/unlike`,
    searchCategory: (categoryName: string) => `/api/v1/admin/video/category?name=${categoryName}`,
    getVideos: (
      category: string,
      trainer: string,
      videoStatus: string,
      pageSize: number,
      page: number,
      searchName: string,
      postureType: string,
    ) =>
      `/api/v1/admin/video?category=${category}&trainer=${trainer}&status=${videoStatus}&page_size=${pageSize}&page_number=${page}&search_name=${searchName}&posture_type=${postureType}`,
    getVideosOfTrainer: (
      trainerId: string,
      category: string,
      videoStatus: string,
      pageSize: number,
      page: number,
      searchName: string,
      postureType: string,
    ) =>
      `/api/v1/admin/trainers/${trainerId}/videos?category=${category}&status=${videoStatus}&page_size=${pageSize}&page_number=${page}&search_name=${searchName}&posture_type=${postureType}`,
    getProfileUser: () => `/api/v1/user/profile`,
    getListFollowerAndFollowings: (type: string, pageSize: number, pageNumber: number) =>
      `/api/v1/user/profile/follows?type=${type}&page_size=${pageSize}&page_number=${pageNumber}`,
    postFollowingUser: (userId: string) => `/api/v1/user/profile/follows/${userId}`,
    unfollowUser: (userId: string) => `/api/v1/user/profile/follows/${userId}`,
    editProfile: () => '/api/v1/user/profile',
    changePasswordUser: () => '/api/v1/user/auth/change-password',
    getUploadLink: (fileName: string) => `/api/v1/upload/avatar?file_name=${fileName}`,
    paymentOrderDetail: () => '/api/v1/payment/create-order',
    getVideosByHashTag: (hashTag: string, pageNumber: number, pageSize: number) =>
      `/api/v1/mobility/hashtags/${hashTag}?page=${pageNumber}&page_size=${pageSize}`,
    getHistoryWatch: (searchName: string, page: number, pageSize: number) =>
      `/api/v1/mobility/videos/history/watch?search_name=${searchName}&page=${page}&page_size=${pageSize}`,
    clearAllHistoryWatch: () => `/api/v1/mobility/videos/history/watch`,
    removeHistoryWatch: (videoId: any) => `/api/v1/mobility/videos/history/watch/${videoId}`,
    removeSearchHistoryKeyword: (keywordId?: any) => `/api/v1/mobility/videos/history/search/${keywordId}`,
    removeAllSearchHistoryKeywords: () => `/api/v1/mobility/videos/history/search`,
    getHistoriesKeywords: (keyword: string) => `/api/v1/mobility/videos/history/search?keyword=${keyword}`,
    getAllTreatments: () => '/api/v1/consulting/treatments',
    getSearchTreatments: (diseases_name: string) =>
      `/api/v1/consulting/treatments/search?diseases_name=${diseases_name}`,
    initialDevice: () => `/api/v1/devices`,
    getDevice: (deviceId: number) => `api/v1/devices/${deviceId}`,
    updateDevice: (deviceId: number) => `api/v1/devices/${deviceId}`,
    getProfileDocuments: () => '/api/v1/user/profile-documents',
    updateProfileDocuments: () => '/api/v1/user/profile-documents',
    getTemporaryUploadNurse: (fileName: string, type: string) =>
      `/api/v1/upload/documents-profile?file_name=${fileName}&type=${type}`,
    getAppointments: () => '/api/v1/consulting/appointments/users/search',
    deleteAppointment: (id: string) => `/api/v1/consulting/appointments/${id}`,
    getSurveys: (id: number) => `/api/v1/consulting/treatments/survey/${id}`,
    updateProfileAdmin: () => '/api/v1/admin/profile',
    changeAdminPassword: () => '/api/v1/admin/auth/change-password',
    getNurses: (name: string, page: number, pageSize: number) =>
      `/api/v1/consulting/nurses/search?name=${name}&page=${page}&page_size=${pageSize}`,
    createAppointment: () => '/api/v1/consulting/appointments',
    getListUsers: (searchName: any, page: any, pageSize: any) =>
      `/api/v1/consulting/friends?search_name=${searchName}&type=friend&page=${page}&page_size=${pageSize}`,
    getListUsersConfirm: (searchName: any, page: any, pageSize: any) =>
      `/api/v1/consulting/friends?search_name=${searchName}&type=confirm&page=${page}&page_size=${pageSize}`,
    getUserSearchName: (searchName: any) => `/api/v1/consulting/users?email=${searchName}`,
    getUserInformation: (userId: any) => `/api/v1/consulting/users/${userId}`,
    addFriend: (friendId: any) => `/api/v1/consulting/friends/${friendId}`,
    changeStatusFriend: (friendId: any) => `/api/v1/consulting/friends/${friendId}`,
    deleteFriend: (friendId: any) => `/api/v1/consulting/friends/${friendId}`,
    adminGetNewsfeedCategories: (
      page: number,
      searchName: string,
      topCategory: boolean,
      fromDate: number | null,
      toDate: number | null,
    ) => {
      let api = `/api/v1/admin/newsfeed/categories?page=${page}&page_size=10&search_name=${searchName}`;
      if (topCategory) api += `&filter=top_topic`;
      if (fromDate) api += `&from_date=${fromDate}`;
      if (toDate) api += `&to_date=${toDate}`;
      return api;
    },
    adminDeleteNewsfeedCategory: (id: string) => `/api/v1/admin/newsfeed/categories/${id}`,
    adminGetNewsfeedArticles: (
      id: string,
      page: number,
      searchName: string,
      fromDate: number | null,
      toDate: number | null,
    ) => {
      let api = `/api/v1/admin/newsfeed/categories/${id}/articles?search_name=${searchName}&page=${page}&page_size=10`;
      if (fromDate) api += `&from_date=${fromDate}`;
      if (toDate) api += `&to_date=${toDate}`;
      return api;
    },
    adminDeleteNewsfeedArticle: (categoryId: string, articleId: string) =>
      `/api/v1/admin/newsfeed/categories/${categoryId}/articles/${articleId}`,
    adminCreateNewsfeedArticle: (categoryId: string) => `/api/v1/admin/newsfeed/categories/${categoryId}/articles`,
    adminGetMobilityCategories: (page: number, searchName: string, fromDate: number | null, toDate: number | null) => {
      let api = `/api/v1/admin/categories?page_number=${page}&page_size=10&search_name=${searchName}`;
      if (fromDate) api += `&from_date=${fromDate}`;
      if (toDate) api += `&to_date=${toDate}`;
      return api;
    },
    adminDeleteMobilityCategory: (id: string) => `/api/v1/admin/categories/${id}`,
    adminCreateMobilityCategory: () => '/api/v1/admin/categories',
    adminUpdateMobilityCategory: (id: string) => `/api/v1/admin/categories/${id}`,
    confirmPassword: () => '/api/v1/admin/auth/confirm-password',
    getAllWebinars: (status: any, page: any, pageSize: any) =>
      `/api/v1/consulting/webinars?status=${status}&page=${page}&page_size=${pageSize}`,
    getWebinarById: (id: any) => `/api/v1/consulting/webinars/${id}`,
    nurseCreateMeeting: () => '/api/v1/consulting/nurses/webinar',
    followWebinar: (id: any) => `/api/v1/consulting/webinars/${id}/follow`,
    unFollowWebinar: (id: any) => `/api/v1/consulting/webinars/${id}/unfollow`,
    getInformationNurse: () => `/api/v1/user/profile-documents`,
    getDetailFeedbacks: (id: string, page: number) =>
      `/api/v1/consulting/appointments/users/feedback?nurse_id=${id}&page=${page}&page_size=10`,
    adminGetMobilityTrainers: (page: number, searchName: string, order?: boolean, fullpage?: boolean) =>
      `/api/v1/admin/trainers?search_name=${searchName}&page=${page}&page_size=${fullpage ? 80 : 10}&order_by_name=${
        order ? 'first_name' : 'created_date'
      }`,
    adminMobilityTrainer: (id?: string) => `/api/v1/admin/trainers/${id || ''}`,
    getAllTrainers: (page: any, pageSize: any) =>
      `/api/v1/mobility/trainers?followed=2&page=${page}&page_size=${pageSize}`,
    getMyTrainers: (page: any, pageSize: any) =>
      `/api/v1/mobility/trainers?followed=1&page=${page}&page_size=${pageSize}`,
    trainerById: (id: any) => `/api/v1/mobility/trainers/${id}`,
    getVideoByTrainer: (idTrainer: any, page: any, pageSize: any) =>
      `/api/v1/mobility/trainers/${idTrainer}/videos?page=${page}&page_size=${pageSize}`,
    followTrainer: (idTrainer: any) => `/api/v1/mobility/trainers/${idTrainer}/follow`,
    unFollowTrainer: (idTrainer: any) => `/api/v1/mobility/trainers/${idTrainer}/unfollow`,
    unsaveALLMobility: () => `/api/v1/mobility/videos/unsave`,
    getSettings: () => `/api/v1/settings`,
    settings: () => `/api/v1/settings`,
  },
  routes: {
    managerUsers: () => adminRouteBase + '/users',
    settings: () => adminRouteBase + '/settings',
  },
  validate: {
    valueTypingExpressionsName: (e: any) => /^[A-Za-z-äöüÄÖÜùûüÿàâæéèêëïîôœÙÛÜŸÀÂÆÉÈÊËÏÎÔŒß' ]*$/.test(e.target.value),
    // validateEmail: () => /[A-Z0-9a-z_äöüÄÖÜùûüÿàâæéèêëïîôœÙÛÜŸÀÂÆÉÈÊËÏÎÔŒß']@[A-Z0-9a-z].[A-Z0-9a-z]/,
    validateEmail: () => /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    validatePassword: () => /(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()\\-_=+{}|?>.<,:;]{8,16}/,
    valueTypingExpressionsPhone: (e: any) => /^[\+0-9][0-9]*$/.test(e.target.value),
    valueTypingExpressionsNumber: (e: any) => /^[0-9]*$/.test(e.target.value),
  },
  messages: {
    signInFailure: 'Sign in failure.',
    signUpFailure: 'Sign up failure.',
    forceChangePasswordFailure: 'Change password failure.',
    createUserFailure: 'Create user failure.',
    updateUserFailure: 'Update user failure.',
    resetPasswordFailure: 'Reset password failure.',
    forgotPasswordFailure: 'Forgot password failure.',
    recoveryPasswordFailure: 'Recovery password failure.',
    resendVerifyEmailFailure: 'Resend verify email failure.',
    createMessageFailure: 'Create message failure.',
    updateMessageFailure: 'Update message failure.',
  },
  socketEvent: {
    processedVideo: 'check_upload_status',
    processedTrainerIntro: 'check_upload_intro_trainer_status',
  },
};

export const topicsScrollSetting = {
  alignCenter: false,
  clickWhenDrag: false,
  dragging: true,
  hideArrows: true,
  hideSingleArrow: true,
  inertiaScrolling: false,
  inertiaScrollingSlowdown: 0.25,
  rtl: false,
  scrollBy: 0,
  scrollToSelected: false,
  transition: 0.4,
  useButtonRole: true,
  wheel: false,
  menuClass: 'hb-scroll-menu-wrapper',
};

export const listHours = Array.from(
  { length: 24 * 4 + 1 },
  (_, id) => ('0' + Math.floor(id / 4)).substr(-2) + ':' + ('0' + Math.floor(id % 4) * 15).substr(-2),
);

// const listHours = [];
// for (let i = 0; i < 24; i++)
//   for (let j = 0; j < 4; j++) listHours.push(`${('0' + i).substr(-2)}:${('0' + j * 15).substr(-2)}`);

export const GOOGLE_CLIENT_ID = '662900041046-gakmnq61cgpht1jhri8stutj5q0dl2rg.apps.googleusercontent.com';
export const GOOGLE_API_KEY = 'AIzaSyBS1tvyHB5c8ZnSeRD0PwLBJlpUge-HdrQ';

export type ItemNotificationType = {
  type: 'friend_requested' | 'friend_request_accepted';
  title: string;
  body: string;
  is_new: boolean;
  id: string;
  is_read: boolean;
  created_date: number;
  image: string;
  body_json: string;
  sender: {
    email: string;
    first_name: string;
    last_name: string;
    avatar: string | null;
  };
  receiver: {
    email: string;
    first_name: string;
    last_name: string;
    avatar: string | null;
  };
};

export const listUserStatus = [
  null,
  { id: 3, name: 'Approved' },
  { id: 1, name: 'Pending Approval' },
  { id: 2, name: 'Disapproved' },
  { id: 4, name: 'Pending Upload' },
];

export const listStatus = [
  null,
  { id: 'Draft', name: 'Draft' },
  { id: 'Disable', name: 'Disable' },
  { id: 'Posted', name: 'Posted' },
  { id: 'Uploading', name: 'Uploading' },
  { id: 'Processing', name: 'Processing' },
  { id: 'Upload Failed', name: 'Upload Failed' },
];

export const listPostureType = [
  null,
  { id: 'standing', name: 'Standing exercises' },
  { id: 'sit', name: 'Sitting exercises' },
  { id: 'lie', name: 'Lying down exercises' },
];

export default config;
