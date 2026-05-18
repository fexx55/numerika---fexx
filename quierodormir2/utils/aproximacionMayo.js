/**
 * METODO DEL TRAPECIO
 * @param {Function} f - funcion f
 * @param {number} a - lim inf
 * @param {number} b - lim sup
 * @param {number} n - n intervalos
 */
export function metodoTrapecio(f, a, b, n) {
  const h = (b - a) / n;
  let suma = f(a) + f(b);

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    suma += 2 * f(x);
  }

  return (h / 2) * suma;
}
//-------------------------------------------------------------------------------------------------------------------
/**
 * METODO DE SIMPSON 1/3
 * @param {Function} f - funcion f 
 * @param {number} a - lim inf
 * @param {number} b - lim sup
 * @param {number} n - n subintervalos (DEBE SER PAR)
 */
export function simpsonUnTercio(f, a, b, n) {
  if (n % 2 !== 0) {
    throw new Error("El numero de subintervalos (n) debe ser par para Simpson 1/3.");
  }
  
  const h = (b - a) / n;
  let suma = f(a) + f(b);

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    if (i % 2 === 0) {
      suma += 2 * f(x); // Índices pares
    } else {
      suma += 4 * f(x); // Índices impares
    }
  }

  return (h / 3) * suma;
}
//-------------------------------------------------------------------------------------------------------------------
/**
 * METODO DE SIMPSON 3/8
 * @param {Function} f - funcion f
 * @param {number} a - lim inf
 * @param {number} b - lim sup
 * @param {number} n - n subintervalos (DEBE SER MÚLTIPLO DE 3)
 */
export function simpsonTresOctavos(f, a, b, n) {
  if (n % 3 !== 0) {
    throw new Error("El numero de subintervalos (n) debe ser multiplo de 3 para Simpson 3/8.");
  }

  const h = (b - a) / n;
  let suma = f(a) + f(b);

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    if (i % 3 === 0) {
      suma += 2 * f(x); // multiplos de 3
    } else {
      suma += 3 * f(x); // el resto
    }
  }

  return ((3 * h) / 8) * suma;
}
//-------------------------------------------------------------------------------------------------------------------
