'use server'
import { users } from "@/lib/appwrite.config"
import { ID, Query } from "node-appwrite"

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);


        return (newUser)
    } catch (error: any) {
        if (error && error?.code === 409) {
            console.log(error)
            const documents = await users.list([
                Query.equal('email', [user.email])
            ]);

            return documents?.users[0]
        }
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return user
    } catch (error) {
        console.error(error)
    }
}

export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {

    try {
        let fille;

        
    } catch (error) {
        console.log(error);
    }
}