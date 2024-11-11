import fetch from "@/common/request";

const Service = "CarReaderPublishSearch";
const ReaderPublishSearchServices = {
  Search: async (data: any) => {
    let res: any = await fetch({
      url: `/${Service}/search`,
      method: "post",
      data,
    });
    return res;
  },
  SearchReportExcel: async (data: any) => {
    let res: any = await fetch({
      url: `/${Service}/search_report_excel`,
      method: "post",
      data,
    });
    return res;
  },
  CreateReportExcel: async (data: any) => {
    let res: any = await fetch({
      url: `/${Service}/create_report_excel`,
      method: "post",
      data,
    });
    return res;
  },
  GetDataDashBroad: async () => {
    let res: any = await fetch({
      url: `/${Service}/get-data-dashbroard`,
      method: "post",
    });
    return res;
  },
  GetItemById: async (id: string) => {
    let res: any = await fetch({
      url: `/${Service}/get-item-by-id?id=${id}`,
      method: "post",
    });
    return res;
  },
  UpdateStatusRegister: async (data: UpdateStatusRegisterDto) => {
    const note = data.note || "%22%22";
    let res: any = await fetch({
      url: `/${Service}/update-status-register?id=${data.id}&status=${data.status}&note=${note}`,
      method: "post",
    });
    return res;
  },
  UpdatePaymentStatus: async (data: UpdatePaymentStatusDto) => {
    let res: any = await fetch({
      url: `/${Service}/update-payment-status?id=${data.id}&ispayment=${data.status}`,
      method: "post",
    });
    return res;
  },
};
export default ReaderPublishSearchServices;
