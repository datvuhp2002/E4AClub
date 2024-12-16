import requestApi from "@/common/request";

const Service = "courses";

const CourseServices = {
  getCourseForAdmin: async () => {
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
};

export default CourseServices;
