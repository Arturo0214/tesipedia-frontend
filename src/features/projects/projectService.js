import axios from 'axios';

const API_URL = 'http://localhost:8000/projects';

export const createProject = async (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.post(API_URL, projectData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/${projectId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateProject = async (projectId, projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.put(`${API_URL}/${projectId}`, projectData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const addCommentToProject = async (projectId, comment, author, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const project = await Project.findById(projectId, config);

    if (!project) {
      throw new Error('Proyecto no encontrado');
    }
    // Agregar el comentario al proyecto
    project.comments.push({ text: comment, author });
    await project.save();

    return project;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }

  try {
    const project = await Project.findById(projectId, config);

    if (!project) {
      throw new Error('Proyecto no encontrado');
    }

    await project.remove();
  } catch (error) {
    throw error;
  }
};

export const getAllProjects = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const projects = await Project.find(config);
    return projects;
  } catch (error) {
    throw error;
  }
};
