/*контроллер загрузки аватарок-изображений */

import { httpCodes, TO_LOCAL_OR_CLOUD } from '../../lib/constants';
import UploadFileService from '../../services/file-storage/upload-file-service';

class UploadControllers {
    
    async uploadAvatar(req, res, next) {
        try {
            const uploadFileService = new UploadFileService(TO_LOCAL_OR_CLOUD, req.file, req.user);
            const avatarUrl = await uploadFileService.updateImgAvatar();
            res.status(httpCodes.OK).json({ status: 'success', code: httpCodes.OK, data: { avatarUrl } }); 
        } catch (err) {
            next(err)
        };
    };
};

const uploadControllers = new UploadControllers;

export default uploadControllers;