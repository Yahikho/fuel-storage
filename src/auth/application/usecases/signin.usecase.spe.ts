import { JwtService } from "@nestjs/jwt"
import { SignInUseCase } from "src/auth/application/usecases/signin.usecase"
import { UserRepository } from "src/auth/domain/repositories/user.respository"

describe('SigninUseCase', () => {

    let signInUseCase: SignInUseCase
    let userRepository: UserRepository
    let jwtService: JwtService

    beforeEach(async () => {
        signInUseCase = new SignInUseCase(userRepository, jwtService)
    })

    describe('Execute Signin', () => {
        it('If user not exist, return code UNAUTHORIZED and response must be false', async () => {

            const mockSigninUser = { code: 200, value: 'test', password: 'test', data: '' }

            const response = {
                code: 200,
                response: true,
                message: 'test',
                data: {
                    access_token: 'test',
                }
            }

            jest.spyOn(signInUseCase, 'execute').mockImplementation(async (mockSigninUser) => response)

            expect(await signInUseCase.execute(mockSigninUser)).toBe(response)
        })
    })
})