import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableCellComponent } from './data-table-cell.component';

describe('DataTableCellComponent', () => {
  let component: DataTableCellComponent;
  let fixture: ComponentFixture<DataTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
