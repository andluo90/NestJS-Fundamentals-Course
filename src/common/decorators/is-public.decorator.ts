import { SetMetadata } from '@nestjs/common';

export const IsPublic = (arg: boolean) => {
    console.log(`arg`,arg);
    
    return SetMetadata('isPublic', arg)
};
