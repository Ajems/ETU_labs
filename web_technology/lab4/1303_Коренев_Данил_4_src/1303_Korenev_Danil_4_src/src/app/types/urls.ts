const MAIN_URL = `https://localhost:443/api`

export const URLS = {
  NEWS_OF_USER: (id: number): string => `${MAIN_URL}/news-of-user/${id}`,
  NEWS_FEED: (): string => `${MAIN_URL}/news-feed`,
  ADD_USER_POST: (): string => `${MAIN_URL}/add-user-post`,
  FULL_SELF_INFO: (): string => `${MAIN_URL}/full-self-info`,
  SELF_USER_ID: (): string => `${MAIN_URL}/self-user-id`,
  IS_USER_FRIEND: (userId: number): string => `${MAIN_URL}/is-user-friend/${userId}`,
  FULL_USER_INFO: (id: number): string => `${MAIN_URL}/full-user-info/${id}`,
  FRIENDS_LIST: (id: number): string => `${MAIN_URL}/friends-of-user/${id}`,
  LOGIN: (): string => `${MAIN_URL}/login`,
  REGISTER: (): string => `${MAIN_URL}/register`,
  MESSAGE_BASE_INFO: (companionId: number): string => `${MAIN_URL}/message-base-info/${companionId}`,
  GET_DIALOG_MESSAGES: (companionId: number): string => `${MAIN_URL}/dialog-messages/${companionId}`,
  SEND_MESSAGE: (companionId: number): string => `${MAIN_URL}/send-message/${companionId}`,
  SEND_FRIEND_REQUEST: (): string => `${MAIN_URL}/add-user-to-friend`,
  REMOVE_USER_FRIEND: (): string => `${MAIN_URL}/remove-user-from-friends`,
  CHANGE_USER_AVATAR: (): string => `${MAIN_URL}/change-user-avatar`,
  LOAD_USER_AVATAR: (userId: number): string => `${MAIN_URL}/load-user-avatar/${userId}`,
  IS_USER_ADMIN: (): string => `${MAIN_URL}/is-user-admin`
}
