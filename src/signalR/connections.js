import { getHubsRoute } from "@/utils/constants";
import * as signalR from "@microsoft/signalr";

export const inActiveFoodsHubConncetion = () => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${getHubsRoute()}/in-active-food`)
    .withAutomaticReconnect()
    .build();

  return connection;
};
