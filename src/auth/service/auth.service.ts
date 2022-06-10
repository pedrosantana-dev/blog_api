import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    
    constructor(private readonly jwtService: JwtService) {}

    generateJWT(payload: Object): Observable<string> {
        return from(this.jwtService.signAsync({user: payload}));
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePasswords(newPassowrd: string, passwordHash: string): Observable<any | boolean> {
        return of<any | boolean>(bcrypt.compare(newPassowrd, passwordHash));
    }

}
