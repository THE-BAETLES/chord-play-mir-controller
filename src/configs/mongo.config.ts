export type MongoConfigType = {
    endpoint: string;
    user: string;
    password: string;
    port: string;
    database: string;
}


export const MongoConfig: MongoConfigType = {
        endpoint: process.env.MONGO_ENDPOINT,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        port:process.env.MONGO_PORT,
        database: process.env.MONGO_DATABASE
}