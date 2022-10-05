import React,{useState,useEffect} from 'react';
import Webcam from "react-webcam";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useCountdown } from 'react-countdown-circle-timer'
import './Video.css'

const Video = () => {
  
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [videoSrc, setVideoSrc] = React.useState(null);
  const [pause, setPause] = useState(false);

  const isInitialMount = React.useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } 
    
    


  }, [recordedChunks,capturing])

  const handleStartCaptureClick =(() => {
    console.log('rec-start');
    mediaRecorderRef.current = new MediaRecorder(webcamRef?.current?.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef?.current?.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef?.current?.start();
    console.log("mediaRecorderRef.current.state", mediaRecorderRef.current.state);  // "recording"
    console.log('recfinished');


  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef?.current?.stop();
    setCapturing(false);
    console.log(recordedChunks.length)
    if (recordedChunks.length==0) {
          const blob = new Blob(recordedChunks, {
            type: "video/webm"
          });
          const url = URL.createObjectURL(blob);
          console.log(url);
      }
  }, [mediaRecorderRef, webcamRef, setCapturing,recordedChunks]);



  //     const handleDownload = React.useCallback(() => {
  //   if (recordedChunks.length) {
  //     const blob = new Blob(recordedChunks, {
  //       type: "video/webm"
  //     });
  //     const url = URL.createObjectURL(blob);
  //     console.log(url);
  //     const video = document.getElementById("video-replay");
  //     video.src = url
  //     const file=video 
  //     const formData = new FormData();
  //     formData.append("file", blob);
  //     // axios.post(BaseUrl+"/upload", formData)

    
  //   }
  // }, [recordedChunks]);

  //--------------------------------------TIMER-------------------------------------------------//

  const {
      path,
      pathLength,
      stroke,
      strokeDashoffset,
      remainingTime,
      elapsedTime,
      size,
      strokeWidth,
    } = useCountdown({ isPlaying: true, duration: 60, colors: '#abc',})

    const handleTimer=()=>{
      const duration = 60
      setPause(false);
      const timeTaken = remainingTime
      console.log(timeTaken);
    }


    //-------------------------PREPARATION TIMER-------------------------------------------------//

    var secondsRemaining;
var intervalHandle;


function tick(){
// grab the h1
var timeDisplay = document.getElementById("time");

// turn the seconds into mm:ss
var min = Math.floor(secondsRemaining / 60);
var sec = secondsRemaining - (min * 60);

//add a leading zero (as a string value) if seconds less than 10
if (sec < 10) {
  sec = "0" + sec;
}

// concatenate with colon
var message = min.toString() + ":" + sec;

// now change the display
timeDisplay.innerHTML = message;

// stop is down to zero
if (secondsRemaining === 0){
  setPause(true)
  setCapturing(true);
  // alert("Done!");
  clearInterval(intervalHandle);
      document.getElementById("time").style.display = "none";
      document.getElementById("text=prep").style.display = "none";
      document.getElementById("prep-container").style.display = "none";
      
}

//subtract from seconds remaining
secondsRemaining--;

}

function startCountdown(){

// get countents of the "minutes" text box
var minutes = 45;

// check if not a number

// how many seconds
secondsRemaining = minutes;

//every second, call the "tick" function
// have to make it into a variable so that you can stop the interval later!!!
intervalHandle = setInterval(tick, 1000);
}

window.onload = function(){

// create input text box and give it an id of "min"

  startCountdown();
  console.log(remainingTime)


//add to the DOM, to the div called "inputArea"
}




  return (
    <div>
       <div className='top'>

</div>
 <div className="parent">
    <div className="left">
    <div className='question'>
    <div className="question-number">
        <p>QUESTION 1.</p>
    </div>
    <div className="question-text">
    <h2>Tell us about yourself.</h2>
    </div>
    </div>
    <div className="overlay-prep-timer" id="prep-container">
    <div id="inputArea">
</div>
<p id='text=prep'>Recording will be starting </p>
<h1 id="time">0:00</h1>
    </div>
    <div className='video'>
       <Webcam
    audio={false}
    className='webcam'
    screenshotFormat="image/jpeg"
    style={{
      position: "absolute",
        textAlign: "center",
        left:0,
        top:0,
        bottom:0,
        right:0,
        height: "100%",
         width: "100%",
         objectFit: "cover",
      }}></Webcam>
    </div>
    </div>
   

    <div className="right">
                    
                    <div className="timer">
                       <div className='time-left-text'>
                       <p>TIME LEFT TO ANSWER</p>
                       </div>
                    <CountdownCircleTimer className='circleTimer'
    isPlaying={pause}
    duration={60}
    ariaLabel={'Second'}
    colors={['#8FD461', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[30, 20, 10, 0]}
    isSmoothColorTransition={true}
    onComplete={() => {
        // do your stuff here
        return console.log(elapsedTime); 
      }}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
                    </div>
                    <div className='submit-container'>
                        <button onClick={handleTimer} className="submit-btn">Submit Question 1</button>
                    </div>
                    <div className="section-question">
                    <div className="question-container">
                        <div className="section-1">
                            <p>Section-1</p>
                            <div className="section-btn">
                                <button className='question-btn current'>01</button>
                                <button className='question-btn'>02</button>
                                <button className='question-btn'>03</button>
                                <button className='question-btn'>04</button>
                                <button className='question-btn'>05</button>
                            </div>
                        </div>
                        <div className="section-1">
                        <p>Section-2</p>
                            <div className="section-btn">
                                <button className='question-btn '>01</button>
                                <button className='question-btn'>02</button>
                                <button className='question-btn'>03</button>
                                <button className='question-btn'>04</button>
                                <button className='question-btn'>05</button>
                            </div>
                        </div>
                    </div>
                    <div className="question-types">
                        <div className='each-type'>
                        <button className='question-btn current'></button>
                        <p className='type-text-pattern'>Current Question</p>
                        
                        </div>
                        <div className='each-type'>
                        <button className='question-btn upcoming'></button>
                        <p className='type-text-pattern'>Upcoming Question</p>
                        </div>
                        <div className='each-type'>
                        <button className='question-btn completed'></button>
                        <p className='type-text-pattern'>Completed Question</p>
                        </div>
                    </div>
                    </div>
                </div>
    </div>
    </div>
    
  );
};

export default Video;