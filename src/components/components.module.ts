import { NgModule } from '@angular/core';
// import { LoginComponent } from './login/login.component';
import { LoginProvider } from '../providers/login/loginProvider'
import { LoginComponent } from './login/login';
@NgModule({
	declarations: [LoginComponent],
	imports: [],
	exports: [LoginComponent]
})
export class ComponentsModule {}
