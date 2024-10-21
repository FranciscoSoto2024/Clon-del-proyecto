import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';
//Operadores tipo "observables"
import {map, switchMap, of, from, auditTime} from 'rxjs';

export const rutaProtegidaGuard: CanActivateFn = (route, state) => {
  //Inyectamos/ instanciamos servicio de auntentificacion en el guardian (forma local)
  const servicioAuth = inject (AuthService);

  // Inyectamos/ instanciamos servicio de rutas de forma local 
  const servicioRutas = inject (Router);

  // Especificamos cual es el rol que va a esperar el guardian para activarse
  const rolEsperado = 'admin'

  //FROM -> convierte una promesa en observable
  return from (servicioAuth.obtenerUid()).pipe(
    switchMap(uid => {
      if(uid){
        return servicioAuth.obtenerRol(uid).pipe(
        map(rol => {
          if(rol === rolEsperado){
            //si coincide el rol esperado, damos acceso al usuario
            console.log("Usuario verificado como administrador.")

            return true;
          }else{
            //denegamos acceso al usuario
            return false;
          }
        }))
      }else{
        console.log("Usuario no valido. Permisos insuficientes");

        // Redireccionamos acceso a inicio para no validados
        //Usuario sin permiso: Visitante o NO registrado
        return of(servicioRutas.createUrlTree(['/inicio']));
      }
    })
  )
};
