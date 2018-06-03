export const create2dArray = (rows, columns) =>
  [...Array(rows).keys()].map(i => Array(columns))
