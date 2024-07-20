import styled from "styled-components";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useCreateCabin, useEditCabin } from "./useEditCreateCabin";

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ close, cabin }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { isAdded, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isAdded || isEditing;
  function handelFormSubmit(data) {
    const image = data.image[0] ? data.image[0] : cabin.image;
    if (cabin)
      editCabin(
        { data: { ...data, image }, id: cabin.id },
        {
          onSuccess: () => {
            reset();
            close();
          },
        }
      );
    else createCabin({ ...data, image }, { onSuccess: () => reset() });
  }
  function handleError(error) {
    // setShowForm((show) => !show);
  }
  // if (isAdded) return <Spinner />;
  return (
    <Form
      onSubmit={handleSubmit(handelFormSubmit, handleError)}
      type={close ? "modal" : "regular"}
    >
      <div>
        <FormRow>
          <Label htmlFor="name">Cabin name</Label>
          <Input
            disabled={isWorking}
            type="text"
            defaultValue={cabin ? cabin.name : ""}
            id="name"
            {...register("name", { required: "this field is required " })}
          />
          {errors?.name?.message && <Error>{errors.name.message}</Error>}
        </FormRow>

        <FormRow>
          <Label htmlFor="maxCapacity">Maximum capacity</Label>
          <Input
            disabled={isWorking}
            type="number"
            id="maxCapacity"
            defaultValue={cabin ? cabin.maxCapacity : ""}
            {...register("maxCapacity", {
              required: "this field is required ",
              min: {
                value: 1,
                message: "Capacity should be at least 1",
              },
            })}
          />
          {errors?.maxCapacity?.message && (
            <Error>{errors.maxCapacity.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="regularPrice">Regular price</Label>
          <Input
            defaultValue={cabin ? cabin.regularPrice : ""}
            disabled={isWorking}
            type="number"
            id="regularPrice"
            {...register("regularPrice", {
              required: "this field is required ",
              min: {
                value: 1,
                message: "Capacity should be at least 1",
              },
            })}
          />
          {errors?.regularPrice?.message && (
            <Error>{errors.regularPrice.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="discount">Discount</Label>
          <Input
            defaultValue={cabin ? cabin.discount : 0}
            disabled={isWorking}
            type="number"
            id="discount"
            {...register("discount", {
              required: "this field is required ",
              validate: (value) =>
                +value < +getValues().regularPrice ||
                "discount should be less than regularPrice",
            })}
          />
          {errors?.discount?.message && (
            <Error>{errors.discount.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="description">Description for website</Label>
          <Textarea
            defaultValue={cabin ? cabin.description : ""}
            disabled={isWorking}
            type="number"
            id="description"
            {...register("description", {
              required: "this field is required ",
            })}
          />
          {errors?.description?.message && (
            <Error>{errors.description.message}</Error>
          )}
        </FormRow>

        <FormRow>
          <Label htmlFor="image">Cabin photo</Label>
          <FileInput
            // defaultValue={cabin ? cabin.image : ""}
            disabled={isWorking}
            id="image"
            accept="image/*"
            type="file"
            {...register("image", {
              required: cabin ? false : "this field is required ",
            })}
          />
          {errors?.image?.message && <Error>{errors.image.message}</Error>}
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => close?.(false)}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {cabin ? "Edit cabin" : "Add cabin"}
          </Button>
        </FormRow>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
