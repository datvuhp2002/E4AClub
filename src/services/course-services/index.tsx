import requestApi from "@/common/request";

const Service = "courses";

const CourseServices = {
  GetEnrolledUsers: async (course_id: string) => {
    try {
      let res: any = await requestApi({
        endpoint: `/${Service}/enroll-users/${course_id}`,
        method: "GET",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  GetMyCourse: async () => {
    try {
      let res: any = await requestApi({
        endpoint: `/${Service}/my-courses}`,
        method: "GET",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  GetAllCourse: async () => {
    try {
      const res: any = await requestApi({
        endpoint: `/${Service}`,
        method: "GET",
      });
      return res;
    } catch (error) {
      console.log("Request failed:", error);
    }
  },
  GetAllCoursesWithCheckEnrolled: async () => {
    try {
      const res: any = await requestApi({
        endpoint: `/${Service}/all-courses-with-check-enrolled`,
        method: "GET",
      });
      return res;
    } catch (error) {
      console.log("Request failed:", error);
    }
  },
  GetCourseById: async (course_id: string) => {
    try {
      const res: any = await requestApi({
        endpoint: `/${Service}/${course_id}`,
        method: "GET",
      });
      return res;
    } catch (error) {
      console.log("Request failed:", error);
    }
  },
  DeleteCourse: async (course_id: string) => {
    try {
      const res: any = await requestApi({
        endpoint: `/${Service}/${course_id}`,
        method: "DELETE",
        data: {},
      });
      return res;
    } catch (error) {
      console.log("Request failed:", error);
    }
  },
  CreateCourse: async (data: ICreateCourse) => {
    try {
      const res: any = await requestApi({
        endpoint: `/${Service}}`,
        method: "DELETE",
        data: data,
      });
      return res;
    } catch (error) {
      console.log("Request failed:", error);
    }
  },
  UpdateCourse: async (id: string, data: ICreateCourse) => {
    try {
      const res: any = await requestApi({
        endpoint: `/${Service}/${id}`,
        method: "PUT",
        data: data,
      });
      return res;
    } catch (error) {
      console.log("Request failed:", error);
    }
  },
};

export default CourseServices;
