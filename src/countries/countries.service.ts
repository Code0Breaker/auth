import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CountryDto } from './dto/country.dto';
import { CountryEntity } from './entity/country.entity';

@Injectable()
export class CountriesService{
    constructor(
        @InjectRepository(CountryEntity)
        private countryRepo:Repository<CountryEntity>,
        private httpService: HttpService
    ){}

    async getCountries(country: string):Promise<CountryDto[]>{
        return await this.countryRepo.find({where:{name:Like(`%${country}%`)}})
    }
    
    // @Cron('* * * * 6 *')
    async handleCron(){
         try{
            const data = await this.httpService.get('https://restcountries.com/v3.1/all').toPromise()
            const result = []
            
            data.data.map(item=>{
                result.push({name:item.name.common, flag:item.flags.png})
            })
            await this.countryRepo.save(result)
         }catch(err){
             return err
         }
    }
}
