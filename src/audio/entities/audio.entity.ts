import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity() // sql table === 'Audio'
  export class Audio {
    @PrimaryGeneratedColumn()
    aid: number;

    @Column({unique:true,nullable:true})
    id: number;    
    
    @Column({ nullable: true })
    songid: number;
  
    @Column({ nullable: true })
    title: string;

    @Column()
    author: string;
    
    @Column({ nullable: true })
    link: string;    

    @Column()
    lrc: string; 

    @Column()
    pic: string;

    @Column()
    url: string;

    @Column()
    url_128: string;

    @Column()
    url_320: string;    

  }
  