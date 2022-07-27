export interface URIOption {
    protocol: 'redis' | 'mongo';
    username?: string;
    password?: string | undefined;
    host: string;
    port?: string | undefined;
    database?: string | undefined;
}

export const getURI = (option: URIOption) => {
    const {protocol, username, password, host, port, database} = option;
    return `${protocol}://${username || ""}${password ? `:${password}@` : ""}${host}${port ? `:${port}`: ""}${database ? `:${database}`: ""}`;
}