export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};
export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string | null;
  contacts: Array<ContactType>;
  photos: PhotosType;
};
export type ContactType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};
export type PhotosType = {
  small: string | null;
  large: string | null;
};
export type UserType = {
    name: String,
    id: number,
    photos: PhotosType,
    status: string | null,
    followed: boolean
};
export type DialogType = {
  id: number
  name: string
}
export type MessageType = {
  id: number
  message: string
}