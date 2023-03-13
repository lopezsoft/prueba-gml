import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpServerService, MessagesService} from "./utils";
import {QueryServicesService} from "./services/query-services.service";
import {LoadMaskService} from "./common/load-mask.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit {
  customForm: FormGroup;
  errors: any[] = [];
  editing: boolean = false;
  uid: string = null;
  constructor(
    public fb: FormBuilder,
    public http: HttpServerService,
    public aRouter: ActivatedRoute,
    public queryService: QueryServicesService,
    public router : Router,
    public msg: MessagesService,
    public mask: LoadMaskService
  ){
    const val = [Validators.required, Validators.minLength(5), Validators.maxLength(100)];
    this.customForm = this.fb.group({
      category_id                   : ['', [Validators.required]],
      country_id                    : ['',  [Validators.required]],
      names                         : ['', val],
      last_names                    : ['', val],
      document_number               : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      address                       : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(180)]],
      cellphone                     : ['', [Validators.minLength(7), Validators.maxLength(10)]],
      email                         : ['', [Validators.email]]
    });
  }

  onSave(e) {
    e.preventDefault();
    if(this.customForm.invalid) {
      this.msg.errorMessage('Campos sin datos', 'Por favor llene la información.');
      return;
    }
    this.errors = [];
    this.mask.showBlockUI('Guardando la información');
    if(this.editing) {
      this.http.put(`/user/${this.uid}`, this.customForm.getRawValue())
        .subscribe({
          next: () => {
           this.afterSave();
          },
          error: (err: any) => {
            this.onError(err);
          }
        });
    }else {
      this.http.post('/user', this.customForm.getRawValue())
        .subscribe({
          next: () => {
           this.afterSave()
          },
          error: (err: any) => {
            this.onError(err);
          }
        });
    }
  }

  afterSave() {
    this.mask.hideBlockUI();
    this.msg.toastMessage('', 'Se ha guardado la información.');
    setTimeout(() => {
      this.goHome();
    }, 1000);
  }
  ngAfterViewInit(): void {

  }
  onError(err: any): void {
    for (const errorsKey in err.error.messages) {
      this.errors = [...this.errors, err.error.messages[errorsKey]]
    }
    this.mask.hideBlockUI();
    this.msg.errorMessage('Error', 'Error al guardar.');
  }
  ngOnInit(): void {
    this.uid = this.aRouter.snapshot.paramMap.get('id');
    if (this.uid) {
      this.loadData(this.uid);
    }
  }

  loadData(id: any = 0): void {
    const frm   = this.customForm;
    this.editing  = true;
    this.mask.showBlockUI();
    this.http.get(`/user`, { uuid: id})
      .subscribe({
        next: (resp: any) => {
          this.mask.hideBlockUI();
          frm.setValue({
            category_id       : resp.dataRecords.data[0].category_id,
            country_id        : resp.dataRecords.data[0].country_id,
            names             : resp.dataRecords.data[0].names,
            email             : resp.dataRecords.data[0].email,
            last_names        : resp.dataRecords.data[0].last_names,
            document_number   : resp.dataRecords.data[0].document_number,
            address           : resp.dataRecords.data[0].address,
            cellphone         : resp.dataRecords.data[0].cellphone,
          });
        },
        error: () => {
          this.mask.hideBlockUI();
        }
      });
  }
  isInvalid(controlName: string): boolean {
    const frm = this.customForm;
    if (!frm) {
      return false;
    }
    return frm.get(controlName).invalid && frm.get(controlName).touched;
  }

  isInvalidNumber(controlName: string): boolean {
    const frm = this.customForm;
    if (!frm) {
      return false;
    }
    return (frm.get(controlName).value <= 0) ? true : false;
  }

  goHome() {
    this.router.navigate([`/`]);
  }
}
