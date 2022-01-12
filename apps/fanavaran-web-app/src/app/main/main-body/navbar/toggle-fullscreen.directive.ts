import { Directive, HostListener } from '@angular/core'

import screenfull from 'screenfull'

@Directive({
  selector: '[appToggleFullscreen]'
})
export class ToggleFullscreenDirective {

  @HostListener('click') onClick() { screenfull.isEnabled ? screenfull.toggle() : null }
}
