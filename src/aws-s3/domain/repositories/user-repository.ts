import { UserModel } from "../models/user.model";

export interface UserRepository{
    getUserById(id: number): Promise<UserModel | null>
}