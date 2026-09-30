// PLACEHOLDER — the original mobileApps data file was not copied over from the old React project.
// Replace this export with the real list. Each entry:
// {
//   id: "01",
//   name: "App Name",            // also names the screenshot: /public/mobileAppimage/<name>.png
//   tagline: "Short line",       // optional
//   stack: ["React Native", ...],
//   description: ["Bullet 1", "Bullet 2"],
//   android: "https://play.google.com/...", // null/omit when not live
//   ios: "https://apps.apple.com/...",      // null/omit when not live
//   image: "/optional/override.png",        // optional
// }
export const mobileApps = [
  {
    id: "matchcreatorz",
    name: "MatchCreatorz",
    tagline: "Creator, Seller & Buyer Marketplace App",
    stack: ["React Native", "Redux", "Firebase", "Socket.io", "Payment Gateway Integration"],
    description: [
      "Built an Upwork-style freelance marketplace connecting creators, sellers, and buyers, with profile matching, real-time chat, and secure in-app payments.",
      "Integrated payment gateway for transactions, Socket.io for real-time messaging, and Firebase for data synchronization and notifications.",
    ],
    android: "https://play.google.com/store/apps/details?id=com.naim.matchcreators",
    ios: "https://apps.apple.com/us/app/matchcreatorz/id6794620289",
  },
  {
    id: "b2b-samsara-driver",
    name: "B2B Samsara Driver",
    tagline: "Fleet Logistics Driver App",
    stack: ["React Native", "Redux", "Firebase"],
    description: [
      "Developed a logistics driver app for fleet drivers in an international market, with a custom rule engine that logs shift start/end times and break periods and flags rule violations automatically.",
      "Built real-time compliance alerts and shift-log tracking to help drivers stay within regulated driving and rest-hour limits.",
    ],
    android: null,
    ios: "https://apps.apple.com/us/app/b2bsamsaradriver/id6811781965",
  },
  {
    id: "coconut-stock-customer",
    name: "Coconut Stock Customer App",
    tagline: null,
    stack: ["React Native", "Redux", "Firebase", "Google Maps", "Push Notifications"],
    description: [
      "Developed a customer-facing application for coconut ordering and delivery management.",
      "Includes order placement, order tracking, delivery status updates, driver assignment, and real-time notifications.",
    ],
    android: "https://play.google.com/store/apps/details?id=com.coconutcustomer",
    ios: "https://apps.apple.com/us/app/coconut-stock-customer/id6781569003",
  },
  {
    id: "coconut-stock-driver",
    name: "Coconut Stock Driver App",
    tagline: null,
    stack: ["React Native", "Redux", "Firebase", "Google Maps", "Push Notifications"],
    description: [
      "Developed a driver application for managing assigned coconut delivery orders.",
      "Includes order acceptance, delivery status updates, location tracking, proof of delivery, and real-time notifications.",
    ],
    android: "https://play.google.com/store/apps/details?id=com.sedadriverapp",
    ios: "https://apps.apple.com/us/app/coconut-stock-driver/id6781219731",
  },
];
