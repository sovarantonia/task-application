using MySqlConnector;
using Org.BouncyCastle.Bcpg.OpenPgp;
using TaskApplication.entity;
using TaskApplication.entity.exceptions;

namespace TaskApplication.repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository() : base("users")
        {

        }

        public UserRepository(string connectionString) : base(connectionString, "users") { }

        public User? FindUserByEmail(string email)
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

        public User FindUserByEmailOrThrow(string email)
        {
            var result = FindUserByEmail(email);
            if (result == null)
            {
                throw new EntityNotFoundException($"User with email {email} not found");
            }

            return result;
        }
    }
}
