import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, Req, UnauthorizedException, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateCategoryInput, createCategoryInputSchema, UpdateCategoryInput, updateCategoryInputSchema } from './dto/create-category.dto';
import { Auth } from '../../guards/auth.guard';
import { SameUserGuard } from '../../guards/same-user.guard';
import { Request } from 'express';

@Controller('category')
@UseGuards(Auth)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

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

  @Put(':id')
  async update(
    @Body(new ZodValidationPipe(updateCategoryInputSchema)) updateCategoryDto: UpdateCategoryInput,
    @Param('id') id: string
  ) {
    return await this.categoryService.updateName(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
