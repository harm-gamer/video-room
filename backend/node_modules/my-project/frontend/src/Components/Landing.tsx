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
      return <div className="grid h-screen place-items-center font-mono">
            <div>
                <div className="">
                    <video className="rounded-lg h-auto" autoPlay ref={videoRef} ></video>
                </div>
                <div className="flex gap-10 mt-10">
                    <input
                        style={{"width" : "100%"}}
                        className="bg-gray-50 text-xl text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button 
                        style={{"width" : "38%"}}
                        className="mt-2 text-xl rounded-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                        onClick={() => setjoined(true)}
                    >
                        <span className="w-40 rounded-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Join
                        </span>
                    </button>
                </div>
            </div>
        </div>
    }
  
  return <div className="">
  <div>
      <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
  </div>
</div>
}

export default Landing
