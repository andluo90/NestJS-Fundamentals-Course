import {registerAs} from '@nestjs/config'

export default registerAs('file',()=>{
    return {
        musciDirectory:process.env.MUSIC_DIRCTORY,
    }
})