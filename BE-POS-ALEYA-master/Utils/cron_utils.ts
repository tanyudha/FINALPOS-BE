import cron from "node-cron";
import db from "Loaders/sequelize";
import { currentTime } from "./time_util";

const AuthHistory = db.AuthHistory;

const option = {
  scheduled: true,
  timezone: "Asia/Jakarta",
};

const midnight = {
  minute: 59,
  hour: 23,
};

interface iTime {
  minute?: number;
  hour?: number;
  dom?: number;
  month?: number;
  dow?: number;
}

export const set_cron = ({ minute, hour, dom, month, dow }: iTime, cb) => {
  let time = "";
  time += minute || "*";
  time += " " + (hour || "*");
  time += " " + (dom || "*");
  time += " " + (month || "*");
  time += " " + (dow || "*");
  return cron.schedule(time, cb, option);
};

export const midnight_logout = set_cron(midnight, async () => {
  const where = { logout: null };
  const logout = currentTime();
  const activity_log = "System Logout";
  await AuthHistory.update({ logout, activity_log }, { where });
});
