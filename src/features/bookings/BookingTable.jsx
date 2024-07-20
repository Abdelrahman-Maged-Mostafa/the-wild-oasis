import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { getBookings } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
const PAGE_SIZE = 5;

function BookingTable() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const curPage = !searchParams.get("page") ? 1 : +searchParams.get("page");
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  const bookingsPerPage = bookings?.slice(
    (curPage - 1) * PAGE_SIZE,
    curPage * PAGE_SIZE
  );

  if (isLoading) return <Spinner />;
  if (!bookings || !bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <div style={{ overflowX: "auto" }}>
        <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
          <Table.Header>
            <div>Cabin</div>
            <div>Guest</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={bookingsPerPage}
            render={(booking) => (
              <BookingRow key={booking.id} booking={booking} />
            )}
          />
          <Table.Footer>
            <Pagination
              count={bookings ? bookings.length : 0}
              PAGE_SIZE={PAGE_SIZE}
            />
          </Table.Footer>
        </Table>
      </div>
    </Menus>
  );
}

export default BookingTable;
