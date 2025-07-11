import './Card.css'

function Card(props) {
  return (
    <div className='card' >
      <div className='title-box' style={{'--bg-color': props.color}}>
        <p className='title'>{props.title}</p>
        <div className='price-box'> <span>{props.price}</span> </div>
      </div>
      
      <ul className='list'>
        {props.itemList.map((item, index) => (
          <li><img src={item.img} alt='done icon'/> {item.text} </li>
        ))}
      </ul>

      <button onClick={props.selectFunc} className='bttn' style={{'--bg-color': props.color}}>SELECT PACKAGE</button>
    </div>
  )
}

export default Card