import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { User } from '../user.model'
import { Router } from '@angular/router';
import { News } from '../news.model';

@Injectable({
  providedIn: 'root'
})
export class AuthNewsService {
  private user: User;

  constructor(private afAuth: AngularFireAuth, private router: Router, private firesotre: AngularFirestore) { }

  async signInWithGoogle(){
    const credentials = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    
    this.user = {
      uid:credentials.user.uid,
      displayName: credentials.user.displayName,
      email: credentials.user.email
    }

    localStorage.setItem("user", JSON.stringify(this.user))

    this.updateUserData()

    this.router.navigate(["news"]);
  }

  async SignOut() {
    return await this.afAuth.signOut().then(() => {
      localStorage.removeItem("user")
      this.user = null
      this.router.navigate(['homePage']);
    })
  }

  private updateUserData(){
    this.firesotre.collection("users").doc(this.user.uid).set({
      uid:this.user.uid,
      displayName: this.user.displayName,
      email: this.user.email
    }, {merge: true});
  }

  public getUser(){
    if(this.user == null && this.userSignedIn()){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    return this.user;
  }


  userSignedIn(): boolean{
    return JSON.parse(localStorage.getItem("user")) != null
  }

  getAllNews(){
    return this.firesotre.collection('news').valueChanges();
    // return this.firesotre.collection('users').doc(this.user.uid).collection('news').valueChanges();
  }

  addNews(news: News){
    this.firesotre.collection("news").add(news);
  }
}
