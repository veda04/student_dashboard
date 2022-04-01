import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.class';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    update(id: number, user: User) {
        return this.http.post(`/users/${id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }
}