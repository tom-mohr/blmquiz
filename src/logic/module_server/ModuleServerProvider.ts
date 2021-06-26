import {ModuleServer} from "./ModuleServer";
import {ModuleServerMock} from "./ModuleServerMock";

export class ModuleServerProvider {

    private static instance: ModuleServer = new ModuleServerMock();

    public static getServer(): ModuleServer {
        return ModuleServerProvider.instance;
    }
}