import Jimp from 'jimp'; 
import path from 'path';
import fs from 'fs/promises';
import { unlink } from 'fs/promises';
import { v2 as cloudinary } from 'cloudinary'; 
import { promisify } from 'util'; 
import userService from '../users/user-service';
import { AVATARS_CLOUD_FOLDER } from '../../lib/constants';

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

class UploadFileService {
    constructor(toLocalOrCloud, file, user) {
        this.toLocalOrCloud = toLocalOrCloud;
        this.pathFile = file.path; 
        this.userId = user.id;
        this.userEmail = user.email;
        this.filename = file.filename;
        this.filePath = file.path;
        this.avatarsFolder = process.env.FOLDER_FOR_AVATARS;
        this.avatarsCloudFolder = AVATARS_CLOUD_FOLDER;
        this.avatarCloudId = user.avatarCloudId; 
        this.uploadToCloud = promisify(cloudinary.uploader.upload); 
    };

    async updateImgAvatar() {
        await this.processingImgAvatar(this.pathFile);
        let userAvatarUrl = null;
        this.toLocalOrCloud ?
            (userAvatarUrl = await this.saveToLocal()) :
            (userAvatarUrl = await this.saveToCloud());
        return userAvatarUrl;
     };
    
    async processingImgAvatar(pathFile) { 
        const pic = await Jimp.read(pathFile);
        await pic.autocrop().cover(240, 240, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(pathFile); 
    };

    async saveToLocal() {

        // const destination = path.join(this.avatarsFolder, this.userId);  //variant with id 
        
        const destination = path.join(this.avatarsFolder, this.userEmail.replace(/@/, "-"));  //variant with email 
       
        await this.removeDirAndAllFiles(destination);

        await fs.mkdir(destination, { recursive: true }); 

        await fs.rename(this.filePath, path.join(destination, this.filename)); 
        
        // const avatarUrl = path.normalize(path.join(this.userId, this.filename));  //variant with id
        
        const avatarUrl = path.normalize(path.join(this.userEmail.replace(/@/, "-"), this.filename));  //variant with email

        await userService.updateAvatar(this.userId, avatarUrl); 

        return avatarUrl;
     };

    async saveToCloud() { 

        const { public_id: returnedAvatarCloudId, secure_url: avatarCloudUrl } = await this.uploadToCloud(
            this.filePath,
            {
                public_id: this.avatarCloudId,
                folder: this.avatarsCloudFolder
            }
        ); 

        const newAvatarCloudId = returnedAvatarCloudId.replace(`${this.avatarsCloudFolder}/`, "");

        await userService.updateAvatar(this.userId, avatarCloudUrl, newAvatarCloudId); 

        await this.removeUploadFile(this.filePath);
        return avatarCloudUrl;
    };

    async removeUploadFile(filePath) {
        try {
            await unlink(filePath);
        } catch (error) {
            console.error(error.message)
        };
    };

    async removeDirAndAllFiles(directory) { 
        try {
           await fs.rmdir(directory, { recursive: true }); 
        } catch (error) {
            console.error(error.message)
        };   
    };
};

export default UploadFileService; 
