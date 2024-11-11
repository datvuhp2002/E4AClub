import fetch from "@/common/request";

const Service = "CarFeedback";
const FeedbackLibraryServices = {
  Insert: async (data: any) => {
    data.status = "Tạo mới";
    let res: any = await fetch({
      url: `/${Service}/insert`,
      method: "post",
      data,
    });
    return res;
  },
  Search: async (data: any) => {
    let res: any = await fetch({
      url: `/${Service}/search-feedback`,
      method: "post",
      data,
    });
    return res;
  },
  UpdateStatusFeedBack: async (id: number) => {
    const status = "Đã duyệt";
    let res: any = await fetch({
      url: `/${Service}/update-status-feedback?id=${id}&status=${status}`,
      method: "post",
    });
    return res;
  },
};
export default FeedbackLibraryServices;
