import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading, data } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["todayActivity"],
  });
  return { isLoading, data };
}
