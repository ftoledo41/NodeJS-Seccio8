import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email-service";
import { SenEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource());

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started......");

    // new SenEmailLogs(emailService, fileSystemLogRepository).excute(
    //   ["franciscojaviertoledocollante",
    //   "franciscojaviertoledocollante"]
    // );

    // emailService.sendEmail({
    //   to: "damaconcagua",
    //   subject: "Logs de sistema",
    //   htmlBody: `<h3>Logs de sistema -- NOC</h3>
    //   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula laoreet tincidunt. Suspendisse potenti. Curabitur scelerisque augue nec dui tristique, eget iaculis magna condimentum. </p>
    //   <p>Ver los adjunto</p>
    //   `,
    // });

    // const logs = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);

    // console.log(envs.MAILER_SECRET_KEY);
    // CronService.createJob("*/5 * * * * *", () => {

    //   const url = "hasasasttp://google.com";

    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://google.com";

      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository,postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
