import { JobQueue } from '@core/queue/job-queue';
import { QUEUE } from '@constant/queue';

export class FooBar extends JobQueue<any> {
    constructor() {
        super();
        this.queue = QUEUE.DEFAULT;
    }

    public async handle(): Promise<void> {
        return;
    }
}
