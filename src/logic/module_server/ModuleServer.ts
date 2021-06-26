import {Module} from "../quiz";

export interface ModuleServer {
    hasModule(id: number): boolean;
    getModule(id: number): Module | undefined;

    /**
     * Generates a new ID and stores the module under that ID.
     * The existing ID of the module object is overwritten.
     * @param module
     */
    addModule(module: Module);

    getAllModules(): Module[];
}
