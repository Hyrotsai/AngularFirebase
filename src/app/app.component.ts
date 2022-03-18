import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc } from "firebase/firestore";
import { environment } from "./../environments/environment"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularFomulario';
  // items: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    // this.items = firestore.collection('items').valueChanges();
    // this.items.subscribe(data => {
    //   
    // })
  }

}
