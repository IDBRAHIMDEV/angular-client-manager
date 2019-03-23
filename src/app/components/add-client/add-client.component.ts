import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  contacts = [
    {id: 1, label: "Phone"},
    {id: 2, label: "Email"},
    {id: 3, label: "SMS"},
  ];
  
  myClient: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0,
    contact: {},
    subscribe: false
  }

  constructor(
              private clientService: ClientService, 
              private router: Router
             ) { }

  ngOnInit() {
  }

  createClient() {
    this.clientService.persistClient(this.myClient)
                      .then((res) => {
                        this.router.navigate(['/clients']);
                      })
                      .catch((err) => console.log(err.message))
  }

}
