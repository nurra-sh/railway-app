import { Card, DatePicker, Form, Input } from "antd";
import { useForm, type FormProps } from "antd/es/form/Form";
import classes from './passengers.module.css';
import { PatternFormat } from "react-number-format";

interface PassengerInfoFormValues {
    fullname: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string;
}

export default function PassengerInfoCard({ index }: { index: number }) {
    const [form] = useForm<PassengerInfoFormValues>()

    function onFinish(values: PassengerInfoFormValues) {
        console.log('Success:', values)
    }
    const onFinishFailed: FormProps<PassengerInfoFormValues>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card size="small" title={`Passenger Info ${index + 1}`}>
            <Form<PassengerInfoFormValues> className={classes.passengerInfoForm} size='middle' form={form} name="passengerInfoForm" onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                <Form.Item name="fullname" label="Full name" rules={[{ required: true, message: 'Please enter your full name' }]}>
                    <Input variant="filled" placeholder="Enter your full name" />
                </Form.Item>
                <Form.Item name="phoneNumber" label="Phone number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                    <PatternFormat
                        format='+7 (###) ### ## ##'
                        mask='_'
                        customInput={Input}
                        placeholder="+7 (###) ### ## ##"
                        size="large"
                        variant="filled"
                    />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
                    <Input type='email' variant="filled" placeholder="Enter your email" />
                </Form.Item>
                <Form.Item name="dateOfBirth" label="Date of birth" rules={[{ required: true, message: 'Please enter your date of birth' }]}>
                    <DatePicker style={{ width: '100%' }} variant="filled" placeholder="Enter your date of birth" />
                </Form.Item>
            </Form>
        </Card>
    )
}