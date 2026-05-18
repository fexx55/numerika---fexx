import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { simularEnfriamientoCPU } from './nuevasAplicaciones.js';

// iniciamos "interfaz"
const rl = readline.createInterface({ input, output });
async function iniciarTest() {
  console.log("=====================================================");
  console.log("TEST INTERACTIVO: ENFRIAMIENTO DE HARDWARE (RK4)");
  console.log("SIMULACIÓN DE TIEMPO EN QUE DEMORA UN PROCESADOR AL");
  console.log("100% DE SU CAPACIDAD AL LLEGAR A LOS 90°C");
  console.log("=====================================================\n");
  try {
    // input de datos
    let tempInicial = await rl.question("1. Ingresa la temperatura inicial del CPU al prender (ej. 40): ");
    let tempAmbiente = await rl.question("2. Ingresa la temperatura ambiente de la habitación (ej. 25): ");
    let flujoAire = await rl.question("3. Ingresa la eficiencia del cooler/ventilador (ej. 0.8): ");
    let tdp = await rl.question("4. Ingresa el calor generado por el CPU / TDP (ej. 65): ");

    // conversion de texto a numeros
    tempInicial = parseFloat(tempInicial);
    tempAmbiente = parseFloat(tempAmbiente);
    flujoAire = parseFloat(flujoAire);
    tdp = parseFloat(tdp);

    console.log("\n Simulando termodinámica con Runge-Kutta de 4to Orden...");
    
    // llamamos al metodo
    const reporte = simularEnfriamientoCPU(tempInicial, tempAmbiente, flujoAire, tdp);

    console.log("\nRESULTADOS:");
    console.log("-----------------------------------------------------");
    console.log(reporte.mensaje);
    console.log(`Llega al límite (90°C): ${reporte.llegaAlLimite ? 'SÍ (peligro) ' : 'NO (optimo)'}`);
    console.log("-----------------------------------------------------");
    
    // Mostramos los últimos 3 segundos para ver a qué temperatura se estabilizó
    console.log("\nÚltimos registros de temperatura antes de finalizar la simulación:");
    const ultimos = reporte.datosParaGraficar.slice(-3);
    console.table(ultimos);

  } catch (error) {
    console.error("\n Error en los datos ingresados:", error.message);
  } finally {
    // Cerramos la lectura de consola para que el programa pueda terminar
    rl.close();
  }
}

// Ejecutamos la función
iniciarTest();