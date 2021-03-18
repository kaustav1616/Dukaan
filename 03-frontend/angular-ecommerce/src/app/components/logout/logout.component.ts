import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    message: string;

  constructor(private authService: AuthServiceService, private router: Router, public logoutService: LogoutService) 
  {
    this.message = "";
  }

  ngOnInit(): void 
  {
    this.message = "";
  }

  onClickMe()
  {
    this.authService.logout().subscribe(data =>
        {
            this.message = data;

            // persisting message for 1.5 seconds (no user logged in / logout successful etc.)
            this.sleep(1500).then(() => 
            {
                this.message = "";
                this.router.navigateByUrl("login");
            });
        });
  }

  sleep(ms: number) 
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}