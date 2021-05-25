import { Component } from "@angular/core";

@Component({
    selector: 'app-loadingspinner',
    template:`
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `,
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

}