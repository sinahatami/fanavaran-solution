import { Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable()
export class LoaderService {

  isLoading: boolean = false
  loaderCount: number = 0

  show() {
    this.spinner.show()
  }

  hide() {
    this.spinner.hide()
  }

  constructor(private spinner: NgxSpinnerService) { }
}
