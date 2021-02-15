import { Component } from '@angular/core';
import { DebitoCaja } from '../../interface/bo/DebitoCaja';
import { CreditoCaja } from '../../interface/bo/CreditoCaja';
import { DataService } from '../../services/data.service';
import { AuthService} from '../../services/auth.service';
import { Acceso} from '../../interface/bo/Acceso';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  public accesos: Acceso;
  debitosCaja: DebitoCaja[];
  creditosCaja: CreditoCaja[];
  sumDebitos = 0;
  sumCreditos = 0;

  constructor(private dataService: DataService,
    private authService: AuthService) {

      /*
      this.dataService.getListDate('debitoCaja/filtrofecha', this.authService.token, this.currentDate(), this.currentDate())
      .subscribe( resp => {
        this.debitosCaja = (<DebitoCaja[]>resp);
        this.sumDebitos = this.debitosCaja.reduce((a, b) => a + (b['monto'] || 0), 0);
      }, error => {
        console.error( JSON.stringify(error) );
      });


      this.dataService.getListDate('creditoCaja/filtrofecha', this.authService.token, this.currentDate(), this.currentDate())
      .subscribe( resp => {
        this.creditosCaja = (<CreditoCaja[]>resp);
        this.sumCreditos = this.creditosCaja.reduce((a, b) => a + (b['monto'] || 0), 0);
      }, error => {
        console.error( JSON.stringify(error) );
      });
      */
    this.accesos = this.authService.accesos.find( a => a.opcion === 'Dashboard');
  }

  firstDay(){
    const dp = new DatePipe('es-GT');
    var pd= new Date();
    const p = 'yyyy-MM-dd';
    return dp.transform( new Date(pd.getFullYear(), pd.getMonth(), 1), p );
  }

  lastDay(){
    const dp = new DatePipe('es-GT');
    var pd= new Date();
    const p = 'yyyy-MM-dd';
    return dp.transform( new Date(pd.getFullYear(), pd.getMonth() + 1, 0), p );
  }

  currentDate() {
    // const currentDate = new Date();
    // return currentDate.toISOString().slice(0,-1);
    const dp = new DatePipe('es-GT');
    const p = 'yyyy-MM-dd';
    const dtr = dp.transform( new Date(), p );
    return dtr;
  }

}

