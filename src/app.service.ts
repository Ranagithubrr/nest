import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApplicationRunning() {
    return 'Backend is running';
  }
}
