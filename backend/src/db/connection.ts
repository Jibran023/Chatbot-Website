import { connect, disconnect} from 'mongoose'

async function ConnectToDatabase() {

    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
        throw new Error("Could not connect to Database")
    }
}

async function disconnectfromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error)
        throw new Error("Could not disconnect from Database")
    }
}

export {ConnectToDatabase, disconnectfromDatabase}