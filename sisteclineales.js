// ELIMINACION DE GAUSS
export function resolverGauss(A, b) {
  const n = b.length;
  let M = A.map((row, i) => [...row, b[i]]); 

  for (let i = 0; i < n; i++) {
    // pivoteo
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
    }
    [M[i], M[maxRow]] = [M[maxRow], M[i]];

    if (M[i][i] === 0) return { error: "El sistema no tiene solucion unica (pivote cero)." };

    for (let j = i + 1; j < n; j++) {
      let factor = M[j][i] / M[i][i];
      for (let k = i; k <= n; k++) {
        M[j][k] -= factor * M[i][k];
      }
    }
  }

  let x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) sum += M[i][j] * x[j];
    x[i] = (M[i][n] - sum) / M[i][i];
  }

  return { solucion: x.map(v => Number(v.toFixed(4))), converged: true, totalIter: 1 };
}

// GAUSS-JORDAN
export function resolverGaussJordan(A, b) {
  const n = b.length;
  let M = A.map((row, i) => [...row, b[i]]);

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
    }
    [M[i], M[maxRow]] = [M[maxRow], M[i]];

    let pivote = M[i][i];
    if (pivote === 0) return { error: "El sistema no tiene solucion unica." };

    for (let k = 0; k <= n; k++) M[i][k] /= pivote;

    for (let j = 0; j < n; j++) {
      if (i !== j) {
        let factor = M[j][i];
        for (let k = 0; k <= n; k++) M[j][k] -= factor * M[i][k];
      }
    }
  }

  let x = M.map(row => row[n]);
  return { solucion: x.map(v => Number(v.toFixed(4))), converged: true, totalIter: 1 };
}

// REGLA DE CRAMER (2x2 y 3x3)
function calcularDeterminante(M) {
  if (M.length === 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];
  if (M.length === 3) {
    return M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
           M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
           M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  }
  return 0;
}

export function resolverCramer(A, b) {
  const detA = calcularDeterminante(A);
  if (detA === 0) return { error: "El determinante es 0. El sistema no tiene solucion unica." };
  
  let x = [];
  for (let i = 0; i < b.length; i++) {
    let Ai = A.map((row, rIdx) => row.map((val, cIdx) => cIdx === i ? b[rIdx] : val));
    x.push(calcularDeterminante(Ai) / detA);
  }
  return { solucion: x.map(v => Number(v.toFixed(4))), converged: true, totalIter: 1 };
}

// JACOBI (Iterativo)
export function resolverJacobi(A, b, x0, tol = 0.0001, maxIter = 100) {
  const n = b.length;
  let x = [...x0];
  let iteraciones = [];

  for (let k = 0; k < maxIter; k++) {
    let x_new = new Array(n).fill(0);
    let errorMax = 0;

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) sum += A[i][j] * x[j];
      }
      x_new[i] = (b[i] - sum) / A[i][i];
      errorMax = Math.max(errorMax, Math.abs(x_new[i] - x[i]));
    }

    iteraciones.push({ n: k + 1, x: [...x_new], err: (errorMax * 100).toFixed(2) });
    x = [...x_new];

    if (errorMax < tol) {
      return { solucion: x.map(v => Number(v.toFixed(4))), iteraciones, converged: true, totalIter: k + 1 };
    }
  }
  return { solucion: x.map(v => Number(v.toFixed(4))), iteraciones, converged: false, totalIter: maxIter };
}

// GAUSS-SEIDEL (Iterativo)
export function resolverGaussSeidel(A, b, x0, tol = 0.0001, maxIter = 100) {
  const n = b.length;
  let x = [...x0];
  let iteraciones = [];

  for (let k = 0; k < maxIter; k++) {
    let x_old = [...x];
    let errorMax = 0;

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) sum += A[i][j] * x[j];
      }
      x[i] = (b[i] - sum) / A[i][i];
      errorMax = Math.max(errorMax, Math.abs(x[i] - x_old[i]));
    }

    iteraciones.push({ n: k + 1, x: [...x], err: (errorMax * 100).toFixed(2) });

    if (errorMax < tol) {
      return { solucion: x.map(v => Number(v.toFixed(4))), iteraciones, converged: true, totalIter: k + 1 };
    }
  }
  return { solucion: x.map(v => Number(v.toFixed(4))), iteraciones, converged: false, totalIter: maxIter };
}