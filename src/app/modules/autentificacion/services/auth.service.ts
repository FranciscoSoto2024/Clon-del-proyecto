import { Injectable } from '@angular/core';
// Servicio en la nube de autentificación de Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
//Accedemos directamente al servecio Firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//Observables para obtner cambios 
import { Observable } from 'rxjs';
//Itera coleccion leyendo informacion actual
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rolUsuario: string| null = null;

  // Referenciar Auth de Firebase en el servicio
  constructor(
  private auth: AngularFireAuth, 
  
  private servicioFirestore: AngularFirestore
) { }

  // FUNCIÓN PARA REGISTRO
  registrar(email: string, password: string){
    // retorna el valor que es creado con el método "createEmail..."
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // FUNCIÓN PARA INICIO DE SESIÓN
  iniciarSesion(email: string, password: string){
    // validar la información del usuario -> saber si existe en la colección
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // FUNCIÓN PARA CERRAR SESIÓN
  cerrarSesion(){
    // devuelve una promesa vacía -> quita token
    return this.auth.signOut();
  }

  // FUNCIÓN PARA TOMAR EL UID
  async obtenerUid(){
    // Nos va a generar una promesa y la constante la va a capturar
    const user = await this.auth.currentUser;

    /*
      Si el usuario no respeta la estructura de la interfaz /
      Si tuvo problemas para el registro -> ej.: mal internet
    */
    if(user == null){
      return null;
    } else {
      return user.uid;
    }
  }
  //FUNCION PARA OBTENER EMAIL
  obtenerUsuario(email: string){
    /**
     * Retomamos del servicio FiresStore la coleccion de 'usuarios', buscamos una referencia en los emails registrados
     * y los comparamos con los que ingrese el usuario al iniciar sesion, y lo 
     */
    return this.servicioFirestore.collection('usuario', ref => ref.where('email','==', email)).get().toPromise();
  }
  //FUNCION PARA OBTENER EL ROL DE USUARIO
  obtenerRol(uid: string): Observable<string | null> {
    /*Accedemos a coleccion de usuarios, buscando por UID, obteniendo cambios en valores.
    Al enviar info. por tuberia , "mapeamos" la coleccion, obteniendo un usuario especifico
    y buscamos su atributo "rol", aun si este es "nulo" 
    */

    return this.servicioFirestore.collection("usuarios").doc(uid).valueChanges()
    .pipe(map((usuario: any) => usuario ? usuario.rol: null));
  }

  // Enviar el rol obtenido
  setUsuarioRol(rol: string){
    this.rolUsuario = rol;
  }

  // Obtener el rol y retornar
  getUsuarioRol(): string | null {
    return this.rolUsuario;
  }
}
