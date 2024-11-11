export interface ISearchInput {
  SearchBy: any;
  SortBy?: any;
}
export interface IQuick {
  Option: any;
  KeyWord: any;
  ObjectSelected: any;
}
export interface IAdvance {
  IsUnSign: any;
  IsExact: any;
  DbType: any;
  Query1: any;
  Query2: any;
  Query3: any;
  ObjectSelected: any;
}
export interface IResponseMessage {
  Data: any;
  StatusCode: number;
  Message: string;
  Success: boolean;
}
export interface IDataItems {
  CurrentPage: number;
  PageSize: number;
  PageCount: number;
  RowCount: number;
  Results: any;
}
export interface IFormValues {
  date: string;
}
export interface IStatisticsCardData {
  categories: string[];
  series: number[];
}
export interface IDataItem {
  count_success: string;
  count_refuse: string;
  total_count: string; //
  count_pending: string; //
  total_price: string; //
  count_feedback: string; //
}

export interface DataEntry {
  month: string;
  thuvien: string | number;
  thieunhi: string | number;
  thieunhigiamho: string | number;
  canbohuutri: string | number;
  doanhnhan: string | number;
  id: number | null;
}
export interface IPieChartByMonthData {
  labels: Array<string>;
  series: Array<number>;
}

export interface FormAdminResearchProps {
  register: any;
  errors: any;
  handleSubmit: any;
  onSubmit: any;
  getValues: any;
  setValue: any;
  clearErrors: any;
  getData: () => void;
}
export interface IFormAdminResearchValue {
  cardtype?: string;
  fullname?: string;
  registrationcode?: string;
  createddate_from?: string;
  createddate_to?: string;
}
export interface FormAdminCommentProps {
  register: any;
  errors: any;
  handleSubmit: any;
  onSubmit: any;
  getValues: any;
  setValue: any;
  clearErrors: any;
  getData: () => void;
}
export interface IFormAdminCommentValue {
  registrationcode?: string;
  createddate_from?: string;
  createddate_to?: string;
}
