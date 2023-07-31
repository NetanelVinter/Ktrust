import { User } from "../models/user";
import * as noteApi from "./noteApi";

export async function getLoggedInUser() : Promise<User> {
    const response = await noteApi.fetchData("/api/user", {
        method: "GET"
    });
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User>
{
    const response = await noteApi.fetchData("api/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    return response.json();
}

export interface LoginCredentials {
    username: string,    
    password: string
}

export async function login(credentials: LoginCredentials): Promise<User>
{
    const response = await noteApi.fetchData("api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    return response.json();
}

export async function logout() {
    await noteApi.fetchData("/api/user/logout", {method: "POST"})
}



