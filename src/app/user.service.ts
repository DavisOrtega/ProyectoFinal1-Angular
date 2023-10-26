// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4200'; // Reemplaza con la URL de tu API real

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.apiUrl}/users`);
  }

  agregarUsuario(nuevoAlumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.apiUrl}/users`, nuevoAlumno);
  }
}

export interface Alumno {
  nombre: string;
  apellido: string;
  email: string;
}
