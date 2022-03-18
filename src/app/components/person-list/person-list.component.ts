import { Component, OnInit } from '@angular/core';
import { user } from 'rxfire/auth';
import { FirestoreService } from "./../../service/firestore/firestore.service"

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  data: any = []
  pageLoad: boolean = true
  userData: any
  userNotFound: boolean = false

  constructor(
    private firestore: FirestoreService
  ) { }

  ngOnInit(): void {
    this.getAllData()
  }

  getAllData() {
    this.firestore.getAllPersons().subscribe(data => {
      this.data = []
      data.map((data: any) => {
        this.data.push({
          id: data.payload.doc.id,
          data: data.payload.doc.data(),
          check: true
        })
      })
      this.ordenarNombres(this.data);
      (this.data.length >= 1) ? this.userNotFound = false : this.userNotFound = true
      this.pageLoad = false
    })
  }

  editPerson(dataID: any) {
    let userCheck = this.data.find((data: any) => data.id === dataID);
    (userCheck.check === false) ? userCheck.check = true : userCheck.check = false
  }

  deletePerson(id: any) {
    this.firestore.deletePerson(id)

  }

  confirmPerson(dataID: any, data: any) {
    let userCheck = this.data.find((data: any) => data.id === dataID);
    (userCheck.check === false) ? userCheck.check = true : userCheck.check = false
    const personData = this.nombreApellido(data)
    this.firestore.updatePerson(dataID, personData)
  }

  ordenarNombres(data: any) {
    data.sort(function (a: any, b: any) {
      if (a.data.nombre > b.data.nombre) {
        return 1;
      }
      if (a.data.nombre < b.data.nombre) {
        return -1;
      }
      return 0;
    });
  }

  ordenarNombresDesc(data: any) {
    data.sort(function (a: any, b: any) {
      if (a.data.nombre < b.data.nombre) {
        return 1;
      }
      if (a.data.nombre > b.data.nombre) {
        return -1;
      }
      return 0;
    });
  }

  nombreApellido(data: any) {

    let informacionUsuario = {
      nombre: data.split(" ")[0],
      apellido: (data.split(" ")[1]) ? data.split(" ")[1] : "",
    }
    return informacionUsuario
  }
}
