import { Component } from '@angular/core';
import { ExcelService } from './services/excel.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng7-json2excel';
  data: any[] = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000,
    location: {
      country: 'VN',
      city: 'HCM'
    },
    geo: {
      lat: 10.0,
      lng: 120
    }

  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000,
    location: {
      country: 'JP',
      city: 'Tokyo'
    },
    geo: {
      lat: 9.0,
      lng: 130
    }
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000,
    location: {
      country: 'KR',
      city: 'Seoul'
    },
    geo: {
      lat: 11.0,
      lng: 150
    }
  }];
  constructor(private excelService: ExcelService) {

  }

  exportAsExcel() {
    let RESULTS = [];
    this.data.forEach(o => {
      let result = this.convertObject2FlattenObject(o);
      RESULTS.push(result);
    })
    console.log(RESULTS);
    this.excelService.exportAsExcelFile(RESULTS, 'NewResult');
  }

  convertObject2FlattenObject(Obj: Object) {
    let depth = this.getDepthOfObject(Obj);
    let newObj = Obj;
    for (let index = 1; index < depth; index++) {
      let _result = this.flattenObject(newObj);
      newObj = { ..._result };
    }
    return newObj;
  }

  flattenObject(O: Object) {
    let KEYS = Object.keys(O);
    KEYS.forEach(KEY => {
      if (typeof (O[KEY]) === 'object') {
        Object.assign(O, O[KEY]);
        delete O[KEY];
      }
    })
    console.log(O);
    return O;
  }

  getDepthOfObject(O: Object) {
    var level = 1;
    var key;
    for (key in O) {
      console.log(key);
      if (!O.hasOwnProperty(key)) continue;
      if (typeof O[key] == 'object') {
        var depth = this.getDepthOfObject(O[key]) + 1;
        console.log(depth, level);
        level = Math.max(depth, level);
      }
    }
    return level;
  }
}
