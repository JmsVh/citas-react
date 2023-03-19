import { useState, useEffect } from 'react';
import Error from './Error';

function Formulario({pacientes, setPacientes, paciente, setPaciente}) {
  // State inputs
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  // Validar formulario
  const [error, setError] = useState(false);

  // useEffect
  useEffect(()=> {
    if(Object.keys(paciente).length > 0 ){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    } 
  }, [paciente])

  // Generar Id
  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha
  }

  // Función onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación de formulario
    if([nombre,propietario,email,fecha,sintomas].includes('')){
      console.log('Hay un campo vacío')
      setError(true)
      return;
    }
    setError(false)

    // Crear objeto paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,

    }

    if(paciente.id){
      // Editando registro
      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

      setPacientes(pacientesActualizados)
      setPaciente({})

    } else {
      // Nuevo registro
      objetoPaciente.id = generarId()
      // Guarda objeto paciente
      setPacientes([...pacientes, objetoPaciente])
    }

    // Resetea formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
        <h2 className="font-black text-3xl text-center">Seguimiento de pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">Añade pacientes y {''}<span className="text-indigo-600 font-bold">administralos</span></p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">
            {error &&  <Error><p>Todos los campos son obligatorios</p></Error>}
          <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 font-bold uppercase">Nombre mascota</label>
            <input
              id="mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="text"
              placeholder="Nombre de la mascota"
              value={nombre}
              onChange={ (e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 font-bold uppercase">Nombre propietario</label>
            <input
              id="propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="text"
              placeholder="Nombre del propietario"
              value={propietario}
              onChange={ (e) => setPropietario(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-bold uppercase">Email del propietario</label>
            <input
              id="email"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="email"
              placeholder="Email del propietario"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 font-bold uppercase">Fecha de alta</label>
            <input
              id="alta"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="date"
              value={fecha}
              onChange={ (e) => setFecha(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700 font-bold uppercase">Síntomas</label>
            <textarea
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Describe los síntomas"
              value={sintomas}
              onChange={ (e) => setSintomas(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <input
              type="submit"
              className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-all"
              value={ paciente.id ? 'Editar paciente' : 'Agregar paciente'}
            />
          </div>
        </form>
    </div>
  )
}

export default Formulario