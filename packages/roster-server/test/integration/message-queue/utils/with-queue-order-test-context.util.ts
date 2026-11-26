import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { v4 as generateUuid } from 'uuid';

import { BullMQDriver } from 'src/engine/core-modules/message-queue/drivers/bullmq.driver';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { MetricsService } from 'src/engine/core-modules/metrics/metrics.service';
import { rosterConfigService } from 'src/engine/core-modules/roster-config/roster-config.service';

export const withQueueOrderTestContext = async (
  run: (driver: BullMQDriver) => Promise<void>,
) => {
  const connection = new IORedis(
    process.env.REDIS_QUEUE_URL ??
      process.env.REDIS_URL ??
      'redis://localhost:6379',
    { maxRetriesPerRequest: null },
  );
  const options = { connection, prefix: `queue-order-${generateUuid()}` };
  const queues = [MessageQueue.workflowQueue, MessageQueue.delayedJobsQueue];
  const inspectionQueues = queues.map((name) => new Queue(name, options));
  const module = await Test.createTestingModule({
    providers: [
      {
        provide: MetricsService,
        useValue: {
          recordHistogram: jest.fn(),
          incrementCounterForEvent: jest.fn(),
        },
      },
      {
        provide: rosterConfigService,
        useValue: { get: () => undefined },
      },
      { provide: EventEmitter2, useValue: new EventEmitter2() },
      {
        provide: BullMQDriver,
        useFactory: (
          metrics: MetricsService,
          config: rosterConfigService,
          events: EventEmitter2,
        ) => new BullMQDriver(options, metrics, config, events),
        inject: [MetricsService, rosterConfigService, EventEmitter2],
      },
    ],
  }).compile();
  const driver = module.get(BullMQDriver);

  queues.forEach((queue) => driver.register(queue));

  try {
    await run(driver);
  } finally {
    await driver.onModuleDestroy();
    for (const queue of inspectionQueues) {
      await queue.obliterate({ force: true });
      await queue.close();
    }
    await connection.quit();
    await module.close();
  }
};
