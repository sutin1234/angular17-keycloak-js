import {afterNextRender, Component, effect, inject, Inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import Keycloak, {KeycloakProfile, KeycloakTokenParsed} from "keycloak-js";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-keycloak-js';
  authenticated = signal(false)
  userProfile = signal<{name: string, preferred_username: string} | null>(null)
  kc!: Keycloak
  onReady = (auth: boolean) => auth

  constructor() {
    afterNextRender(async () => {
      if (typeof window !== 'undefined') {
         this.kc = new Keycloak({
          url: 'http://localhost:8080',
          realm: 'angular_dev',
          clientId: 'e_commerce'
        })

        this.kc.init({ onLoad: 'login-required', checkLoginIframe: false}).then(auth => {
          this.authenticated.set(auth)
          this.userProfile.set(this.kc.idTokenParsed as any)
        })

      }

    })
    effect(() => {
      console.log('authState changed ', this.authenticated(), this.userProfile())
    });
  }


  ngOnInit(): void {
    if(this.kc !== undefined){
     console.log(this.kc)
    }



  }

}
