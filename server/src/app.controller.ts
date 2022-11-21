import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('logout')
  logout(@Req() req: Request): string {
    req.res.clearCookie('userID', { httpOnly: true });
    return 'Done';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
