import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma.service';

export interface AuthType {
  role: 'Citizen' | 'Technician' | 'Manager' | 'Admin';
}

const Roles = ['Citizen', 'Technician', 'Manager', 'Admin'];

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AuthType[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const user = req.cookies['userID'];
    let auth: any;

    if (user) {
      auth = await this.prisma.user.findUnique({
        where: { id: user },
        select: { authId: true },
      });

      auth = Roles[auth.authId];
    }

    return !!roles.includes(auth);
  }
}
