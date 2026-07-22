import PassengerInfoCard, { type PassengerInfoFormValues } from "../../modules/passengers/ui/PassengerInfoCard"
import useTrainsStore from "../../modules/trains/store/useTrainsStore"
import TrainCard from "../../modules/trains/ui/TrainCard"
import classes from './BuyTicketsPage.module.css'
import { Button, Card, Flex, Form, Input, Tag, Typography } from "antd"
import food1Image from '../../assets/images/food1.webp'
import food2Image from '../../assets/images/food2.jpg'
import food3Image from '../../assets/images/food3.jpg'
import { BiSolidDiscount } from "react-icons/bi"

interface TicketFormValues {
    passengers: PassengerInfoFormValues[];
    food: FoodInfo[];
    promoCode: string;
    extraBaggage: boolean;
}

interface FoodInfo {
    id: number;
    title: string;
    price: string;
    image: string;
    isAdded: boolean;
}

// name="passenger 0 fullname"
// name="passenger 0 phoneNumber"
// name="passenger 0 email"
// name="passenger 0 dateOfBirth"

// name="passenger 1 fullname"
// name="passenger 1 phoneNumber"
// name="passenger 1 email"
// name="passenger 1 dateOfBirth"

const foodCardsInfo: FoodInfo[] = [
    {
        id: 1,
        title: "Пельмени",
        price: "$12",
        image: food1Image,
        isAdded: false,
    },
    {
        id: 2,
        title: "Бешбармак",
        price: "$20",
        image: food2Image,
        isAdded: false,
    },
    {
        id: 3,
        title: "Борщ",
        price: "$15",
        image: food3Image,
        isAdded: false,
    }
]

const offersInfo: OffersInfo[] = [
    {
        id: 1,
        title: "50% off up to $100 | Use code BOOKNOW",
        percentage: 50,
        limit: 100,
        code: "BOOKNOW",
    },
    {
        id: 2,
        title: "20% off | Use code FIRSTTIME",
        percentage: 20,
        code: "FIRSTTIME",
    }
]

interface OffersInfo {
    id: number;
    title: string;
    percentage: number;
    limit?: number;
    code: string;
}

export default function BuyTicketsPage() {
    const { selectedTrain, selectedInfo } = useTrainsStore()
    const [form] = Form.useForm<TicketFormValues>()

    const foodState = Form.useWatch('food', { form, preserve: true }) ?? [];
    const extraBaggageState = Form.useWatch('extraBaggage', { form, preserve: true }) ?? false;

    function handleAddFood(id: number) {
        const nextFood = foodState.map((f: FoodInfo) =>
            f.id === id ? { ...f, isAdded: true } : f
        );
        form.setFieldsValue({ food: nextFood });
    }

    function handleRemoveFood(id: number) {
        const nextFood = foodState.map((f: FoodInfo) =>
            f.id === id ? { ...f, isAdded: false } : f
        );
        form.setFieldsValue({ food: nextFood });
    }

    function handleApplyPromoCode(code: string) {
        form.setFieldsValue({ promoCode: code });
    }

    function handleRemoveExtraBaggage() {
        form.setFieldsValue({ extraBaggage: false });
    }

    function handleAddExtraBaggage() {
        form.setFieldsValue({ extraBaggage: true });
    }

    return (
        <div>
            <Typography.Title className={classes.title}>Review your booking</Typography.Title>

            <div style={{ marginBottom: '50px' }}>
                {selectedTrain && <TrainCard segment={selectedTrain} />}
            </div>

            <Form<TicketFormValues>
                form={form}
                layout="vertical"
                initialValues={{ passengers: [], food: foodCardsInfo, promoCode: '', extraBaggage: false }}
            >
                <Flex vertical gap="medium">
                    {Array.from({ length: selectedInfo?.numberOfPassengers ?? 0 }).map((_, index) => (
                        <PassengerInfoCard key={index} index={index} />
                    ))}
                </Flex>


                <Flex gap="32px" wrap="wrap" style={{ marginTop: '50px' }}>
                    {foodCardsInfo.map((food, index) => (
                        <Card
                            key={index}
                            classNames={{ body: classes.foodCard }}
                            hoverable
                            style={{ flex: '1 1 100px' }}
                            cover={
                                <img
                                    draggable={false}
                                    height={150}
                                    alt={food.title}
                                    src={food.image}
                                    className={classes.foodImage}
                                />
                            }
                        >
                            <Typography.Title className={classes.foodTitle} level={2}>{food.title}</Typography.Title>
                            <Tag color="blue" className={classes.foodPrice}>{food.price}</Tag>
                            {foodState.find((f) => f.id === food.id)?.isAdded && <Button variant="outlined" color="red" className={classes.foodButton} onClick={() => handleRemoveFood(food.id)}>Remove</Button>}
                            {!foodState.find((f) => f.id === food.id)?.isAdded && <Button variant="outlined" color="geekblue" type="primary" className={classes.foodButton} onClick={() => handleAddFood(food.id)}>Add to ticket</Button>}
                        </Card>
                    ))}
                </Flex>
                <div className={classes.offersCard}>
                    <Typography.Title level={2} className={classes.offersTitle}>Offers</Typography.Title>

                    {offersInfo.map((offer) => (
                        <Flex align="center" justify="space-between" style={{ marginBottom: '10px' }}>
                            <Flex align="center" gap="10px">
                                <BiSolidDiscount size={24} color="#9254de" /> <Typography.Title level={3} className={classes.offersText}>{offer.title}</Typography.Title>
                            </Flex>
                            <Button variant="text" color="purple" type="primary" className={classes.offersButton} onClick={() => handleApplyPromoCode(offer.code)}>Apply</Button>
                        </Flex>
                    ))}
                </div>

                <Flex align="center" gap="32px">
                    <Card style={{ flex: 1 }}>
                        <Typography.Title className={classes.codeTitle} level={2}>Apply Code</Typography.Title>
                        <Form.Item name="promoCode" rules={[{ required: true, message: 'Please enter a promo code' }]}>
                            <Input variant="underlined" placeholder="Enter code" />
                        </Form.Item>
                    </Card>
                    <Card style={{ flex: 1 }}>
                        <Typography.Title className={classes.extraBaggageTitle} level={2}>Extra Baggage</Typography.Title>
                        {extraBaggageState && <Button variant="outlined" color="red" type="primary" onClick={handleRemoveExtraBaggage}>Remove from ticket</Button>}
                        {!extraBaggageState && <Button variant="outlined" color="purple" type="primary" onClick={handleAddExtraBaggage}>Add to ticket</Button>}
                    </Card>
                </Flex>
            </Form>
        </div>
    )
}