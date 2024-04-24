import { UserVerified } from "./user-verified.service"

describe('userVerifiedService', () => {
    const user = {
        id: 1,
        user_name: 'test',
        email: 'test@test.com',
        password: '123456',
        avatar: '',
        verified: 0,
        created_at: new Date,
        updated_at: new Date,
    }
    it('Should return false if value verified is 0', () => {
        const v = UserVerified.execute(user)
        expect(v).toBe(false)
    })
})