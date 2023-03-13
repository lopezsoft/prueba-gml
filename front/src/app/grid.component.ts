import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ColumnContract, ExodoGridComponent} from "exodolibs";
import {Router} from "@angular/router";
import {HttpServerService, MessagesService} from "./utils";
import Swal from "sweetalert2";
import {QueryServicesService} from "./services/query-services.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadMaskService} from "./common/load-mask.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit  {
  @ViewChild('exodoGrid', { static: false }) exodoGrid: ExodoGridComponent;
  title = 'Catalogo de usuarios';
  public eColumns: ColumnContract[] = [
    {
      text: '#',
      dataIndex: '#',
      width: '16px',
      align: 'right',
      cellRender: (row, rowIndex, value, columnIndex): string => {
        return '<b>' + (rowIndex + 1).toString() + '</b>';
      }
    },
    {
      text: '',
      dataIndex: '#edit#',
      width: '16px',
      cellRender: (row: any, rowIndex, value, columnIndex): string => {
        return `<span class="span-button" title="Editar">
            <i class="fas fa-edit fa-cursor fas-fa-edit"></i>
          </span>`;
      },
      cellClick: (row: any, rowIndex, columnIndex): void => {
        this.editData(row);
      }
    },
    {
      text: '',
      dataIndex: '#delete#',
      width: '16px',
      cellRender: (row: any, rowIndex, value, columnIndex): string => {
        return `<span class="span-button" title="Eliminar">
            <i class="fas fa-trash-alt fa-cursor fas-fa-delete"></i>
          </span>`;
      },
      cellClick: (row: any, rowIndex, columnIndex): void => {
        this.deleteData(row);
      }
    }
  ];

  public crudApi: {
    create: string,
    read: string,
    update: string,
    delete: string
  };
  columns: ColumnContract[]      = [];
  customForm: FormGroup;
  constructor(public msg: MessagesService,
              public http: HttpServerService,
              public router: Router,
              public fb: FormBuilder,
              public queryService: QueryServicesService,
              public mask: LoadMaskService
  ) {
    this.customForm = this.fb.group({
      value: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnInit(): void {
    this.columns  = [
      {
        text: 'Nombres',
        dataIndex: 'names'
      },
      {
        text: 'Apellido',
        dataIndex: 'last_names'
      },
      {
        text: 'Cédula',
        dataIndex: 'document_number'
      },
      {
        text: 'Email',
        dataIndex: 'email'
      },
      {
        text: 'País',
        dataIndex: 'country_id',
        cellRender: (row) => {
          const country = this.queryService.country.find(c => c.ccn3 == row.country_id);
          if(country) {
            return `
                  <div class="d-flex justify-content-end w-100">
                    <img width="24" height="24" src="${country.flags.png}" alt="${country.name.common}"/>
                    ${country.name.common}
                   </div>
                    `;
          }
          return row.country_id;
        }
      },
      {
        text: 'Dirección',
        dataIndex: 'address',
        width: '100%'
      },
      {
        text: 'Celular',
        dataIndex: 'cellphone'
      },
      {
        text: 'Categoría',
        dataIndex: 'category_id',
        cellRender: (row, rowIndex, value, columnIndex) => {
          return row?.category?.category_name || '';
        }
      }

    ]
    this.combineColumns();
    this.crudApi = {
      create  : '/user',
      read    : '/user',
      update  : '/user/',
      delete  : '/user/'
    };
  }
  combineColumns() {
    this.eColumns = [...this.eColumns, ...this.columns];
  }
  ngAfterViewInit(): void {
    this.exodoGrid.gridService.proxy.api = {
      read: `${this.http.getUrl()}${this.crudApi.read}`,
    };
    this.exodoGrid.gridService.onLoad();
    if(this.queryService.setting) {
      this.customForm.setValue({
        value: this.queryService.setting.value
      });
    }
  }
  isInvalid(controlName: string): boolean {
    const frm = this.customForm;
    if (!frm) {
      return false;
    }
    return frm.get(controlName).invalid && frm.get(controlName).touched;
  }
  deleteData(data: any): void {
    const ts    = this;
    // Implements
    Swal.fire({
      title : 'Eliminar registro',
      text  : '¿Seguro que desea eliminar el registro?',
      icon  : 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        ts.exodoGrid.gridService.isLoading = true;
        ts.http.delete(`${ts.crudApi.delete}${data.uid || data.id}`)
          .subscribe({
            next: () => {
              ts.exodoGrid.gridService.isLoading = false;
              ts.exodoGrid.gridService.searchQuery();
            },
            error:  (err: string) => {
              ts.exodoGrid.gridService.isLoading = false;
              ts.msg.errorMessage('Error', err);
            }
          });
      }
    });
  }
  createData() {
    if(this.customForm.invalid) {
      this.msg.errorMessage('Email incorrecto', 'Por favor digite un correo valido.');
      return;
    }
    this.router.navigate([`/create`]);
  }

  editData(data: any): void {
    this.router.navigate([`/edit/${data.id}`]);
  }

  sendReport() {
    this.mask.showBlockUI('Enviando informe');
      this.http.post(`/user/send-report`)
        .subscribe({
          next: () => {
            this.mask.hideBlockUI();
            this.msg.toastMessage('', 'Se ha enviando el informe.');
          },
          error: (err: any) => {
            this.mask.hideBlockUI();
            this.msg.errorMessage('Error', 'Error al enviar informes.');
          }
        });
  }

  onSave(e) {
    e.preventDefault();
    if(this.customForm.invalid) {
      this.msg.errorMessage('Email incorrecto', 'Por favor digite un correo valido.');
      return;
    }
    this.mask.showBlockUI('Guardando la información');
      this.http.put(`/setting/${this.queryService.setting.id}`, this.customForm.getRawValue())
        .subscribe({
          next: () => {
            this.mask.hideBlockUI();
            this.msg.toastMessage('', 'Se ha guardado la información.');
          },
          error: (err: any) => {
            this.mask.hideBlockUI();
            this.msg.errorMessage('Error', 'Error al guardar.');
          }
        });
  }
}
