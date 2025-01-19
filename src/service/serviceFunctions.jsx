import { URL } from '../config/config'


const ServiceFunctions = {

    // REGISTRATION AND AUTHENTICATION
    registerWithPremium: async (formData) => {
        try {
            const response = await fetch(URL + '/register-premium', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            alert('Registration successful with Premium!');
            window.location.href = '/sources';
        } catch (error) {
            alert(error.message);
        }
    },

    registerWithStandard: async (formData) => {
        try {
            const response = await fetch(URL + '/register-standard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            window.location.href = '/sources';
        } catch (error) {
            alert(error.message);
        }
    },

    upgradeToPremium: async (paymentDetails, token) => {
        try {
            const response = await fetch(URL + '/upgrade-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` + token,
                },
                body: JSON.stringify(paymentDetails),
            });

            if (!response.ok) {
                throw new Error('Upgrade failed');
            }

            const data = await response.json();
            alert('Successfully upgraded to Premium!');
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    },


    // CATEGORIES CRUD
    createCategory: async (name, token) => {
        try {
            const response = await fetch(URL + '/categories/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error('Upgrade failed');
            }

            const data = await response.json();
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    },

    getCategories: async () => {
        try {
            const response = await fetch(URL + '/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    deleteCategory: async (id, token) => {
        try {
            const response = await fetch(URL + '/categories/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete');
            }

            const data = await response.json();
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    },

    // MANAGE USERS
    getUsers: async (token) => {
        try {
            const response = await fetch(URL + '/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    updateUser: async (id, formData, token) => {
        try {
            const response = await fetch(URL + '/user/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    deleteUser: async (id, token) => {
        try {
            const response = await fetch(URL + '/user/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            window.location.reload()
        } catch (error) {
            alert(error.message);
        }
    },


    // LOGS
    getLogs: async (token) => {
        try {
            const response = await fetch(URL + '/logs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    deleteLog: async (id, token) => {
        try {
            const response = await fetch(URL + '/logs/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            window.location.reload()
            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    deleteAllLogs: async (token) => {
        try {
            const response = await fetch(URL + '/logs/delete-all', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            window.location.reload()
            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    // SUBSCRIPTION




    // CONTENT CRUD
    createContent: async (formData, token) => {
        try {
            const response = await fetch(URL + '/content/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    getLikedContent: async (user_id) => {
        try {
            const response = await fetch(URL + '/content/liked/' + user_id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    getLikedByCategory: async (user_id, category) => {
        try {
            const response = await fetch(URL + '/content/liked-categories/' + user_id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category })
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    getAllContent: async () => {
        try {
            const response = await fetch(URL + '/content', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    getContent: async (id) => {
        try {
            const response = await fetch(URL + '/content/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    getMediaContent: async () => {
        try {
            const response = await fetch(URL + '/content/media/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    deleteContent: async (id, token) => {
        try {
            const response = await fetch(URL + '/content/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            window.location.reload()
            // return data
        } catch (error) {
            alert(error.message);
        }
    },

    getContentByCategory: async (category) => {
        try {
            const response = await fetch(URL + '/content/categories/' + category, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    getMediaByCategory: async (category) => {
        try {
            const response = await fetch(URL + '/content/media/category/' + category, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    updateContent: async (id, formData) => {
        try {
            const response = await fetch(URL + '/content/update/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },


    // USER ACTIONS
    getLike: async (content_id, user_id) => {
        try {
            const response = await fetch(URL + '/likes/' + content_id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id })
            });

            if (!response.ok) {
                // throw new Error('Failed');
                return null
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },


    likeContent: async (formData) => {
        try {
            const response = await fetch(URL + '/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    viewContent: async (formData) => {
        try {
            const response = await fetch(URL + '/views', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

    dislikeContent: async (uId, cId) => {
        try {
            const response = await fetch(URL + '/likes/dislike/' + cId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: uId })
            });

            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            return data
        } catch (error) {
            alert(error.message);
        }
    },

}

export default ServiceFunctions