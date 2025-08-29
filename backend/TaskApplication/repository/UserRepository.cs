using MySqlConnector;
using TaskApplication.entity;

namespace TaskApplication.repository
{
    public class UserRepository : Repository<User>
    {
        public UserRepository() : base("users")
        {

        }

        public User FindUserByEmail(string email)
        {
            string queryString = "SELECT * FROM users WHERE email = @email";
            using MySqlConnection connection = new MySqlConnection(_connectionString);
            connection.Open();
            MySqlCommand command = new MySqlCommand { Connection = connection };
            command.Parameters.Add("@email", MySqlDbType.VarChar).Value = email;
            command.CommandText = queryString;

            using MySqlDataReader reader = command.ExecuteReader();
            try
            {
                while (reader.Read())
                {
                    return SetItemProperties(reader);
                }
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                connection.Close();
            }

            return null;
        }
    }
}
