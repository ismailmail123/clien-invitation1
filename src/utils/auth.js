// utils/auth.js (atau file lain yang sesuai)
import { jwtDecode } from "jwt-decode";

const FromToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.id; // Sesuaikan dengan nama field di token
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

export default FromToken;