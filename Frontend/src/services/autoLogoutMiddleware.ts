import type { Middleware } from '@reduxjs/toolkit';
import { logout } from './authSlice';

export const autoLogoutMiddleware: Middleware = (store) => (next) => (action) => {
    try {
        if (action.type === 'auth/loginSuccess') {
            console.log("autoLogoutMiddleware: ", action);
            const { expiresAt } = action.payload;
            const expiryDate = new Date(expiresAt).getTime();
            const now = Date.now();
            const timeUntilExpiry = expiryDate - now;

            if ((store as any).expiryTimeout) {
                console.log("expiryTimeout:", (store as any).expiryTimeout);
                
                clearTimeout((store as any).expiryTimeout);
            }

            if (timeUntilExpiry > 0) {
                const timeoutId = setTimeout(() => {
                    store.dispatch(logout());
                }, timeUntilExpiry);
                console.log("new expiryTimeoutId: ", timeoutId);
                
                // Optional: attach to store (or use separate state)
                (store as any).expiryTimeout = timeoutId;
            } else {
                // Token already expired
                store.dispatch(logout());
            }
        }

        return next(action);
    } catch (error) {
        console.log("autoLogoutMiddleware Exception: ", error);
    }
};