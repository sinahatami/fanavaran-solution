import { Component, Input, OnInit } from '@angular/core'
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ModalOptions } from './modal-options.interface';

@Component({
  selector: 'custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit {

  @Input() modalOptions: ModalOptions

  saveMethod(calback) { calback() }

  onAnyCloseEvent(callback) {
    callback ? callback() : null
    this.modal.getModal(this.modalId).close()
  }

  closeModal(callback) {
    callback ? callback() : null
    this.modal.getModal(this.modalId).close()
  }

  constructor(private modal: NgxSmartModalService) { }

  modalId: string = 'modal'
  ngOnInit() {
    this.modalOptions.modalId ? this.modalId = this.modalOptions.modalId : null
    this.setTitle()
  }

  setTitle() {
    let title: string = this.modalOptions.modatTitle
    switch (this.modalOptions.formType) {
      case 'Edit':
        title = `ویرایش ${title}`
        break
      case 'View':
        title = `مشاهده ${title}`
        break
      case 'Add':
        title = `ایجاد ${title}`
        break
    }

    this.modalOptions.modatTitle = title;
  }

  ngAfterViewInit() {
    this.modal.getModal(this.modalId).open()

    if (this.modalId != 'modal' && this.modalOptions.maxWidth) {
      let element = document.getElementsByClassName('nsm-dialog')[1] as HTMLElement
      if (!element) element = document.getElementsByClassName('nsm-dialog')[0] as HTMLElement
      element.style.maxWidth = `${this.modalOptions.maxWidth}px`
    }

    else if (this.modalId == 'modal' && this.modalOptions.maxWidth) {
      let element = document.getElementsByClassName('nsm-dialog')[0] as HTMLElement
      element.style.maxWidth = `${this.modalOptions.maxWidth}px`
    }
  }

  onOpenFinished() { setTimeout(() => this.dragElement(document.querySelector('#modal-to-drag .nsm-dialog'))) }

  dragElement(element: any): void {

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById("modal-header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById("modal-header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      // element.onmousedown = dragMouseDown;
    }


    function dragMouseDown(e) {
      console.log('mousedown');
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      console.log('element drag', e.clientX);
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      element.style.position = "absolute";
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }


}
