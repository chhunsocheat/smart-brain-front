import React from 'react'
import './FaceRecognition.css'
const FaceRecognition = ({imageURL, box}) => {
return (
<div className='center pa3'>
    <div className='absolute'>
        <img id='inputImage' alt='iamge' src={imageURL}  width='auto' height='500px'   />
         <div className='bounding-box' 
         style={{top: box.topRow,right: box.rightCol,bottom: box.bottomRow,left: box.leftCol}}>
    </div>
    </div>
</div>

)

}
export default FaceRecognition;