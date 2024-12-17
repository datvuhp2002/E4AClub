import requestApi from "@/common/request";

const Service = "courses";

const CourseServices = {
  getAllCourse: async () => {
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
  getCourseById: async (course_id: string) => {
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
};

export default CourseServices;
