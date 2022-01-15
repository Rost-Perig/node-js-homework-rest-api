import { jest } from '@jest/globals';
import authControllers from './auth-controllers';
import userService from '../../services/users/user-service';
import authService from '../../services/auth/auth-service';
import { httpCodes, Messages } from '../../lib/constants';

describe('Unit test registration', () => {
    let req, res, next;
    beforeEach(() => {
        req = { body: { email: 'test@test.com', password: '1234' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(data => data) };
        next = jest.fn();
        userService.create = jest.fn(async data => data);
    });
    test('SingUp new User', async () => {
        authService.isUserExist = jest.fn(async () => false);
        await authControllers.registration(req, res, next);
        expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
        expect(res.status).toHaveBeenCalledWith(httpCodes.CREATED);
    });
    test('SingUp User exist', async () => {
        authService.isUserExist = jest.fn(async () => true);
        await authControllers.registration(req, res, next);
        expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
        expect(res.status).toHaveBeenCalledWith(httpCodes.CONFLICT);
    });
    test('SingUp with error database', async () => {
        const testError = new Error('Database Error')
        authService.isUserExist = jest.fn(async () => {throw testError});
        await authControllers.registration(req, res, next);
        expect(authService.isUserExist).toHaveBeenCalledWith(req.body.email);
        expect(next).toHaveBeenCalledWith(testError);
    });
});

describe('Unit test login', () => {
    let req, res, next, tok, user;
    beforeEach(() => {
        req = { body: { email: 'test@test.com', password: '1234' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(data => data) };
        next = jest.fn();
        tok = 'token';
        user = { id: '43rew21' }; 
    });
    
    test('SingUp dont get user', async () => {
        authService.getUser = jest.fn(async () => false);
        await authControllers.login(req, res, next);
        expect(res.status).toHaveBeenCalledWith(httpCodes.UNAUTHORIZED);
    });

    test('SingUp set token', async () => {
        authService.getUser = jest.fn(async () => user);
        authService.getToken = jest.fn( () => 'token');
        authService.updateToken = jest.fn(async data => data);
        await authControllers.login(req, res, next);
        expect(authService.getToken).toHaveBeenCalledWith(user);
        expect(authService.updateToken).toHaveBeenCalledWith(user.id, tok);
        expect(res.status).toHaveBeenCalledWith(httpCodes.OK);
    });

    test('SingUp with error database', async () => {
        const testError = new Error('Database Error')
        authService.getToken = jest.fn(async () => {throw testError});
        await authControllers.registration(req, res, next);
    });
});

describe('Unit test logout', () => {
    let req, res, next;
    beforeEach(() => {
        req = { user: { id: '12qwe34'} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(data => data) };
        next = jest.fn();
    });
    
    test('SingUp logout user', async () => {
        authService.updateToken = jest.fn(async data => data);;
        await authControllers.logout(req, res, next);
        expect(res.status).toHaveBeenCalledWith(httpCodes.NO_CONTENT);
    });

    test('SingUp with error database', async () => {
        const testError = new Error('Database Error')
        authService.updateToken = jest.fn(async () => {throw testError});
        await authControllers.logout(req, res, next);
        expect(authService.updateToken).toHaveBeenCalledWith(req.user.id, null);
        expect(next).toHaveBeenCalledWith(testError);
    });
});
