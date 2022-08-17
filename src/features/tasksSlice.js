import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  isLoading: true,
  deleteModal: false,
  startModal: false,
  selectedTask: [],
};

export const getData = createAsyncThunk(
  "tasks/getData",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("http://localhost:5555/tasks");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteByIds = createAsyncThunk(
  "tasks/deleteByIds",
  async (id, { getState, dispatch }) => {
    const state = getState();

    const tasks = state.tasks.tasks;
    let arrayIds = [];
    tasks.forEach((d) => {
      if (d.parentId == id) {
        arrayIds.push(d.id);
      }
    });
    const promises = arrayIds.map((a) =>
      axios.delete(`http://localhost:5555/tasks/${a}`)
    );

    await Promise.all(promises);
    dispatch(setTasks());
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setDeleteModal: (state, action) => {
      state.deleteModal = action.payload;
    },
    setStartModal: (state, action) => {
      state.startModal = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    setTasks: (state) => {
      state.tasks = state.tasks.filter(
        (a) => a.parentId !== state.selectedTask.parentId
      );
    },
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.isLoading = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
    },
    [getData.rejected]: () => console.log("get data rejected..."),
  },
});

const { setTasks } = tasksSlice.actions;

export const { setDeleteModal, setStartModal, setSelectedTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
