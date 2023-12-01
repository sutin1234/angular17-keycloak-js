import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from "@angular/core/rxjs-interop";
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { jwtDecode } from "jwt-decode";
import Keycloak from "keycloak-js";
import { Observable } from 'rxjs';
import { setAuthenticated, setProfile } from "./stores/auth/auth.action";
import { selectAuthenticated, selectProfile } from "./stores/auth/auth.selector";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-keycloak-js';
  readonly store: Store = inject(Store);
  authenticated = signal(false)
  userProfile = signal(null)
  kc!: Keycloak
  onReady = (auth: boolean) => auth
  loginUrl = signal<string | null>(null)

  authenticatedSelector$: Observable<boolean> = this.store.select(selectAuthenticated);
  profileSelector$: Observable<Record<string, any>> = this.store.select(selectProfile);
  profileSignal = toSignal(this.profileSelector$)
  authSignal = toSignal(this.authenticatedSelector$)

  constructor() {
    afterNextRender(async () => {
      if (typeof window !== 'undefined') {
        this.kc = new Keycloak({
          url: 'http://localhost:8080',
          realm: 'angular_dev',
          clientId: 'e_commerce'
        })

        this.kc.init({ onLoad: 'login-required', checkLoginIframe: false }).then(auth => {
          this.authenticated.set(auth)
          this.userProfile.set(this.kc.idTokenParsed as any)
          this.setAuthenticated(auth)
          const decodeProfile = jwtDecode(String(this.kc.token))
          this.setProfile(decodeProfile)
        })

      }

      this.authenticatedSelector$.subscribe((isAuth: boolean) => {
        console.log('authenticated store subscribe ', isAuth)
      })
      this.profileSelector$.subscribe((profile: Record<string, any>) => {
        console.log('Profile store subscribe ', profile)
      })



    })
    // effect(() => {
    //   console.log('authState changed ', this.authenticated(), this.userProfile())
    // });

  }


  ngOnInit(): void {
    if (this.kc !== undefined) {
      console.log(this.kc)
    }
  }


  createLogout() {
    if (this.kc !== undefined) {
      const logoutUrl = this.kc.createLogoutUrl({ redirectUri: 'https://web-portal-devsit.nonprod.ngernhaijai.com/' })
      console.log('createLogoutUrl Ok ', logoutUrl)
      this.loginUrl.set(logoutUrl)
    }
  }

  async logout() {
    if (this.kc !== undefined) {
      // await this.kc.logout({ redirectUri: 'https://web-portal-devsit.nonprod.ngernhaijai.com/' })
      await this.kc.logout()
      window.location.reload()
    }
  }

  setAuthenticated(authenticated: boolean) {
    this.store.dispatch(setAuthenticated({ authenticated }))
  }

  setProfile(profile: Record<string, any>) {
    this.store.dispatch(setProfile({ profile }))
  }


  protected readonly selectAuthenticated = selectAuthenticated;
}
