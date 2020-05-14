import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {

  private token:string;

  constructor(private tokenService:TokenService) { }

  ngOnInit(): void { 
    this.token = this.tokenService.getToken();
    console.log(this.token);
  };



};
