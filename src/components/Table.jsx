import TableItem from "./TableItem";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../features/tasksSlice";

function Table() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const tasks = useSelector((state) => state.tasks.tasks);
  const isLoading = useSelector((state) => state.tasks.isLoading);

  return (
    <>
      {isLoading ? (
        <h1 className="loading">Loading ...</h1>
      ) : (
        <div className="tableWrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) => (
                <TableItem
                  key={task.id}
                  taskName={task.taskName}
                  taskStatus={task.taskStatus}
                  task={task}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Table;
