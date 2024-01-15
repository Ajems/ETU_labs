export const LOCATIONS = {
  LOGIN: (): string => `login`,
  NEWS: (): string => `/news`,
  SELF_PAGE: (): string => 'userPage/self',
  USER_PAGE: (id: number): string => `userPage/${id}`,
  MESSAGES: (id: number): string => `messages/${id}`,
  REGISTER: (): string => `register`,
  FRIENDS_LIST: (id: number): string => `friends/${id}`,
  FRIENDS_SELF_LIST: (): string => `friends`,
}
