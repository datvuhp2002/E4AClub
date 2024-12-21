interface ICourse {
  _id: string;
  title: string;
  description: string;
  totalSections: number;
  totalEnrolledUsers: number;
  createdAt: string;
  updatedAt: string;
  sections: ISection[];
  teacher: IUser;
  image: string;
}

interface ICreateCourse {
  title: string;
  description: string;
  image: string;
}
