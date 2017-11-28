import { NgModule } from '@angular/core';
// import { LoginComponent } from './login/login.component';
import { LoginProvider } from '../providers/login/loginProvider'
import { LoginComponent } from './login/login';
import { HeaderComponent } from './header/header';
@NgModule({
	declarations: [LoginComponent,
    HeaderComponent],
	imports: [],
	exports: [LoginComponent,
    HeaderComponent]
})
export class ComponentsModule {}
