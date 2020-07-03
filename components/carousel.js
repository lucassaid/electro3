import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import React from 'react'
import styles from './carousel.module.css'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(() => ({
  carouselProvider: {
    width: '100%',
    marginBottom: '40px',
    display: 'block',
    overflow: 'hidden',
    position: 'relative'
  },
  bottomParagraph: {
    padding: '15px',
    textAlign: 'center',
    marginBottom: '40px'
  }
}))

export default function Carousel({data}) {
  const classes = useStyles()
  const mdScreen = useMediaQuery('(min-width:600px)');
  const lgScreen = useMediaQuery('(min-width:1000px)');
  let heigth = lgScreen ? 30 : mdScreen ? 40 : 70
  if(data.short) heigth = heigth / 2 + 5

  return (
    <>
      <CarouselProvider
        className={classes.carouselProvider}
        naturalSlideWidth={100}
        naturalSlideHeight={heigth}
        totalSlides={data.slides.length}
      >
        <div className={styles.text}>
          <div>
            <Typography variant="h4" className={styles.title}>
              {data.title}
            </Typography>
            <Hidden smDown>
              <Typography variant="body1" className={styles.paragraph}>
                {data.paragraph}
              </Typography>
            </Hidden>
          </div>
        </div>
        <Slider className={styles.slider}>
          {data.slides.map((slide, i) => 
            <Slide key={slide.image} index={i}>
              <div className={styles.overlay} style={{opacity: slide.overlayOpacity || 0}}></div>
              <div className={styles.slideImg} style={{backgroundImage: `url(/images/${slide.image})`}}></div>
            </Slide>
          )}
        </Slider>
        {data.slides.length > 1 && (
          <div className={styles.arrows}>
            <ButtonBack className={styles.arrow}><ChevronLeft></ChevronLeft></ButtonBack>
            <ButtonNext className={styles.arrow}><ChevronRight></ChevronRight></ButtonNext>
          </div>
        )}
      </CarouselProvider>
      {data.paragraph && (
        <Hidden mdUp>
          <Typography variant="body1" className={`${styles.paragraph} ${classes.bottomParagraph}`}>
            {data.paragraph}
          </Typography>
        </Hidden>
      )}
    </>
  )
}