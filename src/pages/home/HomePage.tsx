import Title from 'antd/es/typography/Title';
import classes from './HomePage.module.css';
import type { FormProps, InputNumberProps } from 'antd';
import { Button, DatePicker, Flex, Form, InputNumber, Radio, Select } from 'antd';
import type { Dayjs } from 'dayjs';
import useGetStationsKeyValuePairs from '../../modules/stations/queries/useGetStationsKeyValuePairs';
import { useEffect, useState } from 'react';
import useGetTrainsBetweenStations from '../../modules/trains/queries/useGetTrainsBetweenStations';
import { useSearchParams } from 'react-router';
import TrainCard from '../../modules/trains/ui/TrainCard';

interface SearchFormValues {
    tripType: 'roundTrip' | 'oneWay';
    numberOfPassengers: number;
    departure: string;
    arrival: string;
    date: Dayjs | [Dayjs, Dayjs] | null;
}

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

const stylesObject: FormProps<SearchFormValues>['styles'] = {
    label: {
        fontWeight: 700,
        fontSize: '1.1rem'
    },
};



export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams() // состояние - state
    const [form] = Form.useForm<SearchFormValues>();
    const [geolocation, setGeolocation] = useState<{ latitude: number, longitude: number } | null>(null);

    const { data: nearestStationsResponse, isLoading } = useGetStationsKeyValuePairs(geolocation?.latitude ?? 0, geolocation?.longitude ?? 0);
    const { data: moscowStationsResponse, isLoading: isMoscowStationsLoading } = useGetStationsKeyValuePairs(55.751244, 37.618423);

    const moscowStationsOptions = moscowStationsResponse?.stations.map((s) => ({ label: s.title, value: s.code })) ?? [];

    const departure = searchParams.get('departure')
    const arrival = searchParams.get('arrival')

    const { data: trainsData, isLoading: isTrainsLoading } = useGetTrainsBetweenStations(departure ?? '', arrival ?? '');
    const trains = trainsData?.segments ?? [];

    const stationsOptions =
        nearestStationsResponse?.stations.map((s) => ({ label: s.title, value: s.code })) ?? [];

    useEffect(() => {
        if (stationsOptions.length > 0 && moscowStationsOptions.length > 0) {
            form.setFieldsValue({
                departure: stationsOptions?.[0]?.value,
                arrival: moscowStationsOptions?.[1]?.value,
            });
        }
    }, [stationsOptions, moscowStationsOptions]);

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            setGeolocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, [])

    const onFinish: FormProps<SearchFormValues>['onFinish'] = (values) => {
        console.log('Success:', values);
        if (values.departure && values.arrival) {
            setSearchParams({ departure: values.departure, arrival: values.arrival });
        }
    };

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
                    // departure: stationsOptions?.[0]?.value,
                    // arrival: stationsOptions?.[1]?.value,

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
                        <Select placeholder={isLoading ? 'Loading...' : 'Select a departure station'} options={stationsOptions} />
                    </Form.Item>

                    <Form.Item name="arrival" rules={[{ required: true, message: 'Please select a arrival station' }]} style={{ flex: 1 }} label="Arrival">
                        <Select placeholder={isMoscowStationsLoading ? 'Loading...' : 'Select a departure station'} options={moscowStationsOptions} />
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

            <Flex style={{ marginTop: '50px' }} vertical gap="medium">
                <Title level={2}>Available Trains</Title>

                {isTrainsLoading
                    ? 'Loading...'
                    : trains.map((train, index) => <TrainCard key={index} segment={train} />)}
            </Flex>
        </div>
    )
}