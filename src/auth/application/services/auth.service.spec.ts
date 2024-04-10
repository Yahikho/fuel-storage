import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { JwtService } from "@nestjs/jwt"
import { UserModel } from "src/auth/domain/models/user.model"
import { UserSiginModel } from "src/auth/domain/models/user-sigin.model"

describe('AuthService', () => {
    let authService: AuthService
    let jwtService: JwtService;

    const mockInpuModel: UserSiginModel = {
        value: 'test',
        password: 'test'
    }

    const mockUserModel: UserModel = {
        id: 1,
        user_name: 'test',
        email: 'test@test.com',
        password: 'test',
        avatar: 'https://test.test',
        verified: 1,
        created_at: new Date(),
        updated_at: new Date()
    }

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(() => 'mockedToken')
                    } 
                },
            ]
        }).compile()

        authService = moduleRef.get<AuthService>(AuthService);
        jwtService = moduleRef.get<JwtService>(JwtService)
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('validaUser', () => {
        it('should return null if creadential are invalid', async () => {

            const newUser = { ...mockInpuModel }
            newUser.password = '123456'
            const result = await authService.validaUser(mockUserModel, newUser)

            expect(result).toBeNull()
        })

        it('should return user if credentials are valid', async () => {

            const result = await authService.validaUser(mockUserModel, mockInpuModel)
            expect(result).toStrictEqual(mockUserModel)
        })
    })

    describe('signin', () => {
        it('should return access token', async () => {

            const expectedResult = { access_token: 'mockedToken' };

            const result = await authService.signin(mockUserModel);

            expect(result).toEqual(expectedResult);
            expect(jwtService.sign).toHaveBeenCalledWith({ username: 'test', sub: 1 });
        });
    })

})