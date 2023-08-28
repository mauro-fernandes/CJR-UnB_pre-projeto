import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

console.log('Hello World!!!');

let a = 1;
a = 2;
console.log(a);

let b: number = 1;
b = 2;
console.log(b);

const c = (name: any) => {
  console.log(`Hello World!!! ${name}`);
};

c('People');

function d(name: any) {
  console.log(`Hello ${name} World!!!`);
}
d('People');
