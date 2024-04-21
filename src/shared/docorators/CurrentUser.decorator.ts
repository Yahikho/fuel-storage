import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUserDecorator = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        if (context.getType() === 'http') {
            return context.switchToHttp().getRequest().user
        }
    }
)