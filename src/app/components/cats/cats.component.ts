import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { url } from 'inspector';
import { FirestoreService } from '../../service/firestore/firestore.service';


@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  public cats: any = [];
  public documentId = "";
  public currentStatus = 1;
  public newCatForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    id: new FormControl('')
  });



  constructor(
    private firestoreService: FirestoreService //! Para poder usar nuestros metodos y llamar las variables desde firebase
  ) {
    this.newCatForm.setValue({
      id: '',
      nombre: '',
      url: ''
    });
  }

  ngOnInit() {
    this.firestoreService.getCats().subscribe((catsSnapshot) => {
      this.cats = [];
      catsSnapshot.forEach((catData: any) => {
        this.cats.push({
          id: catData.payload.doc.id, //! Obtiene el id de la colecion
          data: catData.payload.doc.data() //! Obtiene TODOS los datos de la colecion
        });
      })

    });

  }

  public newCat(form: { nombre: any; url: any; }, documentId = this.documentId) {



    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        url: form.url
      }
      this.firestoreService.createCat(data).then(() => {

        this.newCatForm.setValue({
          nombre: '',
          url: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombre,
        url: form.url
      }

      this.firestoreService.updateCat(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newCatForm.setValue({
          nombre: '',
          url: '',
          id: ''
        });

      }, (error) => {

      });
    }
  }

  public editCat(documentId: any) {

    let editSubscribe = this.firestoreService.getCat(documentId).subscribe((cat: any) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newCatForm.setValue({
        id: documentId,
        nombre: cat.payload.data()['nombre'],
        url: cat.payload.data()['url']
      });
      editSubscribe.unsubscribe();
    });
  }

  public deleteCat(documentId: any) {
    this.firestoreService.deleteCat(documentId).then(() => {

    }, (error) => {
      console.error(error);
    });
  }
}
