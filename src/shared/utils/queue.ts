const defaultConfig = {
  concurrentTasks: {
    quantity: 3,
    interval: 0,
  },
  retries: 0,
};

export class Queue<T> {
  private config: Readonly<IQueueConfig>;
  private tasks: ITask<T>[] = [];
  private promiseCallbacks: IPromiseCallbacks<T>;
  private status: QueueStatus = 'stopped';
  private lastResolvedTime: number = 0;

  constructor(data: T[], config?: Partial<IQueueConfig>) {
    this.config = { ...defaultConfig, ...(config || {}) };

    this.promiseCallbacks = {
      resolve: () => ({}),
      reject: () => ({}),
    };

    this.tasks = data.map(this.createTask);
  }

  public enqueue(data: T[]) {
    if (this.status === 'finished') throw new Error('Queue already finished');
    this.tasks.push(...data.map(this.createTask));

    return this;
  }

  public start(resolver: Resolver<T>) {
    if (this.status === 'running') throw new Error('Queue already running');

    return new Promise((res, rej) => {
      this.promiseCallbacks.resolve = res;
      this.promiseCallbacks.reject = rej;
      this.loop(resolver);
    });
  }

  private loop(resolver: Resolver<T>) {
    this.status = 'running';
    let runningCount = 0;

    const runTask = (): any => {
      if (Date.now() < this.lastResolvedTime + this.config.concurrentTasks.interval) {
        return new Promise(resolve => setTimeout(() => resolve(runTask()), this.config.concurrentTasks.interval));
      }

      if (runningCount >= this.config.concurrentTasks.quantity) {
        this.lastResolvedTime = Date.now();
        return () => ({});
      }

      const task = this.tasks.find(e => e.status === 'waiting');

      if (task) {
        runningCount += 1;
        task.status = 'running';
        task.attempts += 1;

        resolver(task.data)
          .then(() => (task.status = 'finished'))
          .catch(() => {
            task.status = task.attempts <= this.config.retries ? 'waiting' : 'failed';
          })
          .finally(() => {
            runningCount -= 1;
            runTask();
          });

        runTask();
      }

      if (!runningCount) this.finishedQueueProcessing();
      return () => ({});
    };

    runTask();
  }

  private createTask(data: T): ITask<T> {
    return { attempts: 0, status: 'waiting', data };
  }

  finishedQueueProcessing() {
    this.status = 'finished';

    this.promiseCallbacks.resolve({
      all: this.tasks.map(e => e.data),
      resolved: this.tasks.filter(e => e.status === 'finished').map(e => e.data),
      rejected: this.tasks.filter(e => e.status === 'failed').map(e => e.data),
    });
  }
}

type IQueueConfig = typeof defaultConfig;

interface IQueueResponse<T> {
  all: T[];
  resolved: T[];
  rejected: T[];
}

type QueueStatus = 'running' | 'stopped' | 'finished';

type Resolver<T> = (data: T) => Promise<void>;

type TaskStatus = 'running' | 'waiting' | 'failed' | 'finished';

interface ITask<T> {
  attempts: number;
  status: TaskStatus;
  data: T;
}

interface IPromiseCallbacks<T> {
  resolve: (data: IQueueResponse<T>) => void;
  reject: (error: Error) => void;
}
