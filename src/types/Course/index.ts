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
  isEnrolled: boolean;
}

interface ICreateCourse {
  title: string;
  description: string;
  image: File;
}
