import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('request')
@ApiTags('Parent')
export class ParentRequestController {}
