import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/database/prisma.service';

export interface AuthType {
  role: 'Citizen' | 'Technician' | 'Manager' | 'Admin';
}

enum AuthIdRole {
  'Citizen',
  'Technician',
  'Manager',
  'Admin',
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<AuthType[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.cookies['UserID'];
    let auth: any;

    if (user) {
      auth = this.prisma.user.findUnique({
        where: { id: user },
        select: { authId: true },
      });

      auth = AuthIdRole[auth];
    }

    return !!roles.find(auth);
  }
}
