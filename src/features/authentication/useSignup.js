import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: (user) => {
      toast.success(`Account successfully created!`);
      //   toast.success(
      //     `Account successfully created! please verify the new account from the user\'s email address.`
      //   );
    },
    onError: (err) => {
      if (err.message === "Email rate limit exceeded")
        toast.error("we not work now please try in other time");
      else toast.error(err.message);
    },
  });
  return { signup, isLoading };
}
