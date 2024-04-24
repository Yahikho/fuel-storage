import { VerifiedEmailService } from "./verified-email.service"

describe('VerifiedEmailService', () => {

    const emailVerified = {
        id: 1,
        code: 1111,
        created_at: new Date('2022-02-04'),
        updated_at: null,
        user_id: 1,
    }

    it('Should return false if the validation date is not between both dates', () => {
        const res = VerifiedEmailService.execute(emailVerified)

        expect(res).toBe(false)
    })

})