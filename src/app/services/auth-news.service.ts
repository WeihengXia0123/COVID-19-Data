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

    this.router.navigate(["homePage"]);
  }

  async SignOut() {
    return await this.afAuth.signOut().then(() => {
      localStorage.removeItem("user")
      this.user = null
      this.router.navigate(['homePage']);
    })
  }

  private updateUserData(){
    localStorage.setItem('userEligible', JSON.stringify(0));
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

  public getFireStoreEligibleUser(){
    return this.firesotre.collection('eligible_users').valueChanges();
  }

  userEligible(): boolean{
    let curr_user = this.getUser();
    this.getFireStoreEligibleUser().subscribe((data: any)=>{
      console.log(data);
      for(let i=0; i < data.length; i++){
        if(curr_user.displayName == data[i].Name){
          localStorage.setItem('userEligible', JSON.stringify(1));
        }
      }
    })

    let eligible_flag = JSON.parse(localStorage.getItem("userEligible"));
    if(eligible_flag == 1){
      // User is eligible in the database
      console.log("User: " + curr_user.displayName +",is eligible to add News");
      alert("News added!");
      return true;
    }
    // User is NOT eligible in the database
    console.log("User: " + curr_user.displayName +",is NOT eligible to add News");
    alert("User: " + curr_user.displayName +",is NOT eligible to add News");
    return false;
  }


  getAllNews(){
    return this.firesotre.collection('news').valueChanges();
    // return this.firesotre.collection('users').doc(this.user.uid).collection('news').valueChanges();
  }

  addNews(news: News){
    this.firesotre.collection("news").add(news);
  }
}
