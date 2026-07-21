import { Flex, Typography } from "antd"
import useTrainsStore from "../../modules/trains/store/useTrainsStore"
import TrainCard from "../../modules/trains/ui/TrainCard"
import classes from './BuyTIcketsPage.module.css'
import PassengerInfoCard from "../../modules/passengers/ui/PassengerInfoCard"

export default function BuyTicketsPage() {
  const { selectedTrain, selectedInfo } = useTrainsStore()

  return (
    <div>
      <Typography.Title className={classes.title}>Review your booking</Typography.Title>

      <div style={{ marginBottom: '50px' }}>
        {selectedTrain && <TrainCard segment={selectedTrain} />}
      </div>

      <Flex vertical gap='medium'>
        {Array.from({ length: selectedInfo?.numberOfPassengers ?? 0 }).map((_, index: number) => (
          <PassengerInfoCard key={index} index={index} />
        ))}
      </Flex>
    </div>
  )
}