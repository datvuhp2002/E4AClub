import requestApi from "@/common/request";

const Service = "courses";

const CourseServices = {
  getCourseForAdmin: async (items_per_page: Number) => {
    try {
      const res: any = await requestApi({
        endpoint: `/${Service}?items_per_page=${items_per_page}`,
        method: "GET",
      });
      return res;
    } catch (error) {
      console.log("Request failed:", error);
    }
  },
};

export default CourseServices;
