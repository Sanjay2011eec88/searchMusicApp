import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value, ...args): unknown {
    if(!value) return null;
    if(!args) return value;
    if(args[0].length === 0){
      return value
    }
    let searchText = args[0].toLowerCase().split(" ");
    let filter = args[1];
    let checkAll = filter.includes('all') || filter.length == 0;
    let musicData = [];
    
    console.log(checkAll)
    for(let music of value){
      let foundInDes = false;
      let foundInTitle = false;
      let foundInKeywords = false;
      for(let search of searchText){
          if(filter.includes('description') || checkAll){
            foundInDes = this.stringContainsCaseInsensitive(search, music.description[0])
          }
          if(filter.includes('title') || checkAll){
            foundInTitle = this.stringContainsCaseInsensitive(search, music.title)
          }
          if(filter.includes('keywords') || checkAll){
            foundInKeywords = this.stringInArray(search, music.keywords)
          }
      }
      if(foundInDes ||foundInTitle|| foundInKeywords){
        musicData.push(music);
      }
    }
    return musicData;
  }

  stringContainsCaseInsensitive(search, subject){
    return subject.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  }

  stringInArray(search, subject){
    return subject.findIndex(item => search.toLowerCase() === item.toLowerCase()) !== -1;
  }

}
