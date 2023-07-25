import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Hero = () => {
    return (
        <div style={{ background: 'url(https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000', backgroundSize: 'cover', height: '800px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Title style={{ color: 'black' }} level={1}>Welcome to Cooking monsters!</Title>
            <Title style={{ color: 'white' }} level={3}>Discover Delicious Recipes</Title>
        </div>
    );
};

export default Hero;
