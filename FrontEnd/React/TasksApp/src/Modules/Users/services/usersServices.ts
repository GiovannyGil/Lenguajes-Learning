import API from "../../../api/axios";

export async function getUsers(): Promise<any> {
    try {
        const response = await API.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
    }
}

export async function getUserById(id: number): Promise<any> {
    try {
        const response = await API.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Error fetching user");
    }
}


export async function createUser(user: any): Promise<any> {
    try {
        const response = await API.post("/users", user);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Error creating user");
    }
}

export async function updateUser(id: number, user: any): Promise<any> {
    try {
        const response = await API.patch(`/users/${id}`, user);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Error updating user");
    }
}

export async function deleteUser(id: number): Promise<any> {
    try {
        const response = await API.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Error deleting user");
    }
}