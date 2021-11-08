import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountryEntity } from './entity/country.entity';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([CountryEntity]),HttpModule],
  controllers: [CountriesController],
  providers: [CountriesService]
})
export class CountriesModule {}
