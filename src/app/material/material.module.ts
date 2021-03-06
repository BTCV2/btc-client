import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatTabsModule, MatCardModule, MatIconModule,
 MatTooltipModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatDatepickerModule,
 MatNativeDateModule} from '@angular/material';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgxDatatableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    //FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgxDatatableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule

  ]
})
export class MaterialModule { }
