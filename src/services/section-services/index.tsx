import fetch from "@/common/request";

const Service = "sections";
const SectionServices = {
  GetSectionByOrder: async (courseId: string, order: any) => {
    try {
      const data = { courseId: courseId, order: order };
      let res: any = await fetch({
        endpoint: `/${Service}/course-and-order`,
        method: "POST",
        data,
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  GetSection: async (section_id: string) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/${section_id}`,
        method: "GET",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  DeleteSection: async (section_id: string) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/${section_id}`,
        method: "DELETE",
        data: {},
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  GetSectionFromCourse: async (course_id: string) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/course/${course_id}`,
        method: "GET",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  AddSection: async (data: ISection) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}`,
        method: "POST",
        data,
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  UpdateSection: async (id: string, data: ISection) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/${id}`,
        method: "PUT",
        data,
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
};
export default SectionServices;
