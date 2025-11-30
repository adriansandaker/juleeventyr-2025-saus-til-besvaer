export interface UserData {
  userId: string;
  currentInnstilling: number;
}

export interface ReportMessage {
  type: string;
  users: UserData[];
}

export function isUserData(obj: object): obj is UserData {
  return "userId" in obj && "currentInstilling" in obj;
}

export function isReportMessage(obj: object): obj is ReportMessage {
  return "type" in obj && "users" in obj;
}
