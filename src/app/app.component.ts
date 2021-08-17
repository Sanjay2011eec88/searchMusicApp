import { Component, OnInit } from '@angular/core';
import * as music_data from '../assets/data/music.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'search-music';
  searchText = '';
  musicData = [];
  checkList = [];

  constructor(){}
  ngOnInit(): void {
    console.log(music_data.sections);
    this.musicData =  music_data.sections[0].assets;
  }

  // ngOnInit: any{
  //   this.musicData =  music_data.sections;
  // }

  shareCheckedList(item:any[]){
    console.log("In app",item);
    this.checkList = item;
  }
  shareIndividualCheckedList(item:{}){
    console.log("In app",item);
  }

  shareSearchMusicText(searchText: string){
    console.log("in app", searchText);
    this.searchText = searchText.trim();
  }

}
