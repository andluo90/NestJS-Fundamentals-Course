import { registerAs } from '@nestjs/config';

interface EmailConfig {
  username:string
  password:string
}

export {
    EmailConfig
}

export default registerAs('email', ():EmailConfig => {
    if(process.env.EMAIL_NAME){
        return {
            username: process.env.EMAIL_NAME || '',
            password:process.env.EMAIL_PASSWORD || ''
        }
    }else{
        console.error(`emailUserName empty`);
        return {
            username: '',
            password:''
        }
    }
    
}
);
