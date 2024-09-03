import { create } from "zustand";
import axios from "axios";

const useRecipientStore = create((set, get) => ({
    user: null,
    token: localStorage.getItem("token") || null,
    recipients: [],
    weddings: [],
    sounds: [],
    thems: [],
    galeries: [],
    cards: [],
    responses: [],
    errorMessage: '',

    setErrorMessage: (message) => set({ errorMessage: message }),

    register: async(userData, navigate, setError) => {
        try {
            const response = await axios.post(
                "https://api-invitation.xyz/api/auth/register",
                userData
            );
            const data = response.data;
            set({ user: data.data });
            localStorage.setItem("token", data.token);
            console.log("ini register", data.message); // Menampilkan pesan sukses

            if (data.message === "Password is too weak") {
                set({ errorMessage: "Password is too weak" });
            } else
            // if (data.message === "User successfully registered")
            {
                // set({ errorMessage: '' });
                set({ errorMessage: "Login success" });
                navigate("/login")

            }

        } catch (error) {
            console.error("Registration error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                set({ errorMessage: error.response.data.message }); // Mengambil pesan error dari response
                setError(error.response.data.message);
            } else {
                set({ errorMessage: "Registration failed. Please try again." }); // Pesan default jika tidak ada pesan error dari response
            }
        }
    },
    login: async(credentials, navigate, setError) => {
        try {
            const response = await axios.post(
                "https://api-invitation.xyz/api/auth/login",
                credentials
            );
            const data = response.data;
            set({ user: data.data.data });
            localStorage.setItem("token", data.data.token);

            console.log("user", data.data.data)
            navigate("/");
            window.location.reload();

        } catch (error) {
            console.error("Login error:", error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError("Login failed. Please try again.");
            }
        }
    },

    logout: () => {
        set({ user: null });
        localStorage.removeItem("token");
        // window.location.reload();
    },


    fetchUser: async() => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch wedding.");
                return;
            }

            const response = await axios.get("https://api-invitation.xyz/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ user: response.data.data });
        } catch (error) {
            console.error("Fetch wedding error:", error);
        }
    },
    fetchUserById: async(id) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch product.");
                return;
            }

            const response = await axios.get(`https://api-invitation.xyz/api/users/${id}`

            );
            return response.data.data;
        } catch (error) {
            console.error("Fetch product error:", error);
        }
    },

    updateUser: async(id, userData) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to update user.");
                return;
            }

            // Pastikan ID valid dan digunakan sebagai bagian dari URL
            const response = await axios.put(`https://api-invitation.xyz/api/users/${id}`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("user updated successfully:", response.data);

            // Jika Anda ingin memperbarui state setelah update
            get().fetchUser();
        } catch (error) {
            console.error("Update user error:", error);
        }
    },

    fetchRecipient: async() => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch products.");
                return;
            }

            const response = await axios.get("https://api-invitation.xyz/api/recipients", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ recipients: response.data.data });
            console.log("Fetched products successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch products error:", error);
        }
    },

    fetchRecipientById: async(id) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch product.");
                return;
            }

            const response = await axios.get(`https://api-invitation.xyz/api/recipients/${id}`

            );
            return response.data.data;
        } catch (error) {
            console.error("Fetch product error:", error);
        }
    },

    addRecipient: async(recipientData) => {
        const token = get().token; // Dapatkan token dari state store

        if (!token) {
            throw new Error("No token available");
        }

        try {
            const response = await axios.post("https://api-invitation.xyz/api/recipients", recipientData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            set((state) => ({
                recipients: [...state.recipients, response.data.data],
            }));
            console.log("recipient added successfully:", response.data.data);
        } catch (error) {
            console.error("Add recipient error:", error);
            throw error; // Re-throw the error to handle it in the component
        }
    },

    updateRecipient: async(id, recipientData) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to update product.");
                return;
            }

            const response = await axios.put(`https://api-invitation.xyz/api/recipients/${id}`, recipientData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("Recipient updated successfully:", response.data);
            // Optionally, refetch the products to update the state
            get().fetchrecipients();
        } catch (error) {
            console.error("Update recipient error:", error);
        }
    },
    updateRecipientStatus: async(id, recipientStatusData) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to update product.");
                return;
            }

            const response = await axios.put(`https://api-invitation.xyz/api/recipients/${id}/status`, recipientStatusData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("Recipient updated successfully:", response.data);
            // Optionally, refetch the products to update the state
            get().fetchRecipients();
        } catch (error) {
            console.error("Update recipient error:", error);
        }
    },


    deleteRecipient: async(recipientId) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to delete recipient.");
                return;
            }

            const response = await axios.delete(`https://api-invitation.xyz/api/recipients/${recipientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("recipient deleted successfully:", response.data);

            // Optionally, refetch the recipients to update the state
            get().fetchRecipient();
        } catch (error) {
            console.error("Delete recipient error:", error);
        }
    },


    fetchWedding: async() => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch wedding.");
                return;
            }

            const response = await axios.get("https://api-invitation.xyz/api/weddings", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ weddings: response.data.data });
        } catch (error) {
            console.error("Fetch wedding error:", error);
        }
    },

    addWedding: async(weddingData) => {
        const token = get().token; // Dapatkan token dari state store

        if (!token) {
            throw new Error("No token available");
        }

        try {
            const response = await axios.post("https://api-invitation.xyz/api/weddings", weddingData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            set((state) => ({
                weddings: [...state.weddings, response.data.data],
            }));
            console.log("wedding added successfully:", response.data.data);
        } catch (error) {
            console.error("Add wedding error:", error);
            throw error; // Re-throw the error to handle it in the component
        }
    },

    updateWedding: async(id, weddingData) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to update wedding.");
                return;
            }

            // Pastikan ID valid dan digunakan sebagai bagian dari URL
            const response = await axios.put(`https://api-invitation.xyz/api/weddings/${id}`, weddingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Wedding updated successfully:", response.data);

            // Jika Anda ingin memperbarui state setelah update
            get().fetchWedding();
        } catch (error) {
            console.error("Update wedding error:", error);
        }
    },

    fetchSound: async() => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch sound.");
                return;
            }

            const response = await axios.get("https://api-invitation.xyz/api/sounds", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ sounds: response.data.data });
        } catch (error) {
            console.error("Fetch sound error:", error);
        }
    },

    addSound: async(soundData) => {
        const token = get().token; // Dapatkan token dari state store

        if (!token) {
            throw new Error("No token available");
        }

        try {
            const response = await axios.post("https://api-invitation.xyz/api/sounds", soundData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            set((state) => ({
                sounds: [...state.sounds, response.data.data],
            }));
            console.log("sound added successfully:", response.data.data);
        } catch (error) {
            console.error("Add sound error:", error);
            throw error; // Re-throw the error to handle it in the component
        }
    },
    fetchThem: async() => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch sound.");
                return;
            }

            const response = await axios.get("https://api-invitation.xyz/api/thems", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ thems: response.data.data });
        } catch (error) {
            console.error("Fetch sound error:", error);
        }
    },

    addThem: async(themData) => {
        const token = get().token; // Dapatkan token dari state store

        if (!token) {
            throw new Error("No token available");
        }

        try {
            const response = await axios.post("https://api-invitation.xyz/api/thems", themData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            set((state) => ({
                thems: [...state.thems, response.data.data],
            }));
            console.log("them added successfully:", response.data.data);
        } catch (error) {
            console.error("Add them error:", error);
            throw error; // Re-throw the error to handle it in the component
        }
    },

    fetchGaleri: async() => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch sound.");
                return;
            }

            const response = await axios.get("https://api-invitation.xyz/api/galeries", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ galeries: response.data.data });
        } catch (error) {
            console.error("Fetch sound error:", error);
        }
    },

    addGaleri: async(galeriData) => {
        const token = get().token; // Dapatkan token dari state store

        if (!token) {
            throw new Error("No token available");
        }

        try {
            const response = await axios.post("https://api-invitation.xyz/api/galeries", galeriData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            set((state) => ({
                galeries: [...state.galeries, response.data.data],
            }));
            console.log("galerie added successfully:", response.data.data);
        } catch (error) {
            console.error("Add galerie error:", error);
            throw error; // Re-throw the error to handle it in the component
        }
    },

    fetchCard: async() => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch cardpayment.");
                return;
            }

            const response = await axios.get("https://api-invitation.xyz/api/cardpayments", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ cards: response.data.data });
        } catch (error) {
            console.error("Fetch cardpayment error:", error);
        }
    },

    fetchCardById: async(id) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch product.");
                return;
            }

            const response = await axios.get(`https://api-invitation.xyz/api/cardpayments/${id}`

            );
            return response.data.data;
        } catch (error) {
            console.error("Fetch product error:", error);
        }
    },

    updateCard: async(id, cardData) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to update card.");
                return;
            }

            // Pastikan ID valid dan digunakan sebagai bagian dari URL
            const response = await axios.put(`https://api-invitation.xyz/api/cardpayments/${id}`, cardData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("card updated successfully:", response.data);

            // Jika Anda ingin memperbarui state setelah update
            get().fetchcard();
        } catch (error) {
            console.error("Update card error:", error);
        }
    },

    addCard: async(cardData) => {
        const token = get().token; // Dapatkan token dari state store

        if (!token) {
            throw new Error("No token available");
        }

        try {
            const response = await axios.post("https://api-invitation.xyz/api/cardpayments", cardData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            set((state) => ({
                cards: [...state.cards, response.data.data],
            }));
            console.log("card added successfully:", response.data.data);
        } catch (error) {
            console.error("Add card error:", error);
            throw error; // Re-throw the error to handle it in the component
        }
    },

}));

export default useRecipientStore;