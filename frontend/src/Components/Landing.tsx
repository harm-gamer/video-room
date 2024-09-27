import { useEffect, useRef, useState } from 'react'

import Room from './Room';

const Landing = () => {
    const [name,setName] = useState("");
   
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null)
    const [joined,setjoined] = useState(false)
    const getCam = async () =>{
     const stream = await window.navigator.mediaDevices.getUserMedia({
        video:true,
        audio : true
       })

       const audiotrack = stream.getAudioTracks()[0];
       const videotrack = stream.getVideoTracks()[0];
       setLocalAudioTrack(audiotrack);
       setlocalVideoTrack(videotrack);
       if(!videoRef.current){
        return;
       }
      videoRef.current.srcObject = new MediaStream([videotrack])
      videoRef.current.play();
    }

    useEffect(() =>{
      if(videoRef && videoRef.current){
        getCam()
      }
    },[videoRef])

    if(!joined){
      return <div>
      <video ref={videoRef}></video>
     <input type="text" onChange={(e) => setName(e.target.value) } />
     <button onClick={()=>{setjoined(true)}}> join </button>
    </div>
    }
  
  return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
}

export default Landing
