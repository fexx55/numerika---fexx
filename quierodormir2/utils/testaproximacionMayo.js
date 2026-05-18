import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { metodoTrapecio, simpsonUnTercio, simpsonTresOctavos } from './aproximacionMayo.js';

const rl = readline.createInterface({ input, output });

async function iniciarTestIntegrales() {
  console.log(" test de aproximación de integrales numéricas\n");

  try {
    console.log("usar sintaxis de JS para funciones, por ejemplo: Math.sin(x), x**2, 2*x + 5, etc.");

    // inputs
    const funcStr = await rl.question(" Ingresa la funcion f(x): ");
    const aStr = await rl.question(" Ingresa el limite inferior (a): ");
    const bStr = await rl.question(" Ingresa el limite superior (b): ");
    const nStr = await rl.question(" Ingresa el numero de subintervalos (n): ");
    const exactoStr = await rl.question(" Ingresa el valor matematico exacto: ");

    // conversiones
    const a = parseFloat(aStr);
    const b = parseFloat(bStr);
    const n = parseInt(nStr);
    const valorExacto = parseFloat(exactoStr);

    // reemplazamos el símbolo ^ por ** para que se entienda las potencias
    const funcLimpia = funcStr.replace(/\^/g, '**');
    const f = new Function('x', `return ${funcLimpia};`);

    console.log(" Calculando áreas bajo la curva");

    let resTrapecio = "N/A";
    let resSimpson13 = "N/A";
    let resSimpson38 = "N/A";

    // Trapecio (no tiene restricciones de n)
    resTrapecio = metodoTrapecio(f, a, b, n);

    //  Simpson 1/3 (solo si n es par, sino mostramos aviso)
    if (n % 2 === 0) {
      resSimpson13 = simpsonUnTercio(f, a, b, n);
    } else {
      resSimpson13 = "n no es par";
    }

    //  Simpson 3/8 (solo si n es múltiplo de 3, sino mostramos aviso)
    if (n % 3 === 0) {
      resSimpson38 = simpsonTresOctavos(f, a, b, n);
    } else {
      resSimpson38 = "n no es múltiplo de 3";
    }

    // tabla de resultados
    const resultados = [
      { 
        Método: "Trapecio", 
        Resultado: resTrapecio, 
        "Error Absoluto": typeof resTrapecio === 'number' ? Math.abs(valorExacto - resTrapecio).toFixed(4) : "-" 
      },
      { 
        Método: "Simpson 1/3", 
        Resultado: resSimpson13, 
        "Error Absoluto": typeof resSimpson13 === 'number' ? Math.abs(valorExacto - resSimpson13).toFixed(4) : "-" 
      },
      { 
        Método: "Simpson 3/8", 
        Resultado: resSimpson38, 
        "Error Absoluto": typeof resSimpson38 === 'number' ? Math.abs(valorExacto - resSimpson38).toFixed(4) : "-" 
      }
    ];

    console.table(resultados);

  } catch (error) {
    console.error(" Error en la ejecución:", error.message);
  } finally {
    rl.close();
  }
}

iniciarTestIntegrales();