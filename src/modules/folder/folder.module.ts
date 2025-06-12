import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { Folder, folderSchema } from './schema/folder.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: folderSchema }])
  ],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
