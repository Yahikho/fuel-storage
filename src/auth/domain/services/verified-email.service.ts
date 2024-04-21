import { EmailVerifiedModel } from "../models/email-verified.model";

export class VerifiedEmailService {

    static execute(emailVerified: EmailVerifiedModel) {
        if (emailVerified) {
            console.log(emailVerified)
            const crateAtDate = new Date(emailVerified.created_at)
            const now = new Date()
            const firstHour = new Date(crateAtDate.setHours(crateAtDate.getHours() - 2))
            const nowDateFormat = new Date(now.setHours(now.getHours() - 5))

            console.log(firstHour)
            console.log(emailVerified.created_at)
           // console.log(nowDateFormat)

            if (nowDateFormat >= firstHour && nowDateFormat <= emailVerified.created_at) {
                return true
            }
            return false
        }

        return false
    }
}