// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.scss'],
// })
// export class UsersComponent {
//   mostrarFormulario = false;
//   alumnoForm: FormGroup;
//   alumnos: Alumno[] = [];

//   constructor(private formBuilder: FormBuilder) {
//     this.alumnoForm = this.formBuilder.group({
//       nombre: ['', Validators.required],
//       apellido: ['', Validators.required],
//     });
//   }

//   agregarAlumno() {
//     if (this.alumnoForm.valid) {
//       const nuevoAlumno = this.alumnoForm.value;
//       this.alumnos.push(nuevoAlumno);
//       this.alumnoForm.reset();
//       this.mostrarFormulario = false;
//     }
//   }
// }

// export interface Alumno {
//   nombre: string;
//   apellido: string;
// }

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.scss'],
// })
// export class UsersComponent {
//   mostrarFormulario = false;
//   alumnoForm: FormGroup;
//   alumnos: Alumno[] = [];

//   constructor(private formBuilder: FormBuilder) {
//     this.alumnoForm = this.formBuilder.group({
//       nombre: ['', Validators.required],
//       apellido: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]], // Agregar el campo "email"
//     });
//   }

//   agregarAlumno() {
//     if (this.alumnoForm.valid) {
//       const nuevoAlumno = this.alumnoForm.value;
//       this.alumnos.push(nuevoAlumno);
//       this.alumnoForm.reset();
//       this.mostrarFormulario = false;
//     }
//   }

//   eliminarAlumno(alumno: Alumno) {
//     const index = this.alumnos.indexOf(alumno);
//     if (index !== -1) {
//       this.alumnos.splice(index, 1);
//     }
//   }
// }

// export interface Alumno {
//   nombre: string;
//   apellido: string;
//   email: string; // Agregar el campo "email" en la interfaz
// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService, Alumno } from './../../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  mostrarFormulario = false;
  alumnoForm: FormGroup;
  alumnos: Alumno[] = [];
  filteredAlumnos: Alumno[] = [];
  private usersSubscription!: Subscription;
  filtro = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.alumnoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  agregarAlumno() {
    if (this.alumnoForm.valid) {
      const nuevoAlumno = this.alumnoForm.value;

      // Agregar el nuevo alumno al servicio
      this.userService.agregarUsuario(nuevoAlumno)
        .subscribe((nuevoUsuario) => {
          // Agregar el usuario devuelto por el servicio a la lista local
          this.alumnos.push(nuevoUsuario);

          // Limpia el formulario y la lista de filtrado
          this.alumnoForm.reset();
          this.mostrarFormulario = false;

          // Filtrar nuevamente los alumnos
          this.filtrarAlumnos();
        });
    }
  }

  filtrarAlumnos() {
    const filtro = this.filtro.toLowerCase();
    this.filteredAlumnos = this.alumnos.filter(
      (alumno) =>
        alumno.nombre.toLowerCase().includes(filtro) ||
        alumno.apellido.toLowerCase().includes(filtro) ||
        alumno.email.toLowerCase().includes(filtro)
    );
  }

  eliminarAlumno(alumno: Alumno) {
    const index = this.alumnos.indexOf(alumno);
    if (index !== -1) {
      this.alumnos.splice(index, 1);
    }
  }

  ngOnInit() {
    this.usersSubscription = this.userService.getUsers()
      .subscribe((users) => {
        this.alumnos = users;
        this.filteredAlumnos = users;
      });

    this.alumnoForm.valueChanges
      .subscribe(() => {
        this.filtrarAlumnos();
      });
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
