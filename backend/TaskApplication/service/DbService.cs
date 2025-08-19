using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Data;
using System.Reflection;

namespace TaskApplication.service
{
    public class DbService<T>
    {
        public DbConnection DbConnection { get; set; }
        public String tableName { get; set; }

        public DbService(DbConnection DbConnection, String tableName)
        {
            this.DbConnection = DbConnection;
            this.tableName = tableName;
        }

        public void Save(T entity)
        {
            var properties = typeof(T).GetProperties();
            var values = new List<Object>();
            var attributes = new List<Object>();
    
            foreach (PropertyInfo prop in properties)
            {
                values.Add(String.Format("\"{0}\"", prop.GetValue(entity, null)));
                attributes.Add(prop.Name);
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
                            Type convertTo = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                            property.SetValue(item, Convert.ChangeType(reader[property.Name], convertTo), null);
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
