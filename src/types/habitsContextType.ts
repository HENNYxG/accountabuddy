import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { ReactNode } from "react";

export type GroupType = {
  id: number;
  icon: IconProp;
  name: string;
};

export type HabitType = {
  _id: string;
  name: string;
  icon: IconProp;
  frequency: FrequencyType[];
  isNotificationOn: boolean;
  notificationTime: string;
  group: GroupType[];
};


//days of the week + day week month
export type FrequencyType = {
  type: string;
  days: string[];
  timesPerInterval: number;
};

//days of the week
export type DayOption = {
  id: number;
  name: string;
  selected: boolean;
};
