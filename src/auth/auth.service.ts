import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor() { }

    login() {
        return "Login Successful";
    }

    logout() {
        return "Logout Successful";
    }
}
