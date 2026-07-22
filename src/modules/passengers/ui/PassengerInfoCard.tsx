import { Card, DatePicker, Form, Input } from "antd";
import { type FormProps } from "antd/es/form/Form";
import classes from './passengers.module.css';
import { PatternFormat } from "react-number-format";
import type { Dayjs } from "dayjs";

export interface PassengerInfoFormValues {
    fullname: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Dayjs;
}

export default function PassengerInfoCard({ index }: { index: number }) {
    const baseName: (string | number)[] = ['passengers', index];

    function onFinish(values: PassengerInfoFormValues) {
        console.log('Success:', values)
    }
    const onFinishFailed: FormProps<PassengerInfoFormValues>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card size="small" title={`Passenger Info ${index + 1}`}>
            <div className={classes.passengerInfoForm}>
                <Form.Item name={[...baseName, 'fullname']} label="Full name" rules={[{ required: true, message: 'Please enter your full name' }]}>
                    <Input variant="filled" placeholder="Enter your full name" />
                </Form.Item>
                <Form.Item name={[...baseName, 'phoneNumber']} label="Phone number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                    <PatternFormat
                        format='+7 (###) ### ## ##'
                        mask='_'
                        customInput={Input}
                        placeholder="+7 (###) ### ## ##"
                        size="large"
                        variant="filled"
                    />
                </Form.Item>
                <Form.Item name={[...baseName, 'email']} label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
                    <Input type='email' variant="filled" placeholder="Enter your email" />
                </Form.Item>
                <Form.Item name={[...baseName, 'dateOfBirth']} label="Date of birth" rules={[{ required: true, message: 'Please enter your date of birth' }]}>
                    <DatePicker style={{ width: '100%' }} variant="filled" placeholder="Enter your date of birth" />
                </Form.Item>
            </div>

        </Card>
    )
}