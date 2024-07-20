import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (email === "podapoda_poda@yahoo.com") {
      setFullName(currentFullName);
      setAvatar(null);
      return alert(
        "هذا الحساب لا يتم تغير البينات الخاصة به ليستخدمه الاشخاص من بعدك رجاء عمل حساب خاص لتغير ما تشاء"
      );
    }
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }
  function handleCancel() {
    setFullName(currentFullName);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow>
        <label>Email address</label>
        <Input value={email} disabled />
      </FormRow>
      <FormRow>
        <label htmlFor="fullName">Full name</label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <label htmlFor="avatar">Avatar image</label>
        <FileInput
          id="avatar"
          accept="image/*"
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
