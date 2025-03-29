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
      let res: any = await fetch({
        endpoint: `/${Service}/${id}`,
        method: "DELETE",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
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
    console.log(id);
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
};
export default ExercisesServices;
