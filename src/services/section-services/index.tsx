import fetch from "@/common/request";

const Service = "sections";
const SectionServices = {
  AddSection: async (data: any) => {
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
};
export default SectionServices;
