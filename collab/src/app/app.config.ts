import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptor/auth-interceptor';
import { errorInterceptor } from './core/interceptor/error-interceptor';
import {provideStore} from '@ngrx/store'
import {provideEffects} from '@ngrx/effects'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { projectReducer } from './features/projects/state/project.reducer';
import { ProjectEffets } from './features/projects/state/project.effects';
import { taskReducer } from './features/task/state/task.reducers';
import { TaskEffects } from './features/task/state/task.effects';
import { userReducer } from './features/user/state/user.reducer';
import { UserEffects } from './features/user/state/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      projects:projectReducer,
      tasks:taskReducer,
      users:userReducer,
    }),
    provideEffects([ProjectEffets,TaskEffects,UserEffects]),
    provideStoreDevtools({maxAge:25}),
    
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    
    provideHttpClient(withInterceptors([authInterceptor,errorInterceptor]))
  ]
};
