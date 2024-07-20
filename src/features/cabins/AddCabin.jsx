import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
export default AddCabin;

// function AddCabin() {
//   const [isOpenMudal, setIsOpenMudal] = useState();

//   return (
//     <div>
//       <Button onClick={() => setIsOpenMudal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenMudal && (
//         <Modal setIsOpenMudal={setIsOpenMudal}>
//           <CreateCabinForm setIsOpenMudal={setIsOpenMudal} />
//         </Modal>
//       )}
//     </div>
//   );
// }
