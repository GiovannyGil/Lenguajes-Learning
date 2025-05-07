import API from "../../../api/axios";

export async function getTasks(): Promise<any> {
    try {
        const response = await API.get("/tasks");
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Error fetching tasks");
    }
}

export async function getTaskById(id: number): Promise<any> {
    try {
        const response = await API.get(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching task:", error);
        throw new Error("Error fetching task");
    }
}

export async function createTask(task: any): Promise<any> {
    try {
        const response = await API.post("/tasks", task);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw new Error("Error creating task");
    }
}

export async function updateTask(id: number, task: any): Promise<any> {
    try {
        const response = await API.patch(`/tasks/${id}`, task);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Error updating task");
    }
}

export async function deleteTask(id: number): Promise<any> {
    try {
        const response = await API.delete(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Error deleting task");
    }
}