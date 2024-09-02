import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Footer from '../components/Footer'; // Ensure you have a Footer component

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // Refs for hero elements
  const heroTextRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroImgBgRef = useRef(null);

  useEffect(() => {
    // Hero Section Animations on Page Load
    gsap.fromTo(
      '.reveal-hero-text',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.5, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.reveal-hero-img',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
    );

    gsap.fromTo(
      '#hero-img-bg',
      { scale: 0 },
      { scale: 1, duration: 0.8, delay: 0.4, ease: 'power3.out' }
    );

    const sections = document.querySelectorAll('.reveal-up');

    sections.forEach(section => {
      const revealUptimeline = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: section,
          start: "10% 80%", // Animation starts when 10% of the section is within 80% of the viewport
          end: "20% 90%",   // Animation ends when 20% of the section is within 90% of the viewport
          // markers: true,  // Uncomment this line if you want to see the start and end markers
          // scrub: 1,       // Uncomment this line if you want to make the animation linked to scroll speed
          toggleActions: 'play none none reset', // Play the animation when it enters the viewport
        }
      });

      revealUptimeline.fromTo(section, {
        opacity: 0,
        y: 100, // Start from 100 pixels below its normal position
      }, {
        opacity: 1,
        y: "0%", // Animate to its normal position
        duration: 0.8, // Adjust duration for smoother animation
        stagger: 0.2,  // Apply a stagger effect if there are multiple '.reveal-up' elements inside the section
      });
    });


    // Cleanup ScrollTriggers on Unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="flex min-h-[100vh] flex-col bg-[#fff]">
      {/* Hero Section */}
      <section className="relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-lg:p-4 max-md:mt-[50px]">
        <div className="flex h-full min-h-[100vh] w-full place-content-center gap-6 p-[5%] max-xl:place-items-center max-lg:flex-col">
          <div className="flex flex-col place-content-center">
            <div
              ref={heroTextRef}
              className="reveal-hero-text flex flex-wrap text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug"
            >
              <span>Negotiation better</span>
              <br />
              <span>with AI.</span>
            </div>
            <div className="reveal-hero-text mt-2 max-w-[450px] p-2 text-justify max-lg:max-w-full">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error adipisci corrupti accusamus reiciendis similique assumenda nostrum fuga dicta vitae ipsum.
            </div>
            <div className="reveal-hero-text mt-4 flex place-items-center gap-4 overflow-hidden p-2">
              <a className="h-[50px] max-w-[150px]" href="/">
                <img src="./assets/images/brand-logos/app-store-badge.png" alt="app store" className="h-full w-full" />
              </a>
              <a className="h-[50px] max-w-[150px]" href="/">
                <img src="./assets/images/brand-logos/google-play-badge.png" alt="google play" className="h-full w-full" />
              </a>
            </div>
          </div>
          <div className="flex w-full max-w-[50%] place-content-center place-items-center overflow-hidden max-lg:max-w-[unset]">
            <div className="relative flex max-h-[580px] min-h-[450px] min-w-[350px] max-w-[650px] overflow-hidden max-lg:h-fit max-lg:max-h-[320px] max-lg:min-h-[180px] max-lg:w-[320px] max-lg:min-w-[320px]">
              <img
                ref={heroImgRef}
                src="./assets/s1.jfif"
                alt="app"
                className="reveal-hero-img z-[1] w-[430px] h-[250px] object-cover rounded-full"
              />
              <div
                ref={heroImgBgRef}
                className="absolute bottom-0 left-1/2 h-[80%] w-[80%] -translate-x-1/2 rounded-full bg-secondary"
                id="hero-img-bg"
              ></div>
            </div>
          </div>
        </div>
      </section>





      {/* Example of a Scroll-Triggered Section */}
      <section className="relative flex w-full max-w-[100vw] flex-col overflow-hidden p-6">
        <div className="reveal-up flex min-h-[60vh] place-content-center place-items-center gap-[10%] max-lg:flex-col max-lg:gap-10">
          <div className="flex">
            <div className="h-[450px] w-[300px]">
              <img src="./assets/images/home/2.png" alt="product1" className="h-full w-full object-contain" />
            </div>
          </div>
          <div className="mt-6 flex max-w-[450px] flex-col gap-4">
            <h3 className="text-4xl font-medium">Highly secure</h3>

            <div className="mt-4 flex flex-col gap-3">
              <h4 className="text-xl font-medium">
                <i className="bi bi-check-all !text-2xl"></i>
                DDOS protection
              </h4>
              <span className="text-xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis commodi temporibus at? Aspernatur, a necessitatibus?
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <h4 className="text-xl font-medium">
                <i className="bi bi-check-all !text-2xl"></i>
                CSRF protection
              </h4>
              <span className="text-xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis commodi temporibus at? Aspernatur, a necessitatibus?
              </span>
            </div>
          </div>
        </div>
      </section>











      <section className="relative flex w-full max-w-[100vw] flex-col overflow-hidden p-6">
        <div className="reveal-up flex min-h-[60vh] place-content-center place-items-center gap-[10%] max-lg:flex-col max-lg:gap-10">
          <div className="mt-6 flex max-w-[450px] flex-col gap-4">
            <h3 className="text-4xl font-medium">Lightning speed</h3>

            <div className="mt-4 flex flex-col gap-3">
              <h4 className="text-xl font-medium">
                <i className="bi bi-check-all !text-2xl"></i>
                10x Speed
              </h4>
              <span className="text-xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Reiciendis commodi temporibus at? Aspernatur,
                a necessitatibus?
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <h4 className="text-xl font-medium">
                <i className="bi bi-check-all !text-2xl"></i>
                CSRF protection
              </h4>
              <span className="text-xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Reiciendis commodi temporibus at? Aspernatur,
                a necessitatibus?
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="h-[450px] w-[300px]">
              <img src="./assets/images/home/3.png" alt="product1" className="h-full w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex w-full max-w-[100vw] flex-col overflow-hidden p-6">
        <div className="reveal-up flex min-h-[60vh] place-content-center place-items-center gap-[10%] max-lg:flex-col max-lg:gap-10">
          <div className="flex">
            <div className="h-[450px] w-[300px]">
              <img src="./assets/images/home/4.png" alt="product1" className="h-full w-full object-contain" />
            </div>
          </div>
          <div className="mt-6 flex max-w-[450px] flex-col gap-4">
            <h3 className="text-4xl font-medium">Easy to use</h3>

            <div className="mt-4 flex flex-col gap-3">
              <h4 className="text-xl font-medium">
                <i className="bi bi-check-all !text-2xl"></i>
                User-friendly
              </h4>
              <span className="text-xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Reiciendis commodi temporibus at? Aspernatur,
                a necessitatibus?
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <h4 className="text-xl font-medium">
                <i className="bi bi-check-all !text-2xl"></i>
                Seamless integration
              </h4>
              <span className="text-xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Reiciendis commodi temporibus at? Aspernatur,
                a necessitatibus?
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 flex flex-col place-items-center gap-5">
        <div className="reveal-up mt-5 flex flex-col gap-3 text-center">
          <h2 className="text-4xl font-semibold">
            Take your negotiation to next level
          </h2>
        </div>
        <div className="mt-6 flex max-w-[60%] flex-wrap place-content-center gap-2 max-lg:flex-col">
          <div className="reveal-up flex h-[150px] w-[350px] flex-col gap-2 p-4">
            {/* <img src="./assets/images/home/sample.jpg" alt="feature1"> */}
            <div className="flex gap-1">
              <i className="bi bi-boombox-fill text-2xl"></i>
              <h3 className="text-2xl font-semibold">
                Feature 1
              </h3>
            </div>
            <div className="text-[#595959]">
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </div>
          </div>
          <div className="reveal-up flex h-[150px] w-[350px] flex-col gap-2 p-4">
            {/* <img src="./assets/images/home/sample.jpg" alt="feature1"> */}
            <div className="flex gap-1">
              <i className="bi bi-0-circle-fill text-2xl"></i>
              <h3 className="text-2xl font-semibold">
                Feature 2
              </h3>
            </div>
            <div className="text-[#595959]">
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </div>
          </div>
          <div className="reveal-up flex h-[150px] w-[350px] flex-col gap-2 p-4">
            {/* <img src="./assets/images/home/sample.jpg" alt="feature1"> */}
            <div className="flex gap-1">
              <i className="bi bi-0-square-fill text-2xl"></i>
              <h3 className="text-2xl font-semibold">
                Feature 3
              </h3>
            </div>
            <div className="text-[#595959]">
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </div>
          </div>
          <div className="reveal-up flex h-[150px] w-[350px] flex-col gap-2 p-4">
            {/* <img src="./assets/images/home/sample.jpg" alt="feature1"> */}
            <div className="flex gap-1">
              <i className="bi bi-airplane-engines-fill text-2xl"></i>
              <h3 className="text-2xl font-semibold">
                Feature 4
              </h3>
            </div>
            <div className="text-[#595959]">
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </div>
          </div>
          <div className="reveal-up flex h-[150px] w-[350px] flex-col gap-2 p-4">
            {/* <img src="./assets/images/home/sample.jpg" alt="feature1"> */}
            <div className="flex gap-1">
              <i className="bi bi-cake-fill text-2xl"></i>
              <h3 className="text-2xl font-semibold">
                Feature 5
              </h3>
            </div>
            <div className="text-[#595959]">
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </div>
          </div>
          <div className="reveal-up flex h-[150px] w-[350px] flex-col gap-2 p-4">
            {/* <img src="./assets/images/home/sample.jpg" alt="feature1"> */}
            <div className="flex gap-1">
              <i className="bi bi-shield-fill text-2xl"></i>
              <h3 className="text-2xl font-semibold">
                Feature 6
              </h3>
            </div>
            <div className="text-[#595959]">
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </div>
          </div>
        </div>
      </section>


      <section className="mt-5 flex min-h-[60vh] w-full flex-col place-content-center 
    place-items-center bg-black p-[2%] text-white max-lg:min-h-[40vh]">
        <h3 className="reveal-up text-5xl font-medium max-md:text-2xl">
          Clients love us
        </h3>
        {/* Testimonials */}
        <div className="reveal-up max-w-[750px] max-md:max-w-[100vw]">
          <div className="swiper mt-8 flex flex-col gap-10 space-y-8">
            <div className="swiper-wrapper">
              <div className="swiper-slide flex place-content-center">
                <div className="flex h-fit max-w-[750px] place-content-center 
              place-items-center gap-10 rounded-lg p-4 shadow-lg">
                  <div className="flex place-items-center">
                    <div className="h-[150px] w-[150px] overflow-hidden rounded-full 
                  max-lg:h-[80px] max-lg:w-[80px]">
                      <img src="./assets/images/people/women.jpg"
                        className="h-full w-full object-cover" alt="women" />
                    </div>
                  </div>
                  <div className="flex max-w-[450px] flex-col gap-4">
                    <p className="mt-4 italic text-gray-200">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
                      sequi sunt velit aut omnis nulla ut, autem corrupti nemo optio
                      ipsam amet ducimus illum? Repellendus itaque autem alias eos quis.
                    </p>
                    <b>- Ferman</b>
                  </div>
                </div>
              </div>
              <div className="swiper-slide flex place-content-center">
                <div className="flex h-fit max-w-[750px] place-content-center 
              place-items-center gap-10 rounded-lg p-4 shadow-lg">
                  <div className="flex place-items-center">
                    <div className="h-[150px] w-[150px] overflow-hidden rounded-full 
                  max-lg:h-[80px] max-lg:w-[80px]">
                      <img src="./assets/images/people/women.jpg"
                        className="h-full w-full object-cover" alt="women" />
                    </div>
                  </div>
                  <div className="flex max-w-[450px] flex-col gap-4">
                    <p className="mt-4 italic text-gray-200">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
                      sequi sunt velit aut omnis nulla ut, autem corrupti nemo optio
                      ipsam amet ducimus illum? Repellendus itaque autem alias eos quis.
                    </p>
                    <b>- Ferman</b>
                  </div>
                </div>
              </div>
            </div>

            <div className="pagination-container flex place-content-center"></div>

            <div className="flex place-content-center gap-6">
              <div className="testmonial-prev flex h-[40px] w-[40px] place-content-center 
            place-items-center rounded-full border-2 border-solid 
            border-gray-300 text-2xl">
                <i className="bi bi-arrow-left"></i>
              </div>
              <div className="testmonial-next flex h-[40px] w-[40px] place-content-center 
            place-items-center rounded-full border-2 border-solid 
            border-gray-300 text-2xl">
                <i className="bi bi-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>


      <hr className='text-white min-w-screen'></hr>
      <div className='bg-gray-800'>
        <Footer />
      </div>
    </div>
  );
}

export default Home;