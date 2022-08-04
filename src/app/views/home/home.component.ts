import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { PeriodicElement } from 'src/app/models/PeriodicElements';
import { PeriodicElementService } from 'src/app/services/periodicElement.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PeriodicElementService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table !: MatTable<any>;



  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];




  dataSource !: PeriodicElement[];


  //constructor
  constructor(public dialog: MatDialog,
              public periodicElementService: PeriodicElementService
              ) {

    this.periodicElementService.getElements()
      .subscribe((data: PeriodicElement[]) =>{
        console.log('LOG ::=> Respondeu o subscrisbe ');
        console.log(data);
        this.dataSource = data
      });


  }




  //iniciando
  ngOnInit(): void {
    console.log('LOG ::=> On init do home ts');
  }

  //Abrindo o dialog para edicao ou novo
   openDialog (element: PeriodicElement| null){

    //dialog onOpen
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null? {

        position: null,
        name: '',
        weight: null,
        symbol:''
      }:{
        id: element.id,
        position: element.position,
        name: element.name,
        weight: element.weight,
        symbol:element.symbol
      } ,
    });




    //dialog OnClose
    dialogRef.afterClosed().subscribe(result => {

      console.log('LOG ::=> after close -- subscribe');

      if (!result !== undefined){
          if (this.dataSource.map(p => p.id).includes(result.id)){
            this.periodicElementService.editElement(result)
            .subscribe((data: PeriodicElement)=>{
              const index = this.dataSource.findIndex(p => p.id ===data.id);

                this.dataSource[index] = data;
                this.table.renderRows();
              }
            );


          }else{
          //adiciona no data source
          this.periodicElementService.createElement(result).subscribe(
            (data: PeriodicElement)=>{
              this.dataSource.push(data);
              this.table.renderRows();
            }
          );

          }
      }

    });



  }



  //editando
  editElement(element: PeriodicElement): void {
    this.openDialog(element);
  }

  //apagando
  deleteElement(position: number): void {
    this.periodicElementService.deleteElement(position).subscribe(()=>{

      this.dataSource = this.dataSource.filter(p => p.id !== position)

    });
  }



}
