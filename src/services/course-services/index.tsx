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
        endpoint: `/${Service}/my-courses`,
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
  GetCourseByUserId: async (id: string) => {
    try {
      const res: any = await requestApi({
        endpoint: `/${Service}/user/${id}`,
        method: "GET",
      });
      console.log(res);
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
      // Kiểm tra nếu image không tồn tại
      if (!data.image) {
        console.error("Không có ảnh được chọn.");
        return;
      }

      // Kiểm tra nếu image là FileList và có ít nhất một phần tử
      if (data.image instanceof FileList && data.image.length > 0) {
        data.image = data.image[0]; // Lấy file đầu tiên từ FileList
      }

      // Kiểm tra lại nếu image không phải File
      if (!(data.image instanceof File)) {
        console.error("Đây không phải là một tệp tin.");
        return;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const value = (data as any)[key];

        if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
      const res: any = await requestApi({
        endpoint: `/${Service}`,
        method: "POST",
        data: formData,
        responseType: "json",
        contentType: "multipart/form-data",
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
  UpdateProgressExercise: async (data: IUpdateProgressExercise) => {
    try {
      const res: any = await requestApi({
        endpoint: `/submissions`,
        method: "POST",
        data: data,
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log("Request failed:", error);
    }
  }
};

export default CourseServices;
