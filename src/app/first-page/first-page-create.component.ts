import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatSnackBar} from '@angular/material';
import {Menu} from '../models/menu';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-first-page-create',
  templateUrl: './first-page-create.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageCreateComponent implements OnInit {

  _menu = new Menu();
  loading = true;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public snackBar: MatSnackBar) {
  }

  createMenu(id) {
    const snackBarRef = this.snackBar.open(`Editando Menu #${id}`);

  }

  newMenu() {
    this._menu = new Menu;
  }

  onSubmit(myForm: NgForm) {

  }

  ngOnInit(): void {
    setTimeout(() => {

      this.loading = false;

    }, 2000);
  }
}
