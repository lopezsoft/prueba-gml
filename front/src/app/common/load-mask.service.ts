import {Injectable} from '@angular/core';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
@Injectable({ providedIn: 'root' })
export class LoadMaskService {
    @BlockUI() blockUI: NgBlockUI;
    constructor(
    ) {
        this.maskSpinner    = 'Realizando petición...';
    }
    public maskSpinner: string;/*
    * Block UI Message
    * */
    public showBlockUI(message?) {
        this.blockUI.start(message);
    }

    public hideBlockUI() {
        this.blockUI.stop();
    }
}
