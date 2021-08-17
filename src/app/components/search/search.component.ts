import { Component, OnInit, Input,Output,EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('input', {static: true}) input: ElementRef;
  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  @Output() shareSearchMusicText = new EventEmitter();
  checkedList : any[];
  currentSelected : {};
  showDropDown: boolean = false;
  list: any[];
  searchText: string;
  constructor() {
    this.list = [
      {key:"All", value:'all', checked : false}, 
      {key:'Title', value: 'title', checked : false},
      {key:'Description', value:'description', checked : false},
      {key:'Keywords', value:'keywords', checked : false}
    ]
    this.checkedList = [];
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
        .pipe(
            filter(Boolean),
            debounceTime(500),
            distinctUntilChanged(),
            tap((event:KeyboardEvent) => {
              this.searchText = this.input.nativeElement.value;
              console.log(this.searchText);
              this.searchMusic();
            })
        )
        .subscribe();
  }

  getSelectedValue(check){
    console.log(check)
    check.checked = !check.checked;
    if(check.value === 'all'){
      for(let i of this.list){
        i.checked = check.checked;
      }
    }else{
      for(let i of this.list){
        if(i.value === 'all'){
          i.checked = false;
        }
      }
    }
    let status = check.checked;
    let value = check.value;
    if(status){
      this.checkedList.push(value);  
    }else{
        var index = this.checkedList.indexOf(value);
        this.checkedList.splice(index,1);
    }
    
    this.currentSelected = {checked : status,name:value};

    //share checked list
    this.shareCheckedlist();
    
    //share individual selected item
    this.shareIndividualStatus();
  }

  searchMusic(){
    this.shareSearchMusicText.emit(this.searchText);
  }

  shareCheckedlist(){
    console.log(this.checkedList)
    this.shareCheckedList.emit(this.checkedList);
  }

  shareIndividualStatus(){
    console.log(this.currentSelected)
     this.shareIndividualCheckedList.emit(this.currentSelected);
  }



}
