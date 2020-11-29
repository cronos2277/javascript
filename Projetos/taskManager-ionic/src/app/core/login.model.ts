import {Providers} from './providers.enum'
import {User} from './user.model';
export interface Login{
    isSignIn:boolean,
    provider:Providers,
    user:User
}