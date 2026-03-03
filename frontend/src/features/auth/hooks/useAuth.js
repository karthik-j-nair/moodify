import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login, getMe, logout } from "../services/auth.api";

export function useAuth() {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;

    async function handleRegister({ username, email, password }) {
        setLoading(true);
        const data = await register({ username, email, password });
        setUser(data.user);
        setLoading(false);
    }

    async function handleLogin({ username, email, password }) {
        setLoading(true);
        const data = await login({ username, email, password });
        setUser(data.user);
        setLoading(false);
    }

    async function handleGetMe() {
        const data = await getMe();
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogout() {
        setLoading(true)
        await logout()
        setUser(null)
        setLoading(false)
    }

    useEffect(() => {
        handleGetMe();
    }, []);

    return (
        { user, loading, handleRegister, handleLogin, handleGetMe, handleLogout }
    )
}