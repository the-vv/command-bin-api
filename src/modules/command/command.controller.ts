import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, Req, UnauthorizedException, Put, Query, NotImplementedException } from '@nestjs/common';
import { CommandService } from './command.service';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateCommandInput, createCommandInputSchema } from './dto/create-command.dto';
import { Auth } from '../../guards/auth.guard';
import { SameUserGuard } from '../../guards/same-user.guard';
import { Request } from 'express';
import { sourceSchema, TSourceSchema } from 'src/utils/common-schemas';
import { ESource } from 'src/models/commons';

@Controller('command')
@UseGuards(Auth)
export class CommandController {
  constructor(private readonly commandService: CommandService) { }

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

  @Get('bySource')
  async findBySource(
    @Query(new ZodValidationPipe(sourceSchema)) query: TSourceSchema,
    @Req() req: Request
  ) {
    const { source, sourceId } = query;
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    if (source === ESource.CATEGORY) {
      return await this.commandService.findByCategory(sourceId!);
    } else if (source === ESource.FOLDER) {
      return await this.commandService.findByFolder(sourceId!);
    } else if (source === ESource.RECENT) {
      return await this.commandService.findRecentCommands(userId);
    } else {
      throw new NotImplementedException(`Source type ${source} is not implemented`);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandService.findOne(id);
  }

  @Put(':id')
  @UseGuards(SameUserGuard)
  async update(
    @Body(new ZodValidationPipe(createCommandInputSchema)) updateCommandDto: Partial<CreateCommandInput>,
    @Param('id') id: string
  ) {
    return await this.commandService.updateCommand(id, updateCommandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandService.remove(id);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return await this.commandService.findByCategory(categoryId);
  }

  @Get('folder/:folderId')
  async findByFolder(@Param('folderId') folderId: string) {
    return await this.commandService.findByFolder(folderId);
  }

}
