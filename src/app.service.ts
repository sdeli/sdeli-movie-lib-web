import { Header, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @Header('content-type', 'text/plain')
  getHello(): any {
    console.log('sannya');
    return { sanya: 'Hello World!' };
  }
}
