import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/config";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/projects`, {
        withCredentials: true,
      });
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/projects`, projectData, {
        withCredentials: true,
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create project"
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, projectData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/api/v1/projects/${projectId}`, projectData, {
        withCredentials: true,
      });
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update project"
      );
    }
  }
);

const initialState = {
  projects: [],
  loading: false,
  error: null,
  loaded: false,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearProjects: (state) => {
      state.projects = [];
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.loaded = true;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          // Verify structure returned from backend
          // The response usually wraps the project, let's normalize it if needed.
          const newProject = action.payload.project ? action.payload : { project: action.payload, role: "owner" };
          state.projects.push(newProject);
        }
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const updated = action.payload.project ? action.payload : { project: action.payload, role: "admin" };
          const index = state.projects.findIndex(p => {
            const currentId = p.project?._id || p._id;
            const updatedId = updated.project?._id || updated._id;
            return currentId === updatedId;
          });
          if (index !== -1) {
            state.projects[index] = updated;
          }
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjects } = projectSlice.actions;
export default projectSlice.reducer;
