import { Component, OnInit } from '@angular/core';
import { Store, Actions, ofActionCompleted } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { ActivateAccount, ActivateAccountSuccess } from 'src/app/auth/store/auth.actions';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivateAccountPopupComponent } from '../../containers/activate-account-popup/activate-account-popup.component';

@Component({
  selector: 'el-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  constructor(private store: Store, private route: ActivatedRoute, private actions$: Actions, private dialog: MatDialog) { }

  verificationCode;
  subscription;

  ngOnInit() {
    this.route.params.subscribe(params => this.verificationCode = params.verificationCode);
    this.subscription = this.actions$
      .pipe(ofActionCompleted(ActivateAccountSuccess))
      .subscribe(() => {
        this.openDialog();
      });
  }

  activateAccount() {
    this.store.dispatch(new ActivateAccount(this.verificationCode));
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';



    const dialogRef = this.dialog.open(ActivateAccountPopupComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


