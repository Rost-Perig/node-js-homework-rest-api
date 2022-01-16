import contactService from '../../services/contacts/contact-service';
import { httpCodes, Messages, Role } from '../../lib/constants';

const {list, getById, remove, add, update } = contactService;

class ContactControllers { 

    async getContacts(req, res, next) {
        try {
            console.log('req.user.role=', req.user.role);
            const isAdmin = (req.user.role === Role.ADMIN);
            const { id: userId } = req.user; 
            const contacts = await list(userId, req.query, isAdmin);
            res.status(httpCodes.OK).json({ status: 'success', code: httpCodes.OK, data: { ...contacts } });
        } catch (error) {
            next(err)
        };
    };

    async getContact(req, res, next) {
        try {
            const { id } = req.params;
            const isAdmin = (req.user.role === Role.ADMIN); 
            const { id: userId } = req.user; 
            const contact = await getById(userId, id, isAdmin);
            contact ?
                res.status(httpCodes.OK).json( {status: 'success', code: httpCodes.OK, data: {contact}} ) : 
                res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')]});
        } catch (error) {
            next(err)
        };
    };

    async delContact(req, res, next) {
        try {
            const { id } = req.params;
            const isAdmin = (req.user.role === Role.ADMIN);
            const { id: userId } = req.user;  
            const deletedContact = await remove(userId, id, isAdmin);
            deletedContact ?
                res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: {deletedContact}}) :
                res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')] });  
        } catch (error) {
            next(err)
        }; 
    };

    async postContact(req, res, next) {
        try {
            const { id: userId } = req.user; 
            const newContact = await add(userId, req.body);
            res.status(httpCodes.CREATED).json( {status: 'success', code: httpCodes.CREATED, data: {newContact}} );
        } catch (error) {
            next(err)
        };
    };

    async putContact(req, res, next) {
        try {
           const { id } = req.params;
            const isAdmin = (req.user.role === Role.ADMIN); 
            const { id: userId } = req.user; 
            const contact = await update(userId, id, req.body, isAdmin);
            contact ?
                res.status(httpCodes.OK).json( {status: 'success', code: httpCodes.OK, data: {contact}} ) :
                res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')]}); 
        } catch (error) {
            next(err)
        };
    };
};

const contactControllers = new ContactControllers;

export default contactControllers;