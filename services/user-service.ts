// Service to create a user
export const createUser = async (userData: any) => {
     const response = await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.JWT_SECRET}`,
      },
      body: JSON.stringify(userData),
    });
    return response.json();
};

// Service to login a user
export const loginUser = async (email: string, password: string) => {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.JWT_SECRET}`,
        },
        body: JSON.stringify({email: email, password: password}),
    });
    return response.json();
};

// Service to get all users
export const getUsers = async () => {
    const response = await fetch('/api/user/getUsers', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.JWT_SECRET}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

// Service to get a user by ID
// export const getUserById = async (userId) => {
//     const response = await fetch(`${API_BASE_URL}/getUserById/${userId}`);
//     return response.json();
// };

// Service to update a user
export const updateUser = async (userData: any) => {
    const response = await fetch(`/api/user/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.JWT_SECRET}`,
        },
        body: JSON.stringify(userData),
    });
    return response.json();
};

// Service to delete a user
export const deleteUser = async (userId: any) => {
    const response = await fetch(`/api/user/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.JWT_SECRET}`,
        },
        body: JSON.stringify({ id: userId }), // Send the user ID in the request body
    });
    return response.json();
};
