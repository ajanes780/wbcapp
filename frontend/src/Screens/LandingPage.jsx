import React from 'react';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({ startEvent: 'DOMContentLoaded', anchorPlacement: 'top-bottom', duration: 2000 });
const LandingPage = () => {
  return (
    <Container>
      <Col md={12}>
        <Image src='wbc-poster2.jpg' alt='event poster' fluid />
        <h1 className='site-title' data-aos='fade-up' style={{ fontSize: '3rem', textAlign: 'center' }}>
          {' '}
          THE WILD BOYS CAMPOUT
        </h1>
        <h6 style={{ textAlign: 'center', lineHeight: '2.5rem', fontSize: ' .7rem' }}>
          <h3 data-aos='fade-up'>
            SEASON ENDER !! WILD BOYZZZ!! <br />
          </h3>
          <br />
          <span data-aos='fade-up'>
            LETS CLOSE THE SEASON OUT RIGHT WITH A DEADLY PARTY! . Tickets at the gate 40 dollars. . <br /> <br />
          </span>
          <h4 data-aos='fade-up'>
            LOCATION <br />
          </h4>
          <span data-aos='fade-up'>
            Six Pak saloon 22524 Highway 37 Sturgeon County AB T8L 5E6 Canada <br />
          </span>
          <br />
          <h4 data-aos='fade-up'>
            MUSIC <br />
          </h4>
          <span data-aos='fade-up'>
            &nbsp; &nbsp; @el_niven &nbsp; @upsidedowntown.ca &nbsp;&nbsp; DJ Skoden <br /> <br />
          </span>
          <span data-aos='fade-up'>
            STAY THE NIGHT PITCH YOUR TENT CAMPOUT! Everyone is welcome tons of parking for trailers motorcycles or whatever u wanna bring. Pitch a tent remember this is still a campout! Plus if you don’t wanna stay the
            night but wanna drink a few cold ones… guess what cabs and Uber will pick you up and drive you home safely. .<br />
            <br />
          </span>
          <span data-aos='fade-up'>
            This is not a party you wanna miss. Live music the best local vendors and company’s. 18+ BYOB or drinks by donations at the saloon. . Food trucks on site. . We will be collecting donations for @kwcsyeg On
            location. . <br />
            <br />
          </span>
          <span data-aos='fade-up'>
            Plus tons more exciting stuff if you’ve been to a wild boys campout you know what to expect. . <br />
            <br />
          </span>
          <h4 data-aos='fade-up'>VENDORS / SPONSORS</h4>
          <br />
          <span data-aos='fade-up'>
            @tn_industries @tripsixkustoms @lifesentencecycles @hdedmonton @death.defied @eville.empire @odinmfg @fuel_the_chaos @northern_cycles @showdowntattoos @fkndeadly @skulldefy @kevin_lemire_designer @topyography
            @3astc0ast1 @broadsquadinc_ @kelevramotorcycles @hamiltonaudio @world_famous_sideshow_tattoo @coyoteblonde @rocking.chair.spirits @elite_touring_innovations
          </span>
        </h6>
        <Row className='d-flex justify-content-center align-items-center'>
          <Button className='btn col-4 m-3 rounded' href='https://www.instagram.com/thewildboyscampout/?hl=en' variant='warning' target='_blank'>
            Instagram
          </Button>
          <Button className='btn col-4 m-3 rounded' href='/store' variant='warning'>
            Store
          </Button>
        </Row>
      </Col>
    </Container>
  );
};

export default LandingPage;
