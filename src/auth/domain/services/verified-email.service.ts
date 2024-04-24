import { EmailVerifiedModel } from "../models/email-verified.model";

export class VerifiedEmailService {

    static execute(emailVerified: EmailVerifiedModel) {
        if (emailVerified) {
            const crateAtDate = new Date(emailVerified.created_at.setHours(emailVerified.created_at.getHours() - 5))
            const now = new Date()
            const dateFormat = new Date(now.setHours(now.getHours() - 5))
            const lastHour = new Date(emailVerified.created_at.setHours(emailVerified.created_at.getHours() + 2))

            if (dateFormat >= crateAtDate && dateFormat <= lastHour) {
                return true
            }
            return false
        }

        return false
    }
}