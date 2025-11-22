

import dayjs from "dayjs";

export const formatDate = (timestamp: number): string => {
  return dayjs(timestamp).format('DD/MM/YYYY');
};

export const formatDateTime = (timestamp: number): string => {
  return dayjs(timestamp).format('MMM DD, YYYY, hh:mm A');
};







