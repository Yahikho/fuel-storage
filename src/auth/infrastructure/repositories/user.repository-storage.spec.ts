import { Test } from "@nestjs/testing"
import { UserRepositoryStorage } from "./user.repository-storage"
import { getRepositoryToken } from "@nestjs/typeorm"
import { EntityManager } from "typeorm"

describe('UserRepositoryStorage', () => {

    let userRepositoryStorage: UserRepositoryStorage

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UserRepositoryStorage,
                {
                    provide: getRepositoryToken(UserRepositoryStorage),
                    useClass: UserRepositoryStorage
                },
                {
                    provide: EntityManager,
                    useValue: {
                        query: jest.fn()
                    }
                }
            ]
        }).compile()

        userRepositoryStorage = moduleRef.get<UserRepositoryStorage>(UserRepositoryStorage)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Should be defined', () => {
        expect(userRepositoryStorage).toBeDefined()
    })

    describe('findByUser', () => {
        it('Should return NULL if user not exist.', async () => {
            const respose = await userRepositoryStorage.findByUser({ value: '', password: '' })
            expect(respose).toBeNull()
        })
    })
})