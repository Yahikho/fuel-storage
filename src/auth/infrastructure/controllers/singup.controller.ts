import { Controller } from "@nestjs/common";
import { SignUpUseCase } from "src/auth/application/usecases/signup.usecase";

@Controller()
export class Singup {

    constructor(private readonly signUpUseCase: SignUpUseCase) { }
    
    async 
}