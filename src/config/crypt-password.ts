import * as bcrypt from 'bcrypt'
import { createHash } from 'crypto';

export class CryptPassword {

    static async hash(password: string) {
        return createHash('sha256').update(password).digest('hex')
    }
}