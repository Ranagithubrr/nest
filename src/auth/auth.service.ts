import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private allUsers = [];

  register(userData: any) {
    if (!userData.name || !userData.email) {
      return { message: 'Name and email are required!' };
    }

    this.allUsers.push(userData);

    return {
      message: 'User registered successfully',
      users: this.allUsers,
    };
  }

  getAllUsers() {
    return this.allUsers;
  }
}
