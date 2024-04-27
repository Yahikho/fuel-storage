import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from 'supertest';
import { Response } from 'supertest';
import { AppModule } from "../../src/app.module"

describe('/auth/singup (POST)', () => {
    let app: INestApplication
    let httpServer: any
    let response: Response

    beforeAll(async () => {

        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()
        await app.init()

        httpServer = app.getHttpServer()
    })


    beforeAll(async () => {
        response = await request(httpServer).post('/auth/signup')
            .send('user_name=yahiko')
            .send('email=yahiko@pro.co')
            .send('avatar=null')
            .send('password=Lacapilla2019*')
    })

    it('If user exist', async () => {
        expect(response.status).toBe(200)
    })

    afterAll(async () => {
        await app.close()
    })
})