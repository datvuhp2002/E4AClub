interface IUser {
  _id: string; // Unique identifier for the lesson
  email: string;
  name: string;
}

interface ICreateUserDto {
  name: string;
  email: string;
}
interface IUpdateUser {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  checkNewPassword: string;
}