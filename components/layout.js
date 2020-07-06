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

  const handleLinkClick = (e) => {
    setDrawerOpened(false)
    if(e.target.name == 'Servicios' && page == 'home') {
      e.preventDefault()
      const anchor = document.querySelector('#services');
      if(anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <TopBar page={page} onOpenDrawer={handleDrawerOpen}></TopBar>

      <Drawer
        page={page}
        onClose={handleDrawerClose}
        open={drawerOpened}
        onLinkClicked={handleLinkClick}
      ></Drawer>

      {carouselData && (
        <Carousel data={carouselData}></Carousel>
      )}

      <Container>
        {page == 'home' && <Services onLinkClicked={handleLinkClick}></Services>}
        {isService && <ServicesNav page={page}></ServicesNav>}
        <main>
          {children}
        </main>
      </Container>

      <Footer></Footer>

    </div>
  )
}