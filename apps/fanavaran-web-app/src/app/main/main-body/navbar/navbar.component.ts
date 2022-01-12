import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../auth/providers/auth.service'

@Component({
  selector: 'fanavaran-solution-header',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  logout() { this.authService.logout() }

  showChangePassword: boolean = false
  changePasswordOpen() { this.showChangePassword = true }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
