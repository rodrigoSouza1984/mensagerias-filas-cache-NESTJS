import { BullRootModuleOptions, InjectQueue, SharedBullConfigurationFactory } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import * as config from "./config-bull";


@Injectable()
export class ConfigBullProvider implements SharedBullConfigurationFactory{

    createSharedConfiguration(): BullRootModuleOptions | Promise<BullRootModuleOptions> {
        return config as any
    }

}