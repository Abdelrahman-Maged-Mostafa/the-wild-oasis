import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCapins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClint = useQueryClient();
  const { isLoading: isDeleting, mutate: deletedCabin } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClint.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deletedCabin };
}
