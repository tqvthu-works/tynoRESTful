import { Command } from 'commander';

/* Any Object */
export interface AnyObject {
    [key: string]: any;
}

export interface IResult<D = any> {
    status: boolean;
    data: D;
}

/* For Queue */
export interface IJobData<T = AnyObject> {
    job_path: string;
    data: T;
}

/* For Console Command */
export interface ICommand {
    handle(program: Command): Promise<any>;
}

export interface ServiceProvider {
    register(): void;
    boot(): Promise<void>;
}
