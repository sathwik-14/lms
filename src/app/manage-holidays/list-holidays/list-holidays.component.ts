import { Component, Inject } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-list-holidays',
  templateUrl: './list-holidays.component.html',
  styleUrls: ['./list-holidays.component.scss']
})
export class ListHolidaysComponent {
  loader = false;
  holidays: any;
  cache:any;
  today = Date.now();
  filterText: any;
  asc = false;
  constructor(private fb: FirebaseService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
    ) {
    this.loadHolidays();
  }
  parseCustomDate(dateString: string) {
    const yearInDate = dateString.split('-')[2];
    if(!yearInDate) {
      const currentYear = new Date().getFullYear();
      const [month, day] = dateString.split('-');
      const formattedDate = new Date(currentYear, parseInt(month) - 1, parseInt(day));
      return formattedDate 
    }
    return dateString;
  }

  upcomingDate(dateString: string) {
    const currentYear = new Date().getFullYear();
    const [day, month] = dateString.split('-');
    const formattedDate = new Date(currentYear, parseInt(month) - 1, parseInt(day));
    return formattedDate  > new Date()
  }


  showDialog(content: any): void {
    this.dialogs.open(content).subscribe();
  }

  filterHolidays(filtertext:string) {
    this.loader = true
    let value = filtertext;
    if (value) {
      let newData = this.holidays.filter((obj: any) =>
        obj.name.toLowerCase().includes(value.toLowerCase()) || obj.type.toLowerCase().includes(value.toLowerCase())
      );
      if (newData) {this.holidays = newData;}
      this.loader = false
    } else {
      this.holidays = this.cache
      this.loader = false
    }
  }

  sortHolidays() { 
    if(this.asc){
      this.asc = false;
      this.holidays=this.holidays.sort((a:any,b:any)=>{
        if(b.name<a.name)
        return -1
      if(b.name>a.name)
      return 1
        
        return 0
      })
    }
    else {
      this.asc = true
      this.holidays=this.holidays.sort((a:any,b:any)=>{
        if(a.name<b.name)
        return -1
      if(b.name>a.name)
      return 1
        
        return 0
      })
    }

  }

  loadHolidays() {
    this.loader = true;
    this.fb.getHolidays().subscribe((holidays:any) => {
      this.holidays = holidays;
      this.cache = holidays;
      // this.sortHolidays();
      this.loader = false;
    });
  }
}