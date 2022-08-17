import { useSelector, useDispatch } from "react-redux";
import { setStartModal, getData } from "../features/tasksSlice";

import axios from "axios";
function StartModal() {
  const dispatch = useDispatch();
  const startModal = useSelector((state) => state.tasks.startModal);
  const tasks = useSelector((state) => state.tasks.tasks);
  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  const getAllParentIds = (id) => {
    if (id === null) {
      return [];
    }
    let parentIds = [id];
    const task = tasks.find((t) => t.id === id);
    if (task && task.parentId !== undefined) {
      parentIds = [...parentIds, ...getAllParentIds(task.parentId)];
    }
    return parentIds;
  };

  const handleStart = async (id) => {
    const ids = getAllParentIds(id);
    const promises = ids.map((a) =>
      axios.patch(`http://localhost:5555/tasks/${a}`, {
        taskStatus: 1,
      })
    );
    await Promise.all(promises);
    dispatch(getData());
    dispatch(setStartModal(false));
  };

  return (
    <div className={startModal ? "modal modal__opened" : "modal"}>
      <h3>Are you sure to start {selectedTask.taskName} ? </h3>
      <button
        onClick={() => dispatch(setStartModal(false))}
        className="closeModalBtn"
      >
        X
      </button>
      <div>
        <button onClick={() => handleStart(selectedTask.id)}>Ok</button>
        <button onClick={() => dispatch(setStartModal(false))}>Cansel</button>
      </div>
    </div>
  );
}

export default StartModal;
