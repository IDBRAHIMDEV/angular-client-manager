import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  search = '';
  total: number = 0;
  clients: Client[] = [];
  searchClients: Client[] = [];
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getClients()
      .subscribe((res: Client[]) => {
        this.searchClients = this.clients = res
        this.totalBalance();
      })
  }

  removeClient(id) {
    this.clientService.deleteClient(id)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  totalBalance() {
    this.total = this.clients.reduce((total, client) => {
      return total + client.balance;
    }, 0);
  }

  toggleActive(client) {
    this.clientService.toggleActiveClient(client)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  searchClient() {

    if (this.search != '') {
      this.searchClients = this.clients.filter(client => client.firstName.toLowerCase().includes(this.search.toLowerCase()) 
      || client.lastName.toLowerCase().includes(this.search.toLowerCase()) 
      || client.email.toLowerCase().includes(this.search.toLowerCase()))
    } else {
      this.searchClients = this.clients;
    }
  }

}
