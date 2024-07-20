import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSettings } from "./useEditSettings";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdateing, updateSettings } = useUpdateSettings();

  function handleUpdate(e, name) {
    if (!e.target.value) return;
    const newUpdate = {};
    newUpdate[name] = e.target.value;
    updateSettings(newUpdate);
  }
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow>
        <label htmlFor="min-nights">Minimum nights/booking</label>
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdateing}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="max-nights">Maximum nights/booking</label>
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdateing}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="max-guests">Maximum guests/booking</label>
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdateing}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="breakfast-price">Breakfast price</label>
        <Input
          type="number"
          disabled={isUpdateing}
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
