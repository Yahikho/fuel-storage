import { ValidaUserService } from "./validaUser.service"

describe('ValidaUserSerive', () => {

    const validaUserService = new ValidaUserService()

    const userModel = {
        id: 1,
        user_name: 'test',
        email: 'test@test.com',
        password: '123456',
        avatar: '',
        verified: 0,
        created_at: new Date,
        updated_at: new Date,
    }

    const userInput = {
        value: 'test',
        password: 'test'
    }

    it('Should return null if passwords are not equals', () => {
        const res = validaUserService.validaUser(userModel, userInput)
        expect(res).toBeNull()
    })

    it('Should return UserModel if password are equals', () => {
        userModel.password = 'test'
        const res = validaUserService.validaUser(userModel, userInput)
        expect(res).toEqual(userModel)
    })
})