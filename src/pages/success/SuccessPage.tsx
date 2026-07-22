import { Flex, Typography } from 'antd';
import successImage from '../../assets/images/success.png';
import classes from './SuccessPage.module.css';

export default function SuccessPage() {
    return (
        <div className={classes.pageContainer}>
            <Flex 
                vertical 
                align="center" 
                justify="center" 
                style={{ minHeight: '50vh', textAlign: 'center' }}
            >
                <img 
                    src={successImage} 
                    alt="Success" 
                    className={classes.successImage}
                    width={130}
                    height={110}
                    draggable={false}
                />
                
                <Typography.Title level={2} className={classes.congratsTitle}>
                    Congratulations!
                </Typography.Title>
                
                <Typography.Title level={3} className={classes.successText}>
                    You have successfully booked tickets
                </Typography.Title>
            </Flex>
        </div>
    );
}