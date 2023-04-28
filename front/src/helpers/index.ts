export const findArrayinArrays = (arrs: any[][], arr: any[]) => {
  const arrays = JSON.stringify(arrs)
  const array = JSON.stringify(arr)
  return arrays.indexOf(array) !== -1
}