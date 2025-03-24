import fetch from "@/common/request";

const Service = "exercises";
const ExercisesServices = {
  GetExercisesBySection: async (id: string) => {
    try {
      let res: any = await fetch({
        endpoint: `/${Service}/bySection/${id}`,
        method: "GET",
      });
      return res;
    } catch (err) {
      console.log("ERRR::::", err);
      throw err;
    }
  },
  GetSection: async (id: string) => {
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
