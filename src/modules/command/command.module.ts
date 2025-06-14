import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { Command, commandSchema } from './schema/command.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Command.name, schema: commandSchema }])
  ],
  controllers: [CommandController],
  providers: [CommandService],
})
export class CommandModule {}
