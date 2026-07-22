import PassengerInfoCard, { type PassengerInfoFormValues } from "../../modules/passengers/ui/PassengerInfoCard"
import useTrainsStore from "../../modules/trains/store/useTrainsStore"
import TrainCard from "../../modules/trains/ui/TrainCard"
import classes from './BuyTicketsPage.module.css'
import { Button, Card, Flex, Form, Input, Tag, Typography, Divider } from "antd"
import food1Image from '../../assets/images/food1.webp'
import food2Image from '../../assets/images/food2.jpg'
import food3Image from '../../assets/images/food3.jpg'
import { BiSolidDiscount } from "react-icons/bi"
import { useNavigate } from "react-router"

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

  // UseWatch для Bill Payements
  const foodState = Form.useWatch('food', { form, preserve: true }) ?? [];
  const extraBaggageState = Form.useWatch('extraBaggage', { form, preserve: true }) ?? false;
  const promoCodeState = Form.useWatch('promoCode', { form, preserve: true });

  // Контстанты
  const BASE_TICKET_FARE = 1000;
  const EXTRA_BAGGAGE_FEE = 500;

  // --- Bill Calculations ---
  const passengerCount = selectedInfo?.numberOfPassengers ?? 1;
  const totalBaseFare = passengerCount * BASE_TICKET_FARE;

  // Strips the "$"  out of the string so we can do math with it
  const totalFood = foodState
    .filter((f) => f.isAdded)
    .reduce((sum, f) => sum + Number(f.price.replace(/[^0-9.-]+/g, "")), 0);

  const baggageFee = extraBaggageState ? EXTRA_BAGGAGE_FEE : 0;
  const subtotal = totalBaseFare + totalFood + baggageFee;

  let discountAmount = 0;
  const appliedOffer = offersInfo.find((o) => o.code === promoCodeState);

  if (appliedOffer) {
    discountAmount = (subtotal * appliedOffer.percentage) / 100;
    // Cap the discount if a limit exists (e.g., up to $100)
    if (appliedOffer.limit && discountAmount > appliedOffer.limit) {
      discountAmount = appliedOffer.limit;
    }
  }

  const VAT_RATE = 0.16; // 12% НДС в Казахстане

  // Считаем НДС от промежуточной суммы (subtotal)
  const taxAmount = subtotal * VAT_RATE;

  // Итоговая сумма с учетом НДС и скидки
  const finalTotal = subtotal + taxAmount - discountAmount;


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
  
  const navigate = useNavigate();

  // Create a submission handler
  const handleProceedToPayment = () => {
      // Only proceed if form is valid (Ant Design will handle validation if you use a submit button, 
      // but since you are manually navigating, you can trigger this on click)
      navigate('/payment', { 
          state: { amountToPay: finalTotal.toFixed(2) } 
      });
  };

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
              {foodState.find((f) => f.id === food.id)?.isAdded && (
                <Button variant="outlined" color="red" className={classes.foodButton} onClick={() => handleRemoveFood(food.id)}>Remove</Button>
              )}
              {!foodState.find((f) => f.id === food.id)?.isAdded && (
                <Button variant="outlined" color="geekblue" type="primary" className={classes.foodButton} onClick={() => handleAddFood(food.id)}>Add to ticket</Button>
              )}
            </Card>
          ))}
        </Flex>

        <div className={classes.offersCard}>
          <Typography.Title level={2} className={classes.offersTitle}>Offers</Typography.Title>

          {offersInfo.map((offer, index) => (
            <Flex key={`offer-${index}`} align="center" justify="space-between" style={{ marginBottom: '10px' }}>
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

        {/* --- NEW BILL DETAILS CARD --- */}
        <Card style={{ marginTop: '32px' }}>
          <Typography.Title level={3} style={{ marginBottom: '24px' }}>
            Bill details
          </Typography.Title>

          <Flex justify="space-between" style={{ marginBottom: '12px' }}>
            <Typography.Text type="secondary">Base Ticket Fare</Typography.Text>
            <Typography.Text>${totalBaseFare.toFixed(2)}</Typography.Text>
          </Flex>

          {/* Dynamically render added food items */}
          {foodState.filter(f => f.isAdded).map((food) => (
            <Flex justify="space-between" key={`bill-food-${food.id}`} style={{ marginBottom: '12px' }}>
              <Typography.Text type="secondary">{food.title}</Typography.Text>
              <Typography.Text>
                ${Number(food.price.replace(/[^0-9.-]+/g, "")).toFixed(2)}
              </Typography.Text>
            </Flex>
          ))}

          {/* Extra Baggage - Conditional */}
          {extraBaggageState && (
            <Flex justify="space-between" style={{ marginBottom: '12px' }}>
              <Typography.Text type="secondary">Extra Baggage</Typography.Text>
              <Typography.Text>${EXTRA_BAGGAGE_FEE.toFixed(2)}</Typography.Text>
            </Flex>
          )}

          <Flex justify="space-between" style={{ marginBottom: '12px' }}>
            <Typography.Text type="secondary">НДС (16%)</Typography.Text>
            <Typography.Text>${taxAmount.toFixed(2)}</Typography.Text>
          </Flex>

          {/* Discount - Conditional */}
          {appliedOffer && (
            <Flex justify="space-between" style={{ marginBottom: '12px' }}>
              <Typography.Text type="secondary">Discount</Typography.Text>
              <Typography.Text style={{ color: '#52c41a' }}>-${discountAmount.toFixed(2)}</Typography.Text>
            </Flex>
          )}

          <Divider />

          <Flex justify="space-between" align="center">
            <Typography.Title level={4} style={{ margin: 0 }}>Total Charge</Typography.Title>
            <Typography.Title level={4} style={{ margin: 0 }}>${finalTotal.toFixed(2)}</Typography.Title>
          </Flex>
        </Card>
        <Flex justify="center">
        <Button
            type="primary" 
            size="large" 
            onClick={handleProceedToPayment}
            style={{ width: '62.5%', marginTop: '40px', backgroundColor: '#9254de', height: '56px' }}
        >
            Book Now
        </Button>
        </Flex>
      </Form>
    </div>
  )
}