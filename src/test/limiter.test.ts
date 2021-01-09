import 'reflect-metadata';
import { Limiter } from 'interfaces';
import MyLimiter from 'limiter';

describe('Limiter', () => {
  const limiter:Limiter = new MyLimiter();
  it('init', () => {
    limiter.init({ delay: 100, max: 3 });
  });

  it('정상', async () => {
    limiter.validate('127.0.0.1');
    limiter.validate('127.0.0.1');
    limiter.validate('127.0.0.1');
    await new Promise<void>((r) => { setTimeout(() => r(), 100); });
    limiter.validate('127.0.0.1');
    limiter.validate('127.0.0.1');
    limiter.validate('127.0.0.1');
    await new Promise<void>((r) => { setTimeout(() => r(), 100); });
    limiter.validate('127.0.0.1');
    limiter.validate('127.0.0.1');
    limiter.validate('127.0.0.1');
    limiter.validate('127.0.0.2');
    limiter.validate('127.0.0.2');
    limiter.validate('127.0.0.2');
    limiter.validate('127.0.0.3');
    limiter.validate('127.0.0.3');
    limiter.validate('127.0.0.3');
  });

  it('비정상', async () => {
    try {
      limiter.validate('127.0.0.1');
      await new Promise<void>((r) => { setTimeout(() => r(), 10); });
      limiter.validate('127.0.0.1');
      await new Promise<void>((r) => { setTimeout(() => r(), 10); });
      limiter.validate('127.0.0.1');
      limiter.validate('127.0.0.1');
    } catch {
      return;
    }
    fail();
  });
});