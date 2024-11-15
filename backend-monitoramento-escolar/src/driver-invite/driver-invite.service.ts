import { PrismaService } from '@backend/prisma/prisma.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { InviteDriverDto } from './dto/InviteDriverDto';

@Injectable()
export class DriverInviteService {
  private readonly logger = new Logger(DriverInviteService.name);

  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  public async inviteDriverByEmail(
    user: User,
    driverId: string,
    childId: number,
  ) {
    // get userParent by id
    const userParent = await this.prismaService.parent.findFirst({
      where: {
        userId: user.id,
      },
    });
    this.logger.debug(`userParent: ${JSON.stringify(userParent)}`);
    if (!userParent) {
      this.logger.error(`User not found`);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // get driver by email
    const driverUser = await this.prismaService.user.findFirst({
      where: {
        email: driverId,
        type: 'driver',
      },
      select: {
        driver: true,
      },
    });
    this.logger.debug(`driver: ${JSON.stringify(driverUser)}`);

    if (!driverUser || !driverUser.driver) {
      this.logger.error(`Driver not found`);
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }

    this.logger.debug(
      `inviteDriverByEmail called with user: ${user.id}, driverId: ${driverId}, childId: ${childId}`,
    );

    // verify if the driver is not already invited by the parent
    const foundDriverRequest = await this.prismaService.request.findFirst({
      where: {
        driver: {
          id: driverUser.driver.id,
        },
        parent: {
          id: userParent.id,
        },
        child: {
          id: childId,
        },
      },
    });
    this.logger.debug(
      `foundDriverRequest: ${JSON.stringify(foundDriverRequest)}`,
    );

    if (foundDriverRequest) {
      this.logger.error(`Driver already invited`);
      throw new HttpException('Driver already invited', HttpStatus.BAD_REQUEST);
    }

    // get child by id
    const child = await this.prismaService.child.findFirst({
      where: {
        id: childId,
        parent: {
          userId: user.id,
        },
      },
    });
    this.logger.debug(`child: ${JSON.stringify(child)}`);

    if (!child) {
      this.logger.error(`Child not found`);
      throw new HttpException('Child not found', HttpStatus.NOT_FOUND);
    }

    // create a new driver request
    const newDriverRequest = await this.prismaService.request.create({
      data: {
        child: {
          connect: {
            id: child.id,
          },
        },
        status: 'pending',
        driver: {
          connect: {
            id: driverUser.driver.id,
          },
        },
        parent: {
          connect: {
            id: userParent.id,
          },
        },
      },
    });
    this.logger.debug(`newDriverRequest: ${JSON.stringify(newDriverRequest)}`);

    return newDriverRequest;
  }

  public async fetchInvitedDrivers(user: User) {
    this.logger.debug(`fetchInvitedDrivers called with user: ${user.id}`);

    const invitedDrivers = await this.prismaService.request.findMany({
      where: {
        parent: {
          userId: user.id,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        status: true,
        driver: {
          select: {
            user: true,
          },
        },
        child: true,
      },
    });
    this.logger.debug(`invitedDrivers: ${JSON.stringify(invitedDrivers)}`);

    return invitedDrivers.map((invitedDriver) => {
      return InviteDriverDto.from(
        invitedDriver.id,
        invitedDriver.child,
        invitedDriver.driver.user,
        invitedDriver.status,
      );
    });
  }

  public async deleteDriverInvite(user: User, id: number) {
    this.logger.debug(
      `deleteDriverInvite called with user: ${user.id}, id: ${id}`,
    );

    // verify if the driver is invited by the parent
    const existingDriverRequest = await this.prismaService.request.findFirst({
      where: {
        id,
        parent: {
          userId: user.id,
        },
      },
    });
    this.logger.debug(
      `existingDriverRequest: ${JSON.stringify(existingDriverRequest)}`,
    );

    if (!existingDriverRequest) {
      throw new HttpException('Driver request not found', HttpStatus.NOT_FOUND);
    }

    // delete driver request
    await this.prismaService.request.delete({
      where: {
        id,
      },
    });
    this.logger.debug(`Driver request with id ${id} deleted`);

    return true;
  }

  public async fetchDriverInvites(user: User) {
    this.logger.debug(`fetchDriverInvites called with user: ${user.id}`);

    const driverInvites = await this.prismaService.request.findMany({
      where: {
        driver: {
          userId: user.id,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        status: true,
        parent: {
          select: {
            parent_user: true,
          },
        },
        child: true,
      },
    });
    this.logger.debug(`driverInvites: ${JSON.stringify(driverInvites)}`);

    return driverInvites.map((driverInvite) => {
      return InviteDriverDto.from(
        driverInvite.id,
        driverInvite.child,
        driverInvite.parent.parent_user,
        driverInvite.status,
      );
    });
  }

  public async declineDriverInvite(user: User, requestId: number) {
    const invite = await this.prismaService.request.findFirst({
      where: {
        id: requestId,
        driver: {
          userId: user.id,
        },
      },
    });

    if (!invite) {
      throw new HttpException('Invite not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: 'declined',
      },
    });

    return true;
  }
  public async acceptDriverInvite(user: User, requestId: number) {
    const invite = await this.prismaService.request.findFirst({
      where: {
        id: requestId,
        driver: {
          userId: user.id,
        },
      },
    });

    if (!invite) {
      throw new HttpException('Invite not found', HttpStatus.NOT_FOUND);
    }

    if (invite.status === 'declined' || invite.status === 'disallowed') {
      // cant accept a declined or disallowed invite
      throw new HttpException(
        'Invite already declined',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (invite.status === 'allowed') {
      // cant accept an already accepted invite
      throw new HttpException(
        'Invite already accepted',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prismaService.request.update({
      where: {
        id: requestId,
      },
      data: {
        status: 'allowed',
      },
    });

    return true;
  }
}
