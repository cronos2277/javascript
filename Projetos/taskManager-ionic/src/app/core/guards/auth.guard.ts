import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot,} from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild, CanLoad{

  constructor(private authService:AuthService, private router:Router){}

 
  private checkAuthState(redirect:string):Observable<boolean>{
    return this.authService.isAutenticated.pipe(
      tap(is => {
            if(!is)
            {
              this.router.navigate(['/login'],{
                queryParams: { redirect }
              })
            }
          }
        )
          
    );
  }

  
  public canActivateChild(route:ActivatedRouteSnapshot, state:RouterStateSnapshot ):Observable<boolean>{
    return this.canActivate(route,state);
  }

  public canLoad(route:Route, segments:UrlSegment[] ):Observable<boolean>{
    const url = segments.map(s => `/${s}`).join('');
    return this.checkAuthState(url).pipe(take(1));
  }
  
  public canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot ):Observable<boolean>{
    return this.checkAuthState(state.url);
  }

}
