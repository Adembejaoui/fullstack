import { Component } from '@angular/core';


import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone:true,
  imports:[MatSelectModule,MatInputModule,MatFormFieldModule]
})
export class LoginComponent {

}
