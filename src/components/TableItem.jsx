import { useDispatch } from "react-redux";
import {
  setDeleteModal,
  setStartModal,
  setSelectedTask,
} from "../features/tasksSlice";

function TableItem({ taskName, taskStatus, task }) {
  const dispatch = useDispatch();
  return (
    <tr>
      <td>{taskName}</td>
      <td>{taskStatus}</td>
      <td>
        <button
          onClick={() => {
            dispatch(setDeleteModal(true));
            dispatch(setSelectedTask(task));
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            dispatch(setStartModal(true));
            dispatch(setSelectedTask(task));
          }}
        >
          Start
        </button>
      </td>
    </tr>
  );
}

export default TableItem;
