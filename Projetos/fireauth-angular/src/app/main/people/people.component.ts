import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';
import { Person } from '../person';
import * as faker from 'faker';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(private mainService:MainService) { }
  public people$:Observable<Person[]>
  ngOnInit(): void {
    this.people$ = this.mainService.getPeople();
  }

  public addOne():void{
    const person:Person = {
      name: faker.name.findName(),
      age:faker.random.number({min:18,max:99}),
      email:faker.internet.email(),
      company: faker.company.companyName(),
      country: faker.address.country()
    }
    this.mainService.addPerson(person);
  }

  generate(time:number):void{
    for(let i=0;i<time;i++){
      this.addOne();
    }
  }
}
