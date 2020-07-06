import React, { useState } from 'react';
import Head from 'next/head'
import Carousel from '../components/carousel'
import Services from '../components/services'
import Container from '@material-ui/core/Container'
import Footer from './footer'
import TopBar from './topBar'
import Drawer from './drawer';
import ServicesNav from './servicesNav';

export default function Layout({children, page, carouselData, isService}) {

  const [drawerOpened, setDrawerOpened] = useState(false)

  const handleDrawerOpen = () => {
    setDrawerOpened(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpened(false)
  }

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta name="og:site_name" content="Electro 3"/>
        <meta name="og:title" content="Electro 3" />
        <meta name="og:description" content="Fibra óptica y seguridad urbana - Operadores activos de chatarra" />
        <meta name="og:image" itemProp="image" content="https://electro3.com.ar/images/logo-electro-3-san-juan.png"/>
        <meta name="og:type" content="website" />
      </Head>

      <TopBar
        page={page} 
        onOpenDrawer={handleDrawerOpen}
      ></TopBar>

      <Drawer
        page={page}
        onClose={handleDrawerClose}
        open={drawerOpened}
      ></Drawer>

      {carouselData && (
        <Carousel data={carouselData}></Carousel>
      )}

      <Container>
        {page == 'home' && <Services></Services>}
        {isService && <ServicesNav page={page}></ServicesNav>}
        <main>
          {children}
        </main>
      </Container>

      <Footer></Footer>

    </div>
  )
}