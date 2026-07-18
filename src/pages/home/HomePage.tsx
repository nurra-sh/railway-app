import Title from 'antd/es/typography/Title';
import classes from './HomePage.module.css';
import type { FormProps, InputNumberProps } from 'antd';
import { Button, DatePicker, Flex, Form, InputNumber, Radio, Select } from 'antd';
import type { Dayjs } from 'dayjs';


const onFinish: FormProps<SearchFormValues>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<SearchFormValues>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
};

const sharedProps = {
    mode: 'spinner' as const,
    min: 1,
    max: 99,
    onChange,
    style: { width: 120 },
};

const stylesObject: FormProps['styles'] = {
    label: {
        fontWeight: 700,
        fontSize: '1.1rem'
    },
};

interface SearchFormValues {
    tripType: 'roundTrip' | 'oneWay';
    numberOfPassengers: number;
    departure: string;
    arrival: string;
    date: Dayjs | [Dayjs, Dayjs] | null;
}

export default function HomePage() {
    const [form] = Form.useForm<SearchFormValues>()

    return (
        <div className={classes.homePageContainer}>
            <Title level={1}>Search Results</Title>

            <Form<SearchFormValues>
                form={form}
                name="searchForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                size='large'
                styles={stylesObject}
                className={classes.searchForm}
                initialValues={{
                    tripType: 'roundTrip',
                    numberOfPassengers: 1,
                    departure: 'New Delhi - NDLS',
                    arrival: 'Lucknow Junction - LJN',

                }}
            >
                <Flex gap="medium" justify="space-between" align='center'>
                    <Form.Item name='tripType' rules={[{ required: true, message: 'Please select a trip type' }]}>
                        <Radio.Group size='large'>
                            <Radio.Button value="roundTrip"> Round trip </Radio.Button>
                            <Radio.Button value="oneWay">One-way</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name='numberOfPassengers' rules={[{ required: true, message: 'Please enter the number of passengers' }]}>
                        <InputNumber {...sharedProps} size='large' variant="borderless" placeholder="Filled" />
                    </Form.Item>
                </Flex>

                <Flex gap='medium'>
                    <Form.Item name="departure" rules={[{ required: true, message: 'Please select a departure station' }]} style={{ flex: 1 }} label="Departure">
                        <Select options={[{ label: 'New Delhi - NDLS', value: 'New Delhi - NDLS' }, { label: 'Lucknow Junction - LJN', value: 'Lucknow Junction - LJN' }]} />
                    </Form.Item>

                    <Form.Item name="arrival" rules={[{ required: true, message: 'Please select a arrival station' }]} style={{ flex: 1 }} label="Arrival">
                        <Select options={[{ label: 'New Delhi - NDLS', value: 'New Delhi - NDLS' }, { label: 'Lucknow Junction - LJN', value: 'Lucknow Junction - LJN' }]} />
                    </Form.Item>
                </Flex>

                <Form.Item noStyle dependencies={['tripType']}>
                    {({ getFieldValue }) =>
                        getFieldValue('tripType') === 'oneWay' ? (
                            <Form.Item name="date" rules={[{ required: true, message: 'Please select a date' }]} label="Date">
                                <DatePicker size='large' style={{ width: '100%' }} />
                            </Form.Item>
                        ) : (
                            <Form.Item name="date" rules={[{ required: true, message: 'Please select a date' }]} label="Date">
                                <DatePicker.RangePicker size='large' style={{ width: '100%' }} />
                            </Form.Item>
                        )
                    }
                </Form.Item>


                <Form.Item label={null}>
                    <Button className={classes.submitButton} size="large" block type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}