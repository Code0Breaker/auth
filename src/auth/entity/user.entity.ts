import { CountryEntity } from "src/countries/entity/country.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    fullname:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @ManyToOne(()=>CountryEntity, country=>country.id)
    @JoinColumn()
    country:CountryEntity
}