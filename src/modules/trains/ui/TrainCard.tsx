import { Card, Flex, Tag, Typography } from "antd";
import type { TrainScheduleSegment } from "../api/trains.api.types";
import classes from "./TrainCard.module.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function formatScheduleTime(isoTime: string): string {
  const parsed = dayjs(isoTime, "HH:mm:ss", true);
  return parsed.isValid() ? parsed.format("HH:mm") : isoTime;
}

function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export default function TrainCard({ segment }: { segment: TrainScheduleSegment }) {
  const { thread, from, to, departure, arrival, start_date, days, duration } = segment;
  return (
    <Card title={
      <Flex gap="small" justify="space-between">
        <span>{thread.number} - {thread.title}</span>
        <Tag color="blue">{start_date ? `${dayjs(start_date).format('DD.MM.YYYY')}` : ""}</Tag>
      </Flex>
    }>
      <Tag color="green" style={{ marginBottom: '10px' }}>{days}</Tag>
      <Typography.Title level={3} className={classes.trainTitle}>{thread.carrier.title}</Typography.Title>
      <div className={classes.trainSchedule}>
        <Flex vertical gap="small">
          <span>{from.title}</span>
          <span>{formatScheduleTime(departure)}</span>
        </Flex>
        <div className={classes.trainScheduleDuration}>{formatDuration(duration)}</div>
        <Flex vertical gap="small" className={classes.trainScheduleArrival}>
          <span>{to.title}</span>
          <span>{formatScheduleTime(arrival)}</span>
        </Flex>
      </div>
    </Card>
  );
}