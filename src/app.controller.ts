/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';

@Controller('app')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notificaion.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const {recipientId, content, category} = body;

    await this.prisma.notificaion.create({
      data: {
        id: randomUUID(),
        content: content,
        category: category,
        recipientId: recipientId,
      },
    });
  }
}
