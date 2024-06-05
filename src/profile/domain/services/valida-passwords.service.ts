import { CryptPassword } from "../../../shared/config/crypt-password";

export class ValidaPasswordsService {

    private errors: Array<string> = []

    constructor(
        private readonly oldPasswordDB: string,
        private readonly oldPassword: string,
        private readonly newPassword: string,
        private readonly confirmPassword: string
    ) { }

    async execute() {
        this.validaOldPassword()
        this.validaEqualsOldPassword()
        this.validaConfirmPassword()

        return this.errors
    }

    private async validaOldPassword() {
        if (this.oldPasswordDB !== await CryptPassword.hash(this.oldPassword)) {
            this.errors.push('Password registered in DB are not equals to password given.')
        }
    }

    private async validaEqualsOldPassword() {
        if (this.oldPasswordDB === await CryptPassword.hash(this.newPassword)) {
            this.errors.push('Password given not must be equals to old password db.')
        }
    }

    private async validaConfirmPassword() {
        if (this.confirmPassword !== this.newPassword) {
            this.errors.push('Confirm password are not equal to new password.')
        }
    }
}