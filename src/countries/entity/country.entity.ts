import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CountryEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    flag:string;
}