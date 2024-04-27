import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from 'supertest';
import { Response } from 'supertest';
import { AppModule } from "../../src/app.module";

interface BodyRes {
    response: boolean
    message: string
    data:[
        access_token: string
    ]
}

describe('/singin (POST)', () => {
    let app: INestApplication
    let httpServer: any
    let response: Response
    let body: BodyRes

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()
        await app.init()

        httpServer = app.getHttpServer()
    })


    beforeAll(async () => {
        response = await request(httpServer).post('/auth/signin')
            .send('value=yahiko')
            .send('password=Lacapilla2019*')

        body = response.body
        
    })

    it('Should return status code 200.', async () => {
        expect(response.status).toBe(200)
    })

    it('Should return access_token string.', async () => {
        expect(typeof body.message).toBe('string')
    })

    afterAll(async () => {
        await app.close()
    })
})