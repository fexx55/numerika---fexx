// Importamos los metodos
import { 
  resolverGauss, 
  resolverJacobi, 
  interpolacionLagrange 
} from './nuevosMetodos.js';

// Importamos las aplicaciones 
import { 
  simularCircuitoMallas, 
  simularEnfriamientoCPU 
} from './nuevasAplicaciones.js';

console.log("=========================================");
console.log("🧪 INICIANDO TEST DE MÉTODOS NUMÉRICOS 🧪");
console.log("=========================================\n");

try {
  console.log("▶ TEST 1: Eliminación de Gauss (Sistemas Lineales)");
  const matrizA = [[3, -0.1, -0.2], [0.1, 7, -0.3], [0.3, -0.2, 10]];
  const vectorB = [7.85, -19.3, 71.4];
  const resGauss = resolverGauss(matrizA, vectorB);
  console.log("Resultado Gauss (X1, X2, X3):", resGauss, "\n");

  console.log("▶ TEST 2: Método de Jacobi");
  const resJacobi = resolverJacobi(matrizA, vectorB, 0.001, 50);
  console.log(`Resultado Jacobi (alcanzado en ${resJacobi.iteraciones.length} iteraciones):`, resJacobi.solucion, "\n");

  console.log("▶ TEST 3: Interpolación de Lagrange (Aura)");
  const puntos = [{ x: 1, y: 2 }, { x: 3, y: 5 }, { x: 5, y: 1 }];
  const resLagrange = interpolacionLagrange(puntos, 5); 
  console.log("Puntos generados para la curva suave:", resLagrange, "\n");

  console.log("▶ TEST 4: APLICACIÓN - Análisis de Circuitos");
  const resistenciasMalla = [[10, -5, 0], [-5, 20, -5], [0, -5, 10]];
  const voltajesMalla = [15, 0, -10];
  const reporteCircuito = simularCircuitoMallas(resistenciasMalla, voltajesMalla);
  console.log("Reporte de Corrientes:");
  console.table(reporteCircuito);
  console.log("\n");

  console.log("▶ TEST 5: APLICACIÓN - Enfriamiento de Hardware (RK4)");
  const reporteTermico = simularEnfriamientoCPU(40, 25, 0.8, 65);
  console.log("Resultado de la simulación térmica:");
  console.log(reporteTermico.mensaje);
  console.log(`Puntos calculados para el gráfico: ${reporteTermico.datosParaGraficar.length} puntos.\n`);

  console.log("✅ TODOS LOS TESTS FINALIZARON CORRECTAMENTE.");

} catch (error) {
  console.error("❌ ERROR DURANTE LA EJECUCIÓN:", error.message);
}