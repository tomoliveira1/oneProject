import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  public colorHex: string = "";

  constructor(public dialogRef: MatDialogRef<ColorPickerComponent>) { }

  ngOnInit(): void {
  }

}
