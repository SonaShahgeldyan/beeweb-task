export function queryMakerInsert(table, params) {
  const columns = Object.keys(params).join(", ");
  const values = Object.values(params)
    .map((_, index) => `$${index + 1}`)
    .join(", ");
  return `INSERT INTO ${table} (${columns}) VALUES (${values})`;
}

export function queryMakerSelect(table, params) {
  const whereClause = Object.keys(params)
    .map((column, index) => `${column} = $${index + 1}`)
    .join(" AND ");

  return `SELECT * FROM ${table} WHERE ${whereClause}`;
}

export function queryMakerDelete(table, params) {
  const whereClause = Object.keys(params)
    .map((column, index) => `${column} = $${index + 1}`)
    .join(" AND ");

  return `DELETE FROM ${table} WHERE ${whereClause}`;
}
