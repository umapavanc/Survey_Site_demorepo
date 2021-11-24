import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @ViewChild("agGrid", { static: false }) agGrid!: AgGridAngular;
  constructor() {}

  ngOnInit(): void {
  }

  columnDefs: ColDef[] = [
    { field: 'Id', sortable: true, filter: true, checkboxSelection: true, resizable: true },
    { field: 'Name', sortable: true, filter: true, resizable: true, width: 300 },
    { field: 'Email', sortable: true, filter: true, resizable: true, width: 400 },
    { field: 'Role', sortable: true, filter: true },
  ];

  rowData = [
    { Id: '300566849', Name: 'Adrian Dumitriu', Email: 'adumitri@my.centennialcollege.ca', Role: 'Project Manger' },
    { Id: '301211038', Name: 'Uma Pavan Kumar Chukkapalli', Email: 'uchukkap@my.centennialcollege.ca', Role: 'Back End Developer' },
    { Id: '301153525', Name: 'Bhagyesh Bhavsar', Email: 'bbhavsa9@my.centennialcollege.ca', Role: 'Front End Developer' },
    { Id: '301072907', Name: 'Yasaman Barzegar', Email: 'ybarzega@my.centennialcollege.ca', Role: 'Front Developer' }
  ];

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => `${node.Id} ${node.Name}`).join(", ");
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

}
