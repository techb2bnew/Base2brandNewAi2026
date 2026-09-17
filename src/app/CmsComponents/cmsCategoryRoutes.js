
export const CMS_CATEGORY_BY_ROUTE = {
  service: "Services",
  solution: "Solutions",
  industry: "Industries",
};

export const getCategoryForRoute = (routeSegment) =>
  CMS_CATEGORY_BY_ROUTE[routeSegment];
