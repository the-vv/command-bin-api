import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, Req, UnauthorizedException, Put } from '@nestjs/common';
import { CommandService } from './command.service';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateCommandInput, createCommandInputSchema } from './dto/create-command.dto';
import { Auth } from '../../guards/auth.guard';
import { SameUserGuard } from '../../guards/same-user.guard';
import { Request } from 'express';

@Controller('command')
@UseGuards(Auth)
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post()
  @UseGuards(SameUserGuard)
  @UsePipes(new ZodValidationPipe(createCommandInputSchema))
  create(@Body() createCommandDto: CreateCommandInput) {
    return this.commandService.create(createCommandDto);
  }

  @Get('mine')
  async findByUser(@Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return await this.commandService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandService.findOne(id);
  }

  @Put(':id')
  @UseGuards(SameUserGuard)
  async update(@Body(new ZodValidationPipe(createCommandInputSchema)) updateCommandDto: Partial<CreateCommandInput>, @Param('id') id: string) {
    return await this.commandService.updateCommand(id, updateCommandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandService.remove(id);
  }
}
