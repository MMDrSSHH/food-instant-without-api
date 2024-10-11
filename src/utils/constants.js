export const getApiRoute = () => {
  return "http://localhost:5000/api";
};

export const getStaticRoute = () => {
  return "http://localhost:5000/";
};

export const getHubsRoute = () => {
  return "http://localhost:5000/hubs";
};

export const OrderType = {
  TakeAway: 0,
  Delivery: 1,
};

export const PaymentType = {
  Online: 0,
  Cash: 1,
};

export const OrderStatus = {
  Created: 0,
  PaymentGateway: 1,
  PaymentSuccessful: 2,
  PaymentFailure: 3,
  Accepted: 4,
  Delivering: 5,
  Delivered: 6,
  Canceled: 7,
};

export const ErrorCode = {
  General: 1,
  ModelValidation: 2,
  RequiredData: 3,
  LimitExceeded: 4,
  Expired: 5,
};
