import photo from './assets/photo.jpeg'
import './App.css'

function Photo() {
    return (
        <>
            <img src={photo} className="photo" alt="user photo" />
        </>
    )
}

export default Photo