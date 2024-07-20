import styled from "styled-components";
import Stats from "./Stats";
import { useRecentBooknigs } from "./useRecentBooknigs";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCapins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
  @media (max-width: 768px) {
    /* padding-left: 1rem; */
    display: flex;
    flex-direction: column;
    /* grid-template-columns: 1fr;
    grid-template-rows: repeat(1fr); */
    /* font-size: 1.2rem; */
  }
  @media (max-width: 510px) {
    /* padding-left: 1rem; */
    & > div {
      width: auto;
    }
    /* grid-template-columns: 1fr;
    grid-template-rows: repeat(1fr); */
    /* font-size: 1.2rem; */
  }
  @media (max-width: 370px) {
    /* padding-left: 1rem; */
    width: 205px;
    & > div {
      &:nth-last-child(2) > div > div > svg {
        width: 170px;
      }
      width: auto;
      padding: 6px;
      & > * {
        font-size: 14px;
      }
    }
    /* grid-template-columns: 1fr;
    grid-template-rows: repeat(1fr); */
    /* font-size: 1.2rem; */
  }
`;
function DashboardLayout() {
  const { bookings, isLoading, numDays } = useRecentBooknigs();
  const { isLoading: staysLoading, confirmedStatus } = useRecentStays();
  const { data: cabins, isLoading: cabinsLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  if (isLoading || staysLoading || cabinsLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStatus={confirmedStatus}
        numDays={numDays}
        numcabins={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStatus={confirmedStatus} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
