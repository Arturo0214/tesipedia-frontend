import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createProject,
  getProject,
  updateProject,
  addCommentToProject,
  deleteProject,
  getAllProjects,
} from './projectService';

const initialState = {
  project: null,
  projects: [],
  error: null,
  loading: false,
};

export const createProjectAsync = createAsyncThunk('project/createProject', async (projectData, { getState, rejectWithValue }) => {
  try {
    const { auth, payment } = getState();
    const token = auth.token;

    if (!token) {
      throw new Error('Debes iniciar sesión para crear un proyecto');
    }

    // Aquí puedes realizar la validación para verificar si el usuario tiene un pago asociado
    const userId = auth.user?._id; // Utiliza ? para manejar casos en los que auth.user pueda ser nulo
    const userPayments = payment.userPayments[userId] || [];

    if (userPayments.length === 0) {
      throw new Error('El usuario no tiene un pago asociado');
    }

    const newProject = await createProject(projectData, token);
    return newProject;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

// Define una acción asincrónica para obtener un proyecto por ID
export const getProjectAsync = createAsyncThunk('project/getProject', async (projectId, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const token = auth.token;
    const response = await getProject(projectId, token);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

// Define una acción asincrónica para actualizar un proyecto por ID
export const updateProjectAsync = createAsyncThunk('project/updateProject', async ({ projectId, projectData }, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();

    if (!auth.token) {
      throw new Error('Debes iniciar sesión para actualizar un proyecto');
    }

    if (!auth.isAdmin) {
      throw new Error('Acceso denegado. Solo los administradores pueden actualizar proyectos.');
    }

    const token = auth.token;
    const response = await updateProject(projectId, projectData, token);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

// Define una acción asincrónica para agregar un comentario a un proyecto por ID
export const addCommentToProjectAsync = createAsyncThunk(
  'project/addCommentToProject',
  async ({ projectId, comment, author }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;
      const response = await addCommentToProject(projectId, comment, author, token);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Define una acción asincrónica para eliminar un proyecto por ID (con validación de administrador)
export const deleteProjectAsync = createAsyncThunk('project/deleteProject', async (projectId, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const token = auth.token;

    if (!token) {
      throw new Error('Debes iniciar sesión para eliminar un proyecto');
    }

    if (!auth.isAdmin) {
      throw new Error('Acceso denegado. Solo los administradores pueden eliminar proyectos.');
    }

    const response = await deleteProject(projectId, token);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

export const getAllProjectsAsync = createAsyncThunk('project/getAllProjects', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const token = auth.token;

    if (!token) {
      throw new Error('Debes iniciar sesión para obtener todos los proyectos');
    }

    if (!auth.isAdmin) {
      throw new Error('Acceso denegado. Solo los administradores pueden obtener todos los proyectos.');
    }

    const response = await getAllProjects(token);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(createProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(getProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(updateProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCommentToProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommentToProjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(addCommentToProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProjectAsync.fulfilled, (state) => {
        state.loading = false;
        state.project = null;
      })
      .addCase(deleteProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProjectsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjectsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getAllProjectsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
