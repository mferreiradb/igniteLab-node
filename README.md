**IGNITE LAB NODEJS**

*DEPENDENCIAS*

- Prisma

                npm i prisma -D // INSTALAÇÃO DA CLI (DEPENDENCIA DE DESENVOLVIMENTO)

                npm i @prisma/client // INSTALAÇÃO DO CLIENTE PRISMA (DEPENDENCIA DE PRODUÇÃO)

                npx prisma init --datasource-provider SQLite // INSTALAÇÃO DO SQLITE PARA PRISMA

- NestJS

                $ npm i -g @nestjs/cli
                $ nest new project-name

*Microserviços*

- Mais de um banco de dados para partes da aplicação

- Aplicações menores que formam uma aplicação maior, de forma que a queda de uma dessas partes não afeta toda a aplicação

- Aceita duplicidade de dados entre os bancos

    - Todas as informações no Banco de Dados que deve assumir todos os dados e menos informações para os demais

- Comunicação

    - Um microserviço posta a mensagem e os microserviços interessados pegam e utilizam

*NestJS*

- Inversão de dependencias

    - Quando instanciado, o método não busca a dependencia em outro arquivo, esta porém é recebida como parametro

    - Uma classe recebe suas dependencias, geralmente através do método construtor

- Injeção de dependencias

    - Automatiza a inserção das dependencias no momento que as classes são instanciadas

- Estrutura de pastas

    - Dist

        - Pasta para compilação do projeto

    - Src

        - Pasta que recebe os arquivos do projeto
    
    - Test

        - Pasta com arquivos relacionados aos testes

    - Main.TS

        - Arquivo principal da aplicação

- Module

    - Acopla vários Controllers e vários Services

        - Ponto central para importar esses arquivos
    
    - Assume-se que a aplicação irá possuir vários modules

    - Assume-se a importação de modules dentro de outros

                //MODULE DE EXEMPLO
                import { Module } from '@nestjs/common';

                @Module({
                imports: [],
                })
                export class HttpModule {}
                //
                //MODULE IMPORTANDO O MODULE DE EXEMPLO
                import { Module } from '@nestjs/common';
                import { AppController } from './app.controller';
                import { AppService } from './app.service';
                import { HttpModule } from './mail/app.module';

                @Module({
                imports: [HttpModule],
                controllers: [AppController],
                providers: [AppService],
                })
                export class AppModule {}

- Controllers

    - Arquivos que lidam com chamadas HTTP

    - Armazenam a lógica das rotas

- Services(provider)

    - Classes sem um propósito específico

    - O que não for um controller ou um import(module), será um service(provider)

    - Classe genérica

- Rotas

    - Contidas em app.controller.ts

                import { Controller, Get } from '@nestjs/common';
                import { AppService } from './app.service';

                @Controller('app')
                export class AppController {
                constructor(private readonly appService: AppService) {}

                @Get('/hello')
                getHello(): string {
                    return this.appService.getHello();
                    }
                }

    - O verno http utilizaro é determinado na chamado do Decorator. Este decorator pode receber um valor, que será a sua rota

    - Podemos definir um prefixo para as rotas, passando um valor para o decorator Controller, de forma que as rotas só poderão ser acessadas se possuírem este prefixo

        - Neste caso, só poderemos acessar a rota hello se digitarmos http://localhost:3000/app/hello


*PRISMA*

- ORM

- Estrutura de pastas com SQLite

    - Prisma>shcema.prisma

        - Definição das tabelas do Banco de Dados

    - .env

        - URL do Banco de Dados
        
        - É uma variável de ambiente

- Definição de tabela

    - Define-se as tabelas utilizando a palavra reservada model e após ela define-se o nome da tabela. Dentro de chaves, definimos os campos e suas constraints

    - @id define que o campo id será uma PK
    - ? define que o campo pode ser null
    - @@index() define um indice de referencia para a tabela

        - Parecido com FK

- CRIAÇÃO DAS TABELAS        

      - npx prisma migrate dev

- ABRE NO NAVEGADOR UMA INTERFACE PARA VISUALIZAÇÃO DO BANCO DE DADOS
    
      - npx prisma studio

*Validação de dados*

- Necessária a configuração para que o neste realize as validações em main.ys

        app.useGlobalPipes(new ValidationPipe());

- Cria-se uma nova classe

- Usa-se dois pacotes para realizar a validação

                import { ValidationPipe } from '@nestjs/common';                
                npm i class-validator class-transformer

- Atribui-se a classe validadora aos dados recebidos na API
    
    - Para verificar se um dado está vazio, utiliza-se o decorator @IsNotEmpty() do pacote 'class-validator'

    - Para verificar se um dado é um UUID, utiliza-se o decorator @IsUUID() do pacote 'class-validator'
    
    - Para validar o tamanho um dado é, utiliza-se o decorator @Length() do pacote 'class-validator'. Este decorator possui dois parametor, o primeiro é o tamanho minimo e o segundo é o tamanho máximo
