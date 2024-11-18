import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];

    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level: level,
      },
    });

    console.log("Postgres saved")
  }
  
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const level = severityEnum[severityLevel];
    const dbLogs = await prismaClient.logModel.findMany({
      where:{level}
    })

    // Cuando tenemos una serie de argumentos y son enviados a una funcion en el mismo orden, se pude enviar asi
  // return dbLogs.map(LogEntity.fromObject);
    return dbLogs.map(dbLog => LogEntity.fromObject(dbLog));

  }
}
