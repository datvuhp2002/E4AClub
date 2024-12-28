interface IUser {
  _id: string; // Unique identifier for the lesson
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface ICreateUserDto {
  name: string;
  email: string;
}
interface IUpdateUser {
  name: string;
  email: string;
  avatar: File;
  oldPassword: string;
  newPassword: string;
  checkNewPassword: string;
}
