import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import TokenService from "../../services/authentication-services/token.service";
import {inject} from "@angular/core";
import RouteService from "../../services/global-services/routeService";

export const firstLoginGuard: CanActivateFn = function (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
{

  const routeService: RouteService = inject(RouteService)
  const tokenService: TokenService = inject(TokenService)

  if (tokenService.isAuthenticationTokenNull())
  {
    return routeService.toLogin().then(_ => false)
  }

  if (!tokenService.firstLogin && !tokenService.isAuthenticationTokenNull())
  {
    return routeService.toLanding().then(_ => false)
  }

  return tokenService.firstLogin;

};
