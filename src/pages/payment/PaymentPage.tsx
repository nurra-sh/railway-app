
import { Button, Card, Flex, Form, Input, Typography, Radio } from 'antd';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import classes from './PaymentPage.module.css';
import { useLocation, useNavigate } from 'react-router';
import { SafetyOutlined } from '@ant-design/icons';

interface PaymentFormValues {
    cardNumber: string;
    expDate: string;
    cardholder: string;
    cvc: string;
}

export default function PaymentPage() {
    // Получаем сумму из BuyTicketsPage
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm<PaymentFormValues>();

    const amount = location.state?.amountToPay || "0.00";
    
    const onFinish = (values: PaymentFormValues) => {
        console.log("Form is valid! Processing payment for:", values);
        navigate('/success'); 
    };

    const handleCancel = () => {
        navigate('/buy-tickets'); 
    };

    return (
        <div className={classes.pageContainer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
            
            {/* Выводим сумму в тайтл */}
            <Typography.Title level={2} style={{ color: '#6366f1', textAlign: 'center', marginBottom: '40px' }}>
                Pay <span style={{ color: '#ff6b6b' }}>${amount}</span> to confirm booking
            </Typography.Title>

            <Card style={{ width: '100%', maxWidth: '550px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Typography.Title level={3} style={{ margin: 0 }}>Payment Method</Typography.Title>
                <Typography.Text type="secondary">Please enter your payment method</Typography.Text>

                <Form<PaymentFormValues> 
                    form={form} 
                    layout="vertical" 
                    onFinish={onFinish} 
                    style={{ marginTop: '24px' }}
                >
                    {/* Active Credit Card Section */}
                    <div className={classes.creditCardBox} style={{ backgroundColor: '#dce1e8', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
                        <Flex justify="space-between" align="center" style={{ marginBottom: '20px' }}>
                            <Radio checked style={{ fontWeight: 'bold', color: '#000' }}>Credit Card</Radio>
                            <Flex gap="8px">
                                <FaCcVisa size={28} color="#1a1f71" />
                                <FaCcMastercard size={28} color="#eb001b" />
                            </Flex>
                        </Flex>
                        
                        <Flex gap="16px">
                            <Form.Item 
                                label="Card Number" 
                                name="cardNumber" 
                                style={{ flex: 1 }} 
                                rules={[{ required: true, message: 'Please enter card number' }]}
                            >
                                <Input placeholder="0000 0000 0000 0000" size="large" style={{ borderRadius: '8px' }} />
                            </Form.Item>
                            
                            <Form.Item 
                                label="Expiration Date" 
                                name="expDate" 
                                style={{ flex: 1 }} 
                                rules={[{ required: true, message: 'Please enter expiration date' }]}
                            >
                                <Input placeholder="MM / YY" size="large" style={{ borderRadius: '8px' }} />
                            </Form.Item>
                        </Flex>

                        <Flex gap="16px" style={{ marginBottom: '-24px' }}>
                            <Form.Item 
                                label="Cardholder" 
                                name="cardholder" 
                                style={{ flex: 1 }} 
                                rules={[{ required: true, message: 'Please enter cardholder name' }]}
                            >
                                <Input placeholder="Cardholder name" size="large" style={{ borderRadius: '8px' }} />
                            </Form.Item>
                            
                            <Form.Item 
                                label="CVC" 
                                name="cvc" 
                                style={{ flex: 1 }} 
                                rules={[{ required: true, message: 'Please enter CVC' }]}
                            >
                                <Input placeholder="CVC" size="large" style={{ borderRadius: '8px' }} />
                            </Form.Item>
                        </Flex>
                    </div>

                    <Flex vertical align="center" gap="8px" style={{ marginBottom: '24px' }}>
                        <Flex align="center" gap="8px">
                            <SafetyOutlined style={{fontSize: "24px"}}/>
                            <Typography.Text strong>All your data are safe</Typography.Text>
                        </Flex>
                        <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                            Discounts, offers and price concessions will be applied later during payment
                        </Typography.Text>
                    </Flex>

                    <Flex vertical gap="12px">
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            size="large" 
                            style={{ backgroundColor: '#6366f1', borderRadius: '8px', height: '48px', fontWeight: '500' }}
                        >
                            Book Now
                        </Button>
                        <Button 
                            size="large" 
                            onClick={handleCancel} 
                            style={{ borderColor: '#ff6b6b', color: '#ff6b6b', borderRadius: '8px', height: '48px', fontWeight: '500' }}
                        >
                            Cancel
                        </Button>
                    </Flex>
                </Form>
            </Card>
        </div>
    );
}