import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStatus, numDays, numcabins }) {
  const numBookings = bookings?.length;
  const sales = bookings?.reduce((cur, item) => cur + item.totalPrice, 0);
  const checkins = confirmedStatus?.length;
  const occupation = (
    (confirmedStatus?.reduce((cur, item) => cur + item.numNights, 0) /
      (numDays * numcabins)) *
    100
  ).toFixed(1);
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkins}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={occupation + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
