import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from "./../../service/firestore/firestore.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {


  // public datosForm = new FormGroup({
  //   nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
  //   apellido: new FormControl('', [Validators.required, Validators.minLength(4)])
  // });

  public datosForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]]
  });

  constructor(
    private firestore: FirestoreService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  enviarFormulario(data: any) {
    data.apellido = data.apellido.charAt(0).toUpperCase() + data.apellido.slice(1).toLowerCase()
    data.nombre = data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1).toLowerCase()
    this.firestore.createPerson(data)
    this.datosForm.setValue({
      nombre: '',
      apellido: '',
    })
    this.datosForm.reset()
  }

}
