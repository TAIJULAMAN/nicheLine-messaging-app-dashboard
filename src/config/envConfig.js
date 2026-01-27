export const imgUrl = import.meta.env.VITE_IMG_URL || "http://13.61.60.192:5000";
export const url = "/api/v1/";
// CRITICAL: This must be a relative path (e.g., "/api/v1/") to use the Vercel proxy.
// If this is an absolute URL (http://...), it will cause Mixed Content errors on Vercel.
export const getBaseUrl = () => url;

