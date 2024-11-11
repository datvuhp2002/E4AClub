import fetch from "@/common/request";

const Service = "Car_RegisterSearch";
const RegisterSearchServices = {
  Search: async (data: ReaderPublishSearchDto) => {
    let res: any = await fetch({
      url: `/${Service}/search`,
      method: "post",
      data,
    });
    return res;
  },
};
export default RegisterSearchServices;
