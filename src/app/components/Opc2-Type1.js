export default function Opc2Type1({ respuesta, isClicked, setIsClicked, isCorrect, seleccionada, onClick }) {
  const backgroundColor = isClicked
    ? (isCorrect ? '#4B9C61' : '#FC4F4F') // Verde para correcto, rojo para incorrecto
    : '#4B1572'; // Fondo inicial

  /* const sombraBackground = isClicked
    ? (isCorrect ? 'radial-gradient(ellipse at center, rgba(152, 206, 167, 1) 20%, rgba(152, 206, 167, 0) 100%)' 
                : 'radial-gradient(ellipse at center, rgba(236, 170, 170, 1) 20%, rgba(236, 170, 170, 0) 100%)')
    : 'radial-gradient(ellipse at center, rgba(156, 81, 183, 1) 20%, rgba(156, 81, 183, 0) 100%)'; 
    
    <div className='sombritatype1' style={{ background: sombraBackground }}></div> */

  return (
    <div className='opc2-type1'
      style={{ backgroundColor }}
      onClick={() => onClick(respuesta)}>
      
      <div className='rta-type1'>{respuesta}</div>
    </div>
  );
}