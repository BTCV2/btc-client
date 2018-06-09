import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-data-table-cell',
  templateUrl: './data-table-cell.component.html',
  styleUrls: ['./data-table-cell.component.scss']
})
export class DataTableCellComponent implements OnInit {
  @Input() datarows : any;
  @Input() rowIndex : any;
  @Input() mark : any;
  constructor() { }

  ngOnInit() {
  }

}
