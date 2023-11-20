import { useRef, useEffect } from 'react';
import './assets/style/App.scss';
import images from './assets/images/images';
import useWindowSize from './hooks/useWindowSize';


function App() {

  const app = useRef();
  const scrollWrapper = useRef();
  const size = useWindowSize();




  useEffect(() => {
    document.body.style.height = `${scrollWrapper.current.getBoundingClientRect().height}px`
  }, [size.height])


  useEffect(() => {
    requestAnimationFrame(() => skewScrolling());
     }, []); 
  //scrolling functionality
  const skewConfig = {
    ease: .1,
    current: 0,
    previous: 0,
    rounded: 0
  }



  const skewScrolling = () => {
    skewConfig.current = window.scrollY

    skewConfig.previous +=
      (skewConfig.current - skewConfig.previous) * skewConfig.ease
    //the math
    skewConfig.rounded = Math.round(skewConfig.previous * 100) / 100;


    //variables
    const diffe = skewConfig.current - skewConfig.rounded;
    const accelerate = diffe / size.width;
    const velocity = +accelerate;
    const skew = velocity * 7.5;


    //assign the skew and data rounded number using a state

    scrollWrapper.current.style.transform = `translate3d(0, -${skewConfig.rounded}px, 0) skewY(${skew}deg)`;
    // requestAnimationFrame(() => skewScrolling());
  }

  
  

  return (
    <div ref={app} className="App">


      <div ref={scrollWrapper} className="scroll-wrapper">

        {
          images.map((img, ind) => (
            <>
              <div key={ind} className="img-container">

                <img src={img} alt={`img ${ind}`} />
              </div>

              <h2>Skew <span className="title">Scrolling {ind}</span></h2>
            </>
          ))
        }
      </div>


    </div>
  );
}

export default App;
