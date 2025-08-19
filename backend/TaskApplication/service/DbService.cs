using Microsoft.AspNetCore.Http.HttpResults;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.X509.Qualified;
using System.Reflection;

namespace TaskApplication.service
{
    public class DbService<T>
    {
        public DbConnection DbConnection { get; set; }
        public string tableName { get; set; }

        public DbService(DbConnection DbConnection, string tableName)
        {
            this.DbConnection = DbConnection;

            this.tableName = tableName;
        }


        bool IsSimple(Type t) =>
t.IsPrimitive ||
t == typeof(string) || t == typeof(decimal) ||
t == typeof(DateTime);

        public void Save(T entity)
        {
            var properties = typeof(T).GetProperties();
            var values = new List<string>();
            var attributes = new List<string>();
    
            foreach (PropertyInfo prop in properties)
            {
                var colName = prop.Name;
                object? val = prop.GetValue(entity);

                if (!IsSimple(prop.PropertyType))
                {
                    colName = prop.Name + "Id";
                    if (prop.PropertyType.IsEnum)
                    {
                        val = Convert.ToInt64(val) ;
                    }
                    else
                    {
                        var idProp = prop.PropertyType.GetProperty("Id"); 
                        val = (val != null) ? idProp.GetValue(val) : null;
                    }      
                   
                }

                if (prop.PropertyType == typeof(DateTime))
                {
                    val = ((DateTime) val).ToString("yyyy-MM-dd HH:mm:ss.fff");
                }
               
                values.Add(String.Format("\"{0}\"",val));
                attributes.Add(colName);
            } 


            String queryString = String.Format("INSERT INTO {0} ({1}) VALUES ({2})", tableName, String.Join(",", attributes), String.Join(",", values));
            using (MySqlConnection connection = new MySqlConnection(DbConnection.GetConnectionString()))
            {
                try
                {
                    connection.Open();
                    MySqlCommand command = new MySqlCommand(queryString, connection);

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

        }

        public void Delete(String id)
        {
            String queryString = String.Format("DELETE FROM {0} WHERE id = @id", tableName);
            using(MySqlConnection connection = new MySqlConnection(DbConnection.GetConnectionString()))
            {
                connection.Open();
                try
                { 
                    MySqlCommand command = new MySqlCommand(queryString, connection);
                    command.Parameters.AddWithValue("@id", id);
                    command.ExecuteNonQuery();
                } 
                catch(MySqlException e)
                {
                    Console.WriteLine(e.Message);
                }
                finally
                {
                    connection.Close();
                }

            }
        }

        //public T Update(T entity)
        //{

        //}

        public T FindById(String id)
        {
            String queryString = String.Format("SELECT * FROM {0} WHERE id = @id", tableName);
            var properties = typeof(T).GetProperties();
            using (MySqlConnection connection = new MySqlConnection(DbConnection.GetConnectionString()))
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.AddWithValue("@id", id); 
                MySqlDataReader reader = command.ExecuteReader();
                try
                {
                    var item = Activator.CreateInstance<T>();
                    while (reader.Read())
                    {
                        
                        foreach(var property in properties)
                        {
                            var colName = property.Name;
                            Type convertTo = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                            if (!IsSimple(convertTo))
                            {
                                colName = colName + "Id";
                                if (convertTo.IsEnum)
                                {
                                    property.SetValue(item,
                                        Enum.ToObject(convertTo,
                                               Convert.ChangeType(reader[colName], Enum.GetUnderlyingType(convertTo))), null);
                                }
                                
                                else
                                {
                                    var instance = Activator.CreateInstance(convertTo);
                                    var idProp = convertTo.GetProperty("Id");
                                    idProp.SetValue(instance, idProp.ToString(), null);

                                    property.SetValue(item, instance, null);
                                }
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

        }

        //public List<T> GetPaginatedItems(int currentPageNo, int itemsPerPage, Dictionary<String, String> sortCriteria, Dictionary<String, String> filterCriteria)
        //{

        //}


    }
}
