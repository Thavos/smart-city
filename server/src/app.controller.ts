import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('logout')
  logout(@Req() req: Request): string {
    req.res.clearCookie('userID', { httpOnly: true });
    return 'Done';
  }

  @Get('test')
  test() {
    return this.prisma.user.findMany();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
