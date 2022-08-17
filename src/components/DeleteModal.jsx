import { useSelector, useDispatch } from "react-redux";
import { setDeleteModal, deleteByIds } from "../features/tasksSlice";

function DeleteModal() {
  const dispatch = useDispatch();

  const deleteModal = useSelector((state) => state.tasks.deleteModal);
  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  const handleDeleteTask = (id) => {
    dispatch(deleteByIds(id));
    dispatch(setDeleteModal(false));
  };

  return (
    <div className={deleteModal ? "modal modal__opened" : "modal"}>
      <h3>Do you want to delete {selectedTask.taskName} task ?</h3>
      <button
        onClick={() => dispatch(setDeleteModal(false))}
        className="closeModalBtn"
      >
        X
      </button>
      <div>
        <button onClick={() => handleDeleteTask(selectedTask.id)}>Ok</button>
        <button onClick={() => dispatch(setDeleteModal(false))}>Cansel</button>
      </div>
    </div>
  );
}

export default DeleteModal;
