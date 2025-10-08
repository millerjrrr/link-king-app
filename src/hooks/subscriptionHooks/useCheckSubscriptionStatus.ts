// import useCatchAsync from "@src/hooks/utilityHooks/useCatchAsync";
// import { useRef } from "react";
// import { useDispatch } from "react-redux";
// import configurePurchases from "../../utils/configurePurchases";
// to bring back subscription logic will need to reinstall this package
// import Purchases from "react-native-purchases";
// import {
//   updateBusyState,
//   updateSubscribed,
// } from "@src/store/auth";
// import { Platform } from "react-native";

// const useCheckSubscriptionStatus = () => {
//   const dispatch = useDispatch();
//   const catchAsync = useCatchAsync();
//   const hasChecked = useRef(false);

//   const checkSubscriptionStatus = catchAsync(async () => {
//     //console.log("# Checking subscription status");
//     dispatch(updateBusyState(true));
//     try {
//       if (hasChecked.current) return;
//       if (
//         Platform.OS !== "web" &&
//         process.env.NODE_ENV === "production"
//       ) {
//         await configurePurchases();
//         const customerInfo =
//           await Purchases.getCustomerInfo();
//         dispatch(
//           updateSubscribed(
//             customerInfo.entitlements.active["Standard"] !==
//               undefined,
//           ),
//         );
//       }
//       hasChecked.current = true; // Mark as checked
//     } finally {
//       dispatch(updateBusyState(false));
//     }
//   });

//   return checkSubscriptionStatus;
// };

// export default useCheckSubscriptionStatus;
