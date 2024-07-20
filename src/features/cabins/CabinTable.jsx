import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCapins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   @media (max-width: 768px) {
//     /* padding-left: 1rem; */
//     font-size: 1rem;
//     min-width: 420px;
//     overflow-x: auto;
//   }
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
//   @media (max-width: 768px) {
//     /* padding-left: 1rem; */
//     column-gap: 1rem;
//     padding: 1rem 1.5rem;
//     font-size: 1rem;
//     overflow-x: auto;
//   }
// `;
function CabinTable() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  ///Filter
  let filterCabins;
  if (filterValue === "all") filterCabins = cabins;
  if (filterValue === "no-discount")
    filterCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filterCabins = cabins?.filter((cabin) => cabin.discount !== 0);
  //Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy?.split("-");
  const sortedCabins = filterCabins?.sort((a, b) =>
    direction === "asc" ? a[field] - b[field] : b[field] - a[field]
  );

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <div style={{ overflowX: "auto" }}>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>cabin</div>
            <div>capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          <Table.Body
            data={sortedCabins}
            render={(cabin, i) => <CabinRow cabin={cabin} key={i} />}
          />
        </Table>
      </div>
    </Menus>
  );
}

export default CabinTable;
