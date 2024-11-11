import EventLogService from "@/services/even-log-services";

export interface IUserSearch {
  Keyword: String;
}
export interface IUserLogin {
  UserName: String;
}
export interface IUserLogout {
  UserName: String;
}
export interface IUserTracking {
  MFN?: Number;
  DID?: Number;
  ReadType: String;
}
export enum EventType {
  UserSearch = "UserSearch",
  UserLogin = "UserLogin",
  UserLogout = "UserLogout",
  UserTracing = "UserTracing",
}

export function SendEventLog(
  EventType: String,
  EventBody: IUserSearch | IUserLogin | IUserLogout | IUserTracking
) {
  let userInfo = sessionStorage.getItem("OUserInfo");
  let userName = "";
  if (userInfo) {
    userName = JSON.parse(userInfo).UserName;
  }
  var event = {
    EventType: EventType,
    EventTime: new Date(),
    EventBody: JSON.stringify(EventBody),
    UserName: userName,
  };
  EventLogService.SendAsync(event);
}
