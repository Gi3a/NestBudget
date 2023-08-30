import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common"
import { map } from "rxjs";

// interceptor - middleware, prelogical thing that operates with data before it will stack in endpoint
// query > interceptor(middleware) > controller
export class CustomInterceptor implements NestInterceptor {

    intercept(
        context: ExecutionContext,
        handler: CallHandler
    ) {

        // request
        console.log('before that request');
        console.log({ context });
        return handler.handle().pipe(
            map((data) => {
                // response
                console.log('inside in pipe, response');
                console.log({ data })
                const response = {
                    ...data,
                    createdAt: data.created_at
                }
                delete response.updated_at;
                delete response.created_at;
                return response;
            })
        );
    }
}