namespace TaskApplication.service
{
    using System.Reflection;
    using System.Security.Principal;
    using System.Text.Json;
    using MySqlConnector;

    public class Repository<T>
    {
        public DbConnection DbConnection { get; set; }

        public string TableName { get; set; }

        public Repository(DbConnection DbConnection, string tableName)
        {
            this.DbConnection = DbConnection;

            this.TableName = tableName;
        }

        public void Save(T entity)
        {
            var properties = typeof(T).GetProperties();
            var values = new List<string>();
            var columns = new List<string>();

            using MySqlConnection connection = new MySqlConnection(DbConnection.GetConnectionString());
            connection.Open();
            using MySqlCommand command = new MySqlCommand { Connection = connection };

            int i = 0;
            foreach (PropertyInfo prop in properties)
            {
                var colName = prop.Name;

                if (colName.Equals("Id", StringComparison.CurrentCultureIgnoreCase))
                {
                    continue;
                }

                object? val = prop.GetValue(entity);
                var type = Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;

                var placeholder = $"@p{i++}";
                columns.Add($"`{colName}`");
                values.Add(placeholder);

                var param = command.Parameters.Add(placeholder, MySqlDbType.VarChar);
                if (val is null)
                {
                    param.Value = DBNull.Value;
                    continue;
                }

                if (type == typeof(DateOnly))
                {
                    param.MySqlDbType = MySqlDbType.Date;
                    param.Value = (DateOnly)val;
                }
                else if (type == typeof(Guid))
                {
                    param.MySqlDbType = MySqlDbType.Guid;
                    param.Value = (Guid)val;
                }
                else
                {
                    param.Value = val;
                }
            }

            command.CommandText = $"INSERT INTO `{TableName}` ({string.Join(", ", columns)}) VALUES ({string.Join(", ", values)})";

            try
            {
                command.ExecuteNonQuery();
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                connection.Close();
            }
        }

        public void Delete(Guid id)
        {
            String queryString = $"DELETE FROM {TableName} WHERE id = @id";
            using MySqlConnection connection = new MySqlConnection(DbConnection.GetConnectionString());
            connection.Open();
            using MySqlCommand command = new MySqlCommand(queryString, connection);
            try
            {
                var param = command.Parameters.Add("@id", MySqlDbType.Guid);
                param.Value = id;
                command.ExecuteNonQuery();
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                connection.Close();
            }
        }

        public void Update(T entity)
        {
            var properties = typeof(T).GetProperties();
            var setColumnValues = new List<string>();

            Guid id = Guid.Empty;

            using MySqlConnection connection = new MySqlConnection(DbConnection.GetConnectionString());
            connection.Open();
            using MySqlCommand command = new MySqlCommand { Connection = connection };

            int i = 0;
            foreach (PropertyInfo prop in properties)
            {
                var colName = prop.Name;

                if (colName.Equals("Id", StringComparison.CurrentCultureIgnoreCase))
                {
                    id = (Guid)prop.GetValue(entity);
                    continue;
                }

                object? val = prop.GetValue(entity);
                var type = Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;

                var placeholder = $"@p{i++}";
                setColumnValues.Add($"{colName} = {placeholder}");

                var param = command.Parameters.Add(placeholder, MySqlDbType.VarChar);
                if (val is null)
                {
                    param.Value = DBNull.Value;
                    continue;
                }

                if (type == typeof(DateOnly))
                {
                    param.MySqlDbType = MySqlDbType.Date;
                    param.Value = (DateOnly)val;
                }
                else if (type == typeof(Guid))
                {
                    param.MySqlDbType = MySqlDbType.Guid;
                    param.Value = (Guid)val;
                }
                else
                {
                    param.Value = val;
                }
            }

            command.CommandText = $"UPDATE `{TableName}` SET {string.Join(", ", setColumnValues)} WHERE id = @id";

            try
            {
                var param = command.Parameters.Add("@id", MySqlDbType.Guid);
                param.Value = id.ToString("D");
                command.ExecuteNonQuery();
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                connection.Close();
            }
        }

        public T FindById(Guid id)
        {
            string queryString = $"SELECT * FROM {TableName} WHERE id = @id";
            var properties = typeof(T).GetProperties();
            using MySqlConnection connection = new MySqlConnection(DbConnection.GetConnectionString());
            connection.Open();

            MySqlCommand command = new MySqlCommand(queryString, connection);
            var param = command.Parameters.Add("@id", MySqlDbType.Guid);
            param.Value = id;
            MySqlDataReader reader = command.ExecuteReader();
            try
            {
                var item = Activator.CreateInstance<T>();
                while (reader.Read())
                {

                    foreach (var property in properties)
                    {
                        var colName = property.Name;
                        Type convertTo = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;


                        if (convertTo == typeof(Guid))
                        {
                            var guid = Guid.Parse(reader[colName].ToString());
                            property.SetValue(item, guid, null);
                        }
                        if (convertTo == typeof(DateOnly))
                        {
                            var date = reader.GetDateTime(colName);
                            property.SetValue(item, DateOnly.FromDateTime(date), null);
                        }
                        else
                        {
                            property.SetValue(item, Convert.ChangeType(reader[colName], convertTo), null);
                        }

                    }
                }
                return item;
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            { reader.Close(); connection.Close(); }

            return default(T);
        }

        public List<T> GetPaginatedItems(int currentPageNo, int itemsPerPage, Dictionary<string, int> sortCriteria, Dictionary<string, string> filterCriteria)
        {
            List<T> items = new List<T>();
            var properties = typeof(T).GetProperties();

            using MySqlConnection connection = new MySqlConnection(DbConnection.GetConnectionString());
            connection.Open();

            MySqlCommand command = new MySqlCommand("GetPaginatedItems", connection);
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.Parameters.Add("tableName", MySqlDbType.VarChar).Value = TableName;
            command.Parameters.Add("currentPageNo", MySqlDbType.Int64).Value = currentPageNo;
            command.Parameters.Add("itemsPerPage", MySqlDbType.Int64).Value = itemsPerPage;


            List<string> sortColumns = new List<string>();
            List<int> sortDirections = new List<int>();
            List<string> filterColumns = new List<string>();
            List<string> filterColumnValues = new List<string>();


            if (sortCriteria.Count > 0)
            {

                foreach (var criterion in sortCriteria)
                {
                    sortColumns.Add(criterion.Key);
                    sortDirections.Add(criterion.Value);
                }

                var jsonSortColumns = JsonSerializer.Serialize(sortColumns);
                var jsonDirections = JsonSerializer.Serialize(sortDirections);

                command.Parameters.Add("sortColumns", MySqlDbType.JSON).Value = jsonSortColumns;
                command.Parameters.Add("sortDirections", MySqlDbType.JSON).Value = jsonDirections;
            }
            else
            {
                command.Parameters.Add("sortColumns", MySqlDbType.JSON).Value = DBNull.Value;
                command.Parameters.Add("sortDirections", MySqlDbType.JSON).Value = DBNull.Value;
            }

            if (filterCriteria.Count > 0)
            {
                foreach(var criterion in filterCriteria)
                {
                    filterColumns.Add(criterion.Key);
                    filterColumnValues.Add(criterion.Value);
                }

                var jsonFilterColumns = JsonSerializer.Serialize(filterColumns);
                var jsonFilterColumnValues = JsonSerializer.Serialize(filterColumnValues);

                command.Parameters.Add("filterColumns", MySqlDbType.JSON).Value = jsonFilterColumns;
                command.Parameters.Add("filterColumnValues", MySqlDbType.JSON).Value = jsonFilterColumnValues;
            }

            else
            {
                command.Parameters.Add("filterColumns", MySqlDbType.JSON).Value = DBNull.Value;
                command.Parameters.Add("filterColumnValues", MySqlDbType.JSON).Value = DBNull.Value;
            }




                try
                {
                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        var item = Activator.CreateInstance<T>();
                        foreach (var prop in properties)
                        {
                            var colName = prop.Name;
                            Type convertTo = Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;

                            if (prop.PropertyType == typeof(Guid))
                            {
                                var guid = Guid.Parse(reader[colName].ToString());
                                prop.SetValue(item, guid, null);
                            }
                            if (prop.PropertyType == typeof(DateOnly))
                            {
                                var date = reader.GetDateTime(colName);
                                prop.SetValue(item, DateOnly.FromDateTime(date), null);
                            }
                            else
                            {
                                prop.SetValue(item, Convert.ChangeType(reader[colName], convertTo), null);
                            }

                        }
                        items.Add(item);
                    }

                    reader.Close();
                }

                catch (MySqlException e)
                {
                    Console.WriteLine(e.Message);
                }

                finally
                {
                    connection.Close();
                }

            return items;
        }
    }
}
