import { Component, Inject, OnInit } from '@angular/core';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/models/PeriodicElements';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
  element !: PeriodicElement;

  isChange !: boolean;




  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: PeriodicElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}



  ngOnInit(): void {
    if (this.data.position !=null)
      this.isChange = true;
    else
      this.isChange = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
