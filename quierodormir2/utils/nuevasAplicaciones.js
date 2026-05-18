// Aca habria que hacer todos los imports necesarios como
// import { resolverGauss, edoRK4 } from './nuevosMetodos'
// Eso te lo dejo a vos lauti porque no se si vas a dejar el mismo nombre a las carpetas o vas a incluir los codigos
/**
 * APLICACIÓN 1: ANÁLISIS DE CIRCUITOS (Mallas)
 * Toma una matriz de resistencias y un vector de voltajes,
 * y devuelve las corrientes de cada malla usando Gauss.
 */
import { resolverGauss, edoRK4 } from './nuevosMetodos.js';
export function simularCircuitoMallas(matrizResistencias, vectorVoltajes) {
  // Llama al motor matemático de Gauss
  const corrientes = resolverGauss(matrizResistencias, vectorVoltajes);
  
  // Le da una forma "linda" para que el usuario entienda todo
  let reporte = corrientes.map((corriente, index) => {
    return {
      malla: `Malla ${index + 1}`,
      corrienteAmperes: corriente,
      direccion: corriente >= 0 ? "Horaria" : "Antihoraria"
    };
  });
  return reporte;
}
/**
 * APLICACIÓN 2: ENFRIAMIENTO DE HARDWARE
 * Calcula cuánto tarda un procesador en llegar a 90°C usando RK4.
 * EDO térmica: dT/dt = (CalorGenerado - k * (T - T_ambiente)) / MasaTermica (Fisica aplicada)
 */
export function simularEnfriamientoCPU(tempInicial, tempAmbiente, flujoAireCooler, calorGeneradoCPU) {
  // Parámetros térmicos simulados
  const limiteTermico = 90; // °C
  const masaTermica = 10; // Constante de inercia térmica
  // La ecuación diferencial que define el comportamiento
  const ecuacionTermica = (t, T) => {
    return (calorGeneradoCPU - flujoAireCooler * (T - tempAmbiente)) / masaTermica;
  };
  // Usamos RK4 simulando 120 segundos, con saltos de 0.5 segundos
  const datosSimulacion = edoRK4(ecuacionTermica, 0, tempInicial, 0.5, 120);

  // Buscamos en qué segundo exacto superó los 90°C
  let tiempoCritico = null;
  for (let punto of datosSimulacion) {
    if (punto.y >= limiteTermico) {
      tiempoCritico = punto.t;
      break;
    }
  }
  // Preparamos los datos para la interfaz de tu compañero
  return {
    llegaAlLimite: tiempoCritico !== null,
    segundosHastaElLimite: tiempoCritico,
    datosParaGraficar: datosSimulacion, // Para meter directo en el <LineChart>
    mensaje: tiempoCritico 
      ? `ALERTA: El procesador alcanzará los ${limiteTermico}°C en ${tiempoCritico} segundos. Recomendamos mejorar el flujo de aire.` 
      : `Seguro. La temperatura se estabiliza sin llegar a los ${limiteTermico}°C.`
  };
}