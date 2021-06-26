import {Module} from "../quiz";
import {ModuleServer} from "./ModuleServer";
import {exampleModules} from "../examples";

/**
 * A dummy implementation of the ModuleServer interface that stores modules locally instead of on a real server.
 */
export class ModuleServerMock implements ModuleServer {

    private modules: Module[] = [];

    constructor() {
        exampleModules.forEach(module => this.addModule(module));
    }

    getModule(id: number): Module | undefined {
        if (this.hasModule(id)) {
            return this.modules[id];
        }
        return undefined;
    }

    hasModule(id: number): boolean {
        return id >= 0 && id < this.modules.length;
    }

    public addModule(module: Module): void {
        module.id = this.modules.length;
        this.modules.push(module);
    }

    getAllModules(): Module[] {
        return this.modules.slice();
    }
}
