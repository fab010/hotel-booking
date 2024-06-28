const SessionStorage = {
    save: (name: string, value: any) => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem(name, JSON.stringify(value));
        }

    },
    get: (name: string) => {
        if (typeof window === "undefined") return null;
        const value = sessionStorage.getItem(name);
        if (!value) return null;
        return JSON.parse(value);
    },
    remove: (name: string) => {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem(name);
        }
    },
};

export default SessionStorage;

