import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { FolderService } from './folder.service';
import { createFolderDto, CreateFolderDto } from './dto/create-folder.dto';
import { nameSchema, TNameSchema } from 'src/utils/common-schemas';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { Request } from 'express';
import { Auth } from 'src/guards/auth.guard';
import { SameUserGuard } from 'src/guards/same-user.guard';

@Controller('folder')
@UseGuards(Auth)
export class FolderController {

  constructor(private readonly folderService: FolderService) { }

  @Post()
  @UseGuards(SameUserGuard)
  @UsePipes(new ZodValidationPipe(createFolderDto))
  create(@Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(createFolderDto);
  }

  @Get('mine')
  findByUser(@Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.folderService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.folderService.findOne(id);
  }

  @Patch(':id/name')
  update(@Body(new ZodValidationPipe(nameSchema)) updateFolderDto: TNameSchema, @Param('id') id: string) {
    return this.folderService.updateName(id, updateFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.folderService.remove(id);
  }
}
