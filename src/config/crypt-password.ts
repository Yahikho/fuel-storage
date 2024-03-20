import * as bcrypt from 'bcrypt'

export class CryptPassword {

    static async hash(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds)
    }
}