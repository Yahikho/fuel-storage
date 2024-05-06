import { Test } from "@nestjs/testing"
import { UserRepositoryStorage } from "./user.repository-storage"
import { getRepositoryToken } from "@nestjs/typeorm"
import { EntityManager } from "typeorm"
import { UserModel } from "src/auth/domain/models/user.model"

describe('UserRepositoryStorage', () => {

    let userRepositoryStorage: UserRepositoryStorage
    let entityManager: Partial<EntityManager>;

    beforeAll(async () => {

        entityManager = {
            query: jest.fn(),
        }

        const moduleRef = await Test.createTestingModule({
            providers: [
                UserRepositoryStorage,
                {
                    provide: EntityManager,
                    useValue: entityManager
                },
            ]
        }).compile()

        userRepositoryStorage = moduleRef.get<UserRepositoryStorage>(UserRepositoryStorage)
    })

    it('Should be defined', () => {
        expect(userRepositoryStorage).toBeDefined()
    })

    describe('findByUser', () => {
        it('should return user when findByUser is called.', async () => {
            const mockUser: UserModel = {
                id: 1,
                user_name: 'testuser',
                email: 'testuser@testuser.co',
                avatar: '',
                verified: 0,
                created_at: new Date(),
                updated_at: new Date,
                password: 'testpass',

            }

            entityManager.query = jest.fn().mockResolvedValueOnce([mockUser]);

            const userSignIn: { value: string, password: string } = { value: 'testuser', password: 'testpass' };
            const result = await userRepositoryStorage.findByUser(userSignIn);

            expect(result).toEqual(mockUser);

        })

        it('Should return null if user not exist', async() => {

            entityManager.query = jest.fn().mockResolvedValueOnce(null);

            const userSignIn: { value: string, password: string } = { value: 'testuser', password: 'testpass' };
            const result = await userRepositoryStorage.findByUser(userSignIn);

            expect(result).toBeNull()
        })
    })
})