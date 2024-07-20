import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { getBooking } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { bookingId } = useParams();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  const moveBack = useMoveBack();
  const { isCheckingIn, checkin } = useChecking();
  const [confirmPaid, setConfirmPaid] = useState(false);

  const [addBreakfast, setAddBreakfast] = useState(false);

  const { settings, isLoading: isLoadingSettings } = useSettings();
  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid || false);
    },
    [booking?.isPaid]
  );

  const { guests, totalPrice, numGuests, hasBreakfast, numNights } =
    booking || {};

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      const breakfast = {
        totalPrice: totalPrice + optionalBreakfastPrice,
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
      };
      checkin({ bookingId, breakfast });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  if (isLoading || isLoadingSettings) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(() =>
                booking?.isPaid && addBreakfast ? true : false
              );
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((con) => !con)}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : ` ${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )}) `}
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
