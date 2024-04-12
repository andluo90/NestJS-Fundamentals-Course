import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression,SchedulerRegistry } from '@nestjs/schedule';



@Injectable()
export class CronService {
    constructor(private readonly httpService: HttpService) {}

    @Cron(CronExpression.EVERY_30_SECONDS,{name:'fetchGoldPrice'})
    async handleCron() {
        
      console.log(`Called every 30 seconds`);

      try {
        const response = await this.httpService.get("https://www.5huangjin.com/data/jin.js", {
          headers: {
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "script",
            "sec-fetch-mode": "no-cors", // Likely won't work due to CORS restrictions
            "sec-fetch-site": "same-origin",
            "cookie": "__vtins__1zDTZ9sDDRQwNnWh=%7B%22sid%22%3A%20%22a45cceb0-de16-54d1-a4ea-1cf9263e217a%22%2C%20%22vd%22%3A%201%2C%20%22stt%22%3A%200%2C%20%22dr%22%3A%200%2C%20%22expires%22%3A%201712897223817%2C%20%22ct%22%3A%201712895423817%7D; __51uvsct__1zDTZ9sDDRQwNnWh=1; __51vcke__1zDTZ9sDDRQwNnWh=89d88960-da16-568c-80b7-037db920c86a; __51vuft__1zDTZ9sDDRQwNnWh=1712895423826; __gads=ID=336c10d8f86552d6:T=1712894744:RT=1712895424:S=ALNI_MbI7iQxwumfTAuZeE3FKyVKgAWXSA; __gpi=UID=00000de9d7e39975:T=1712894744:RT=1712895424:S=ALNI_MaChKsBoB4Nc_bkzU426W0DPWqyPA; __eoi=ID=ac8137872145d5d1:T=1712894744:RT=1712895424:S=AA-AfjaYQxZFZGk-b4nHQC8hx_1X",
            "Referer": "https://www.5huangjin.com/cn/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
          }
        }).toPromise();
    
        const text:any = response.data;
        console.log(text);
        
        const lines = text.split('\n');
    
        // Process lines as before
        lines.forEach(line => {
          if (line.startsWith('var hq_str_gds_AUTD')) {
            console.log(line);
    
            let prices = line.split('=')[1].replace('"','').split(',');
            prices.forEach(price => {
              console.log(price);
            });
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    }

}
