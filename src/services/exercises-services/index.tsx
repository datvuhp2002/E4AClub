import fetch from "@/common/request";

const Service = "exercises";
const ExercisesServices = {
  CreateExercise: async (data: any) => {
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
  DeleteSection: async (id: string) => {
    try {
      const res: any = await fetch({
        endpoint: `/${Service}/${id}`,
        method: "DELETE",
        data: {},
      });
      return res;
    } catch (error) {
      console.log("Request failed:", error);
    }
  },
  GetExercisesBySection: async (id: string) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/by-section/${id}`,
        method: "GET",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  GetExerciseById: async (id: string) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/${id}`,
        method: "GET",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  UpdateExercise: async (id: string, data: IExercise) => {
    try {
      const res: any = await fetch({
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
export default ExercisesServices;
