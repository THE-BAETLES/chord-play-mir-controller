import * as mongoose from "mongoose"

export const mongoenv = {
    endpoint: process.env.MONGO_ENDPOINT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    port:process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE
}

export const MongoDBProvider = [{
    provide: 'MONGO_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => 
        mongoose.connect(`mongodb://${mongoenv.user}/${mongoenv.password}@${mongoenv.endpoint}:${mongoenv.port}/${mongoenv.database}`)
}]

