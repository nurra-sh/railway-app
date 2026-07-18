import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { RailwayLogoIcon } from '../ui/Icons';

const { Header, Content, Footer } = Layout;

const items = [
    {
      key: '1',
      label: 'Mobile Apps',
    },
    {
      key: '2',
      label: 'FAQs',
    },
    {
      key: '3',
      label: 'Contact',
    },
    {
      key: '4',
      label: 'Sign Up',
    }
  ]

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const currentYear = new Date().getFullYear();

  return (
    <Layout style={{ minHeight: '100dvh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <RailwayLogoIcon />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ minWidth: 350 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        {/* <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        /> */}
        <div
          style={{
            marginTop: 24,
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            maxWidth: 650,
            marginInline: 'auto',
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Railway App ©{currentYear} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;