import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards, UsePipes, Req, UnauthorizedException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateCategoryInput, createCategoryInputSchema } from './dto/create-category.dto';
import { nameSchema, TNameSchema } from '../../utils/common-schemas';
import { Auth } from '../../guards/auth.guard';
import { SameUserGuard } from '../../guards/same-user.guard';
import { Request } from 'express';

@Controller('category')
@UseGuards(Auth)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(SameUserGuard)
  @UsePipes(new ZodValidationPipe(createCategoryInputSchema))
  create(@Body() createCategoryDto: CreateCategoryInput) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('mine')
  async findByUser(@Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return await this.categoryService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id/name')
  async update(@Body(new ZodValidationPipe(nameSchema)) updateCategoryDto: TNameSchema, @Param('id') id: string) {
    return await this.categoryService.updateName(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
