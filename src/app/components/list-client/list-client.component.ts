import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  clients: Client[] = [];
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getClients()
                      .subscribe((res: Client[]) => {
                        this.clients = res
                        console.log(res);
                      })
  }

  removeClient(id) {
    this.clientService.deleteClient(id)
                      .then(res => console.log(res))
                      .catch(err => console.error(err))
  }

}
