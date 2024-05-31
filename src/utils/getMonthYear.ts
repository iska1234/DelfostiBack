export function getMonthAndYear(fecha: string): [number, number] {
    const [mes, _, año] = fecha.split('/');
    return [parseInt(mes, 10), parseInt(año, 10)];
  }