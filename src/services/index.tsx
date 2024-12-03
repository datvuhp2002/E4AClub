import fetch from "@/common/request";

const Service = "CarFeedback";
const FeedbackLibraryServices = {
  Insert: async (data: any) => {
    data.status = "Tạo mới";
    let res: any = await fetch({
      endpoint: `/${Service}/insert`,
      method: "POST",
      data,
    });
    return res;
  },
  Search: async (data: any) => {
    let res: any = await fetch({
      endpoint: `/${Service}/search-feedback`,
      method: "POST",
      data,
    });
    return res;
  },
  UpdateStatusFeedBack: async (id: number) => {
    const status = "Đã duyệt";
    let res: any = await fetch({
      endpoint: `/${Service}/update-status-feedback?id=${id}&status=${status}`,
      method: "POST",
    });
    return res;
  },
};
export default FeedbackLibraryServices;
