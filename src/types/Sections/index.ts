interface ISection {
  _id: string; // Unique identifier for the lesson
  title: string; // Title of the lesson
  content: string; // HTML content of the lesson
  course: string; // Course ID the lesson belongs to
  order: number; // Order of the lesson in a course
  createdAt: string; // Timestamp of when the lesson was created
  updatedAt: string; // Timestamp of when the lesson was last updated
  exercises: Exercise[];
  __v: number; // Version key for the document
  video: string; // Video ID associated with the lesson
}
interface IGetSectionRes {
  _id: string; // Unique identifier for the lesson
  title: string; // Title of the lesson
  content: string; // HTML content of the lesson
  order: number; // Order of the lesson in a course
  course: ICourse; // Course ID the lesson belongs to
  createdAt: string; // Timestamp of when the lesson was created
  updatedAt: string; // Timestamp of when the lesson was last updated
  __v: number; // Version key for the document
  video: string; // Video ID associated with the lesson
}
