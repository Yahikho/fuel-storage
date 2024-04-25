import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { AuthModule } from "../../src/auth/auth.module";
import * as request from 'supertest';

describe('singin', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AuthModule]
        }).compile()

        app = moduleRef.createNestApplication()
        await app.init()
    })

    it('/auth/signin (POST)', async () => {
        return request(app.getHttpServer())
            .post('/api-fuel-storage/auth/signin')
            .send('value=yahiko')
            .send('password=Lacapilla2019*')
            .expect(200)
    })
})