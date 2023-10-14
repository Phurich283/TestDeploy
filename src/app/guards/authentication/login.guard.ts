import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import TokenService from "../../services/authentication-services/token.service";
import RouteService from "../../services/global-services/routeService";

export const loginGuard: CanActivateFn = function(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
{

  const routeService: RouteService = inject(RouteService);
  const tokenService: TokenService = inject(TokenService)

  console.warn('activated route : ', route)
  console.warn('state route : ', state)

  if (tokenService.firstLogin)
  {
    return routeService.toFirstLogin().then(_ => false)
  }

  if (tokenService.isAuthenticationTokenNull())
  {
    return true
  }

  return routeService.toLanding().then(_ => false)
};
