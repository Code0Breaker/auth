import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}
  
  @Get(':country')
  getCountries(@Param('country') country:string):Promise<CountryDto[]>{
    return this.countriesService.getCountries(country)
  }
}
