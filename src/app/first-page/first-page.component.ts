import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatSnackBar} from '@angular/material';
import {Menu} from '../models/Menu';
import {MenuService} from './menu.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit, AfterViewInit {

  _menus: Array<Menu>;
  _menu: Menu = new Menu();

  loading = true;

  dataSource = new MatTableDataSource<Menu>(this._menus);

  displayedColumns = ['key', 'email', 'firstName', 'operations'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public snackBar: MatSnackBar,
              private menuService: MenuService,
              private router: Router
  ) {}

  deleteMenu(id) {
    const snackBarRef = this.snackBar.open(`Deletando Menu #${id}`);
  }

  editMenu(id) {
    const snackBarRef = this.snackBar.open(`Editando Menu #${id}`);
    this.router.navigateByUrl('first-page-create', );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    setTimeout(() => {

      this.loading = false;

    }, 2000);

    this.menuService.getCustomersList()
      .snapshotChanges()
      .pipe(map(changes =>
          changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
        )
      ).subscribe(data => {
      this._menus = data;
      this.dataSource.data = this._menus;
    });
  }
}
