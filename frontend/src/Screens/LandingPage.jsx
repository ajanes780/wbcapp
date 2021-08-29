import React from 'react';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <Container>
      <Col md={12}>
        <Image src='images/poster.jpg' alt='event poster' fluid />
        <h1 className='site-title' style={{ fontSize: '3rem', textAlign: 'center' }}>
          {' '}
          THE WILD BOYS CAMPOUT
        </h1>
        <h4 style={{ textAlign: 'center', lineHeight: '2.5rem' }}>
          SEASON ENDER !! WILD BOYZZZ!! . LETS CLOSE THE SEASON OUT RIGHT WITH A DEADLY PARTY! . Tickets at the gate 40 dollars. . LOCATION Six Pak saloon 22524 Highway 37 Sturgeon County AB T8L 5E6 Canada . MUSIC
          @el_niven @upsidedowntown.ca DJ Skoden . STAY THE NIGHT PITCH YOUR TENT CAMPOUT! Everyone is welcome tons of parking for trailers motorcycles or whatever u wanna bring. Pitch a tent remember this is still a
          campout! Plus if you don’t wanna stay the night but wanna drink a few cold ones… guess what cabs and Uber will pick you up and drive you home safely. . This is not a party you wanna miss. Live music the best
          local vendors and company’s. 18+ BYOB or drinks by donations at the saloon. . Food trucks on site. . We will be collecting donations for @kwcsyeg On location. . Plus tons more exciting stuff if you’ve been to a
          wild boys campout you know what to expect. . VENDORS / SPONSORS @tn_industries @tripsixkustoms @lifesentencecycles @hdedmonton @death.defied @eville.empire @odinmfg @fuel_the_chaos @northern_cycles
          @showdowntattoos @fkndeadly @skulldefy @kevin_lemire_designer @topyography @3astc0ast1 @broadsquadinc_ @kelevramotorcycles @hamiltonaudio @world_famous_sideshow_tattoo @coyoteblonde @rocking.chair.spirits
          @elite_touring_innovations
        </h4>
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
