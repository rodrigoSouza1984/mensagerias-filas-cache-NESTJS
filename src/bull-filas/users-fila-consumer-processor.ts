import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { UserBullService } from "src/user-bull/user-bull.service";
import * as fs from 'fs';

@Processor("users")
export class UserFilasProcessor {

    constructor(private userBullService: UserBullService) { }

    @Process('users-job')
    async processarFilaDeUsuarios(job: Job) {
        if(job.attemptsMade < 3){
            await this.userBullService.saveUserInDatabase(job.data)
        }else{

            let datasFalhada: any[] = [];
                if (fs.existsSync('trabalhos_falhado_users_job.json')) {
                    const fileData = fs.readFileSync('trabalhos_falhado_users_job.json', 'utf8');
                    datasFalhada = JSON.parse(fileData);
                }

            let dataFalhada = {
                trabalhoType: 'users-job fila, add users na base',
                user:job.data 
            }

            datasFalhada.push(dataFalhada);            

            fs.writeFileSync('trabalhos_falhado_users_job.json', JSON.stringify(datasFalhada, null, 2)); 
        }
    }

}

