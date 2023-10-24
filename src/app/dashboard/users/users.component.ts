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

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  mostrarFormulario = false;
  alumnoForm: FormGroup;
  alumnos: Alumno[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.alumnoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Agregar el campo "email"
    });
  }

  agregarAlumno() {
    if (this.alumnoForm.valid) {
      const nuevoAlumno = this.alumnoForm.value;
      this.alumnos.push(nuevoAlumno);
      this.alumnoForm.reset();
      this.mostrarFormulario = false;
    }
  }

  eliminarAlumno(alumno: Alumno) {
    const index = this.alumnos.indexOf(alumno);
    if (index !== -1) {
      this.alumnos.splice(index, 1);
    }
  }
}

export interface Alumno {
  nombre: string;
  apellido: string;
  email: string; // Agregar el campo "email" en la interfaz
}
