import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DeshboardComponent } from './deshboard/deshboard.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard

export const routes: Routes = [
    {
        path: '',
        component : LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DeshboardComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'read',
        component: ReadComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "update/:id",
        component: UpdateComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: "forget-password",
        component: ForgetPasswordComponent
    }
];
